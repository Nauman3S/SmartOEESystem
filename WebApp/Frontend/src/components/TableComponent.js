import React, { useState, useEffect } from "react";
import {
  getSensorNames,
  publishToMqtt,
  addSensorValue,
  getSensorValues,
  addEnergyCost,
  getEnerygyCost,
} from "../Axios/apiFunctions";
import { useQuery, useMutation, useQueryClient } from "react-query";
import SelectComponent from "./SelectComponent";
import { Card, Button, Table, message, Form, Modal, Input } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import NoData from "../assets/Icons/NoData";
import ModalComponent from "../components/ModalComponent";

const TableComponent = ({
  setVisible,
  selectedMacaddress,
  setSelectedMacaddress,
  mqttLoading,
  mqttData,
}) => {
  const [sensors, setSensors] = useState([]);
  const [sensorsValues, setSensorsValues] = useState([]);
  const [threshold, setThreshold] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [columnsT, setColumnsT] = useState([]);
  const [title, setTitle] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [energyModalVisible, setEnergyModalVisible] = useState(false);
  const [energyCost, setEnergyCost] = useState(0);

  const { data, loading } = useQuery("getSensorNames", getSensorNames);

  const { data: sensorValues, loading: sensorLoading } = useQuery(
    ["getSensorValues", selectedMacaddress],
    () => getSensorValues(selectedMacaddress)
  );

  const { data: energy, loading: energyCostLoading } = useQuery(
    ["getEnerygyCost"],
    getEnerygyCost
  );

  useEffect(() => {
    if (!loading) {
      setSensors(data?.data?.[0]?.sensors);
    }
  }, [loading, data?.data]);

  useEffect(() => {
    setEnergyCost(energy?.data?.energyCost);
  }, [energyCostLoading, energy?.data]);

  useEffect(() => {
    setSensorsValues(sensorValues?.data);
  }, [sensorLoading, sensorValues?.data]);
  const publishData = async (value, dataName) => {
    await publishToMqtt(selectedMacaddress, `${dataName} ${value}`);
  };
  const queryClient = useQueryClient();
  const getSensorValuesMutation = useMutation(getSensorValues, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getSensorValues");
    },
  });

  const getEnerygyCostMutation = useMutation(getEnerygyCost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getEnerygyCost");
    },
  });

  useEffect(() => {
    const getSensorsCol = () => {
      const mac = [
        {
          title: "MacAddress",
          dataIndex: "macAddress",
          key: "macAddress",
          width: "32%",
        },
      ];

      const energy = [
        {
          title: "Energy Cost x OEE",
          key: "energyCost",

          render: (data, record) => {
            if (energyCost) return parseInt(data.oee) * energyCost;

            return 0;
          },
        },
      ];

      if (sensorValues) {
        const col = sensors?.map((sensor) => {
          const sensorMinMax = getSensorMinMaxValue(sensor);
          return {
            title: () => (
              <>
                {sensor}
                <PlusCircleTwoTone
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    if (selectedMacaddress) {
                      setTitle({ name: sensor });
                      setThreshold(true);
                    } else {
                      message.error("Please Select a MacAddress first!");
                    }
                  }}
                />
              </>
            ),
            dataIndex: sensor?.toLowerCase(),
            key: sensor?.toLowerCase(),
            render: (value) => {
              if (
                (sensorMinMax?.max !== 0 &&
                  parseInt(value) >= sensorMinMax?.max) ||
                (sensorMinMax?.min !== 0 &&
                  parseInt(value) <= sensorMinMax?.min)
              ) {
                publishData(value, `${sensor} value reached`);
                // setThreshold(value);
              }
              return {
                props: {
                  style: {
                    background:
                      (sensorMinMax?.max !== 0 &&
                        parseInt(value) >= sensorMinMax?.max) ||
                      (sensorMinMax?.min !== 0 &&
                        parseInt(value) <= sensorMinMax?.min)
                        ? "red"
                        : "green",
                  },
                },
                children: (
                  <div
                    style={{
                      fontWeight: "bold",
                      color: "#fff",
                      textAlign: "center",
                    }}>
                    {value}
                  </div>
                ),
              };
            },
          };
        });
        if (col?.length > 0) {
          setColumnsT([...mac, ...col, ...energy]);
        }
      }
    };
    const getSensorMinMaxValue = (sensorName) => {
      for (let i = 0; i < sensorsValues?.length; i++) {
        if (sensorsValues[i]?.sensorName === sensorName) {
          const senVal = {
            max: sensorsValues[i].max,
            min: sensorsValues[i].min,
          };

          return senVal;
        }
      }
      return { min: 0, max: 0, sensorName: sensorName };
    };
    getSensorsCol();
  }, [
    loading,
    data?.data,
    selectedMacaddress,
    sensorLoading,
    sensorsValues,
    energyCost,
  ]);

  const handleAddSensorValue = async (values) => {
    setModalLoading(true);
    values.macAddress = selectedMacaddress;
    values.sensorName = title?.name;

    const res = await addSensorValue(values);
    if (res.status === 200) {
      getSensorValuesMutation.mutate();
      message.success("Sensor Value added successfully!");
      setThreshold(false);
      setModalLoading(false);
    }
  };

  const handleAddEnergyCost = async (data) => {
    setConfirmLoading(true);

    const res = await addEnergyCost(data);
    if (res.status === 200) {
      getEnerygyCostMutation.mutate();
      message.success("Energy Cost added successfully!");
      setConfirmLoading(false);

      setEnergyModalVisible(false);
    }
  };
  return (
    <>
      <Card
        bordered={false}
        className='criclebox tablespace mb-24'
        title={
          <>
            <h3>Data</h3>
            <SelectComponent setSelectedMacaddress={setSelectedMacaddress} />
          </>
        }
        extra={
          <>
            {
              <Button
                type='primary'
                className='tag-primary'
                onClick={() => setEnergyModalVisible(true)}>
                {energyCost && energyCost !== 0
                  ? "Update Energy Cost"
                  : "Add Energy Cost"}
              </Button>
            }
          </>
        }>
        <div className='table-responsive'>
          <Table
            className='ant-border-space'
            columns={columnsT}
            dataSource={!mqttLoading && mqttData?.data?.data}
            pagination={true}
            locale={{
              emptyText: (
                <>
                  <NoData />
                  {!selectedMacaddress && (
                    <h5 style={{ color: "red" }}>Please select Macaddress</h5>
                  )}
                  {selectedMacaddress && mqttData?.data?.data?.length === 0 && (
                    <h5 style={{ color: "red" }}>No Data Found</h5>
                  )}
                </>
              ),
            }}
          />
        </div>
      </Card>
      <ModalComponent
        visible={threshold}
        setVisible={setThreshold}
        loading={modalLoading}
        title={title}
        onFinish={handleAddSensorValue}
        initialValues={sensorsValues}
      />

      <Modal
        title={
          energyCost && energyCost !== 0
            ? "Update Energy Cost"
            : "Add Energy Cost"
        }
        destroyOnClose={true}
        open={energyModalVisible}
        footer={null}
        onCancel={() => setEnergyModalVisible(false)}
        confirmLoading={confirmLoading}>
        <Form
          name='control-ref'
          onFinish={handleAddEnergyCost}
          initialValues={{ energyCost: energyCost ? energyCost : 0 }}
          labelCol={{
            span: 0,
          }}>
          <Form.Item name='energyCost' label='Energy Cost'>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              loading={confirmLoading}
              style={{ alignSelf: "right" }}>
              {energyCost && energyCost !== 0 ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default TableComponent;
