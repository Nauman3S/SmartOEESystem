import React, { useState, memo } from "react";
import { getDataByMacAddress, getSensorNames } from "../Axios/apiFunctions";
import { useQuery } from "react-query";
import SelectComponent from "./SelectComponent";
import { Card, Button, Table } from "antd";
import { useSelector } from "react-redux";

const TableComponent = ({ setVisible }) => {
  const [selectedMacaddress, setSelectedMacaddress] = useState("");
  const authState = useSelector((state) => state.auth);

  const { data: mqttData, loading: mqttLoading } = useQuery(
    ["getDataByMacAddress", selectedMacaddress],
    () => getDataByMacAddress({ query: { macAddress: selectedMacaddress } })
  );

  const { data: sensorNames, loading: sensorLoading } = useQuery(
    ["getSensorNames"],
    getSensorNames
  );

  const columns = [
    {
      title: "MACADDRESS",
      dataIndex: "macAddress",
      key: "macAddress",
      width: "32%",
    },
    {
      title: "OEE",
      dataIndex: "oee",
      key: "oee",
    },

    {
      title: "Temperature",
      key: "temperature",
      dataIndex: "temperature",
    },
    {
      title: "Humidity",
      key: "humidity",
      dataIndex: "humidity",
    },
    {
      title: "AmpsMAX/Watts",
      key: "watts",
      dataIndex: "watts",
    },
  ];
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
            {!(authState.role === "admin") && (
              <Button
                type='primary'
                className='tag-primary'
                onClick={() => setVisible(true)}>
                {authState.role === "superAdmin" && "Update Sensors Name"}
              </Button>
            )}
          </>
        }>
        <div className='table-responsive'>
          <Table
            columns={columns}
            dataSource={!mqttLoading && mqttData?.data?.data}
            pagination={false}
            className='ant-border-space'
          />
        </div>
      </Card>
    </>
  );
};
export default memo(TableComponent);
