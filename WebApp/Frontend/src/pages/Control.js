/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useState } from "react";

import { Row, Col, Card, Button, Descriptions, message } from "antd";
import { useQuery, useQueryClient, useMutation } from "react-query";
import SelectComponent from "../components/SelectComponent";
import MqttComponent from "../components/MqttComponent";

import {
  publishToMqtt,
  getButtons,
  updateBtnState,
} from "../Axios/apiFunctions";

const Control = ({ socket }) => {
  const [selectedMacaddress, setSelectedMacaddress] = useState();

  const [loading, setLoading] = useState(false);
  const [mqttMessage, setMqttMessage] = useState("");

  const { data: buttons } = useQuery(
    ["getAllButtons", selectedMacaddress],
    () => getButtons({ macAddress: selectedMacaddress })
  );

  const queryClient = useQueryClient();
  const getDataMutation = useMutation(getButtons, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["getAllButtons", selectedMacaddress]);
    },
  });

  const handleButtonClick = async (data) => {
    const currentState = data.state === 0 ? 1 : 0;

    setLoading(true);

    let endPoint, messageToPublish;
    switch (data.name) {
      case "Camera": {
        endPoint = "camera";
        messageToPublish = currentState === 0 ? "hide" : "show";
        break;
      }
      case "Get OUT GPIOs": {
        endPoint = "config";
        messageToPublish = "getOUTGPIOs";
        break;
      }
      case "Upgrade OS": {
        endPoint = "config";
        messageToPublish = "upgradeOS";
        break;
      }
      case "Get OS Upgrade Status": {
        endPoint = "config";
        messageToPublish = "getOSUpgradeStatus";
        break;
      }
      case "Shutdown": {
        endPoint = "config";
        messageToPublish = "shutdown";
        break;
      }
      case "Restart": {
        endPoint = "config";
        messageToPublish = "restart";
        break;
      }
      case "Get Logs": {
        endPoint = "logs";
        messageToPublish = "logs";
        break;
      }
      default: {
        endPoint = "setGPIO";
        messageToPublish = `${data.value};${currentState}`;
      }
    }

    const res = await publishToMqtt(
      selectedMacaddress,
      messageToPublish,
      endPoint
    );

    await updateBtnState(selectedMacaddress, data._id, currentState);

    if (res.status === 200) {
      if (endPoint === "logs") {
        setMqttMessage(res.data);
      }
      getDataMutation.mutate(selectedMacaddress);
      setLoading(false);
      data.name !== "Restart" &&
      data.name !== "Shutdown" &&
      data.name !== "Get OS Upgrade Status" &&
      data.name !== "Upgrade OS" &&
      data.name !== "Get OUT GPIOs" &&
      data.name !== "Get Logs"
        ? message.success(
            `${data.name} turned ${currentState === 0 ? "off" : "on"}`
          )
        : message.success(`${data.name} Started`);
    } else {
      setLoading(false);

      message.error(
        "Something went wrong, please check your internet connection"
      );
    }
  };

  return (
    <>
      <Row gutter={[24, 0]} style={{ justifyContent: "center" }}>
        <Col span={24} md={24} className='mb-24'>
          <Card
            bordered={false}
            title={
              <>
                <h6 className='font-semibold m-0'>Controls</h6>
                <SelectComponent
                  setSelectedMacaddress={setSelectedMacaddress}
                  getDataMutation={getDataMutation}
                />
              </>
            }
            className='header-solid h-full card-profile-information'
            bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}>
            <hr />

            <Descriptions style={{ alignItems: "center" }}>
              {buttons?.data?.button?.buttons?.map((btn) => {
                return (
                  <Descriptions.Item
                    span={1}
                    key={btn.name}
                    style={{ alignItems: "center" }}>
                    <Button
                      loading={loading}
                      type='primary'
                      style={{
                        backgroundColor: `${
                          btn.name !== "Restart" &&
                          btn.name !== "Shutdown" &&
                          btn.name !== "Get OS Upgrade Status" &&
                          btn.name !== "Upgrade OS" &&
                          btn.name !== "Get OUT GPIOs" &&
                          btn.name !== "Get Logs" &&
                          btn.state === 1
                            ? "green"
                            : ""
                        }`,
                        border: "none",
                      }}
                      size='sm'
                      className='tag-primary'
                      onClick={() => handleButtonClick(btn)}>
                      {btn.name + " "}

                      {btn.name !== "Restart" &&
                        btn.name !== "Shutdown" &&
                        btn.name !== "Get OS Upgrade Status" &&
                        btn.name !== "Upgrade OS" &&
                        btn.name !== "Get OUT GPIOs" &&
                        btn.name !== "Get Logs" &&
                        `(${btn.state === 0 ? "OFF" : "ON"})`}
                    </Button>
                  </Descriptions.Item>
                );
              })}
            </Descriptions>
          </Card>
        </Col>
      </Row>
      {selectedMacaddress && (
        <div>
          <MqttComponent
            socket={socket}
            selectedMacaddress={selectedMacaddress}
          />
        </div>
      )}
    </>
  );
};

export default Control;
