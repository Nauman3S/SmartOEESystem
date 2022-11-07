import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useQuery } from "react-query";
import {
  getAllMacAddress,
  getAdminUserAllMacAddress,
} from "../Axios/apiFunctions";
import { useSelector } from "react-redux";

const SelectComponent = ({ setSelectedMacaddress, page }) => {
  const [macList, setMacList] = useState();

  const authState = useSelector((state) => state.auth);
  const { data, loading } = useQuery(
    authState.role === "client"
      ? "getAllMacAddress"
      : "getAdminUserAllMacAddress",
    authState.role === "client" ? getAllMacAddress : getAdminUserAllMacAddress
  );

  useEffect(() => {
    if (!loading) {
      setMacList(data?.data?.macAddressess?.macAddress);
    }
  }, [loading, data?.data?.macAddressess]);

  const { Option } = Select;

  return (
    <Select
      defaultValue={"Select MacAddress"}
      style={{
        width: "15%",
        height: "25%",
        border: "1px solid black",
      }}
      onChange={(value) => {
        setSelectedMacaddress(value);
      }}>
      {authState.role === "client" &&
        !loading &&
        macList?.map((data, index) => {
          return (
            <Option key={`${data._id + index}`} value={data.macAddress}>
              {data.macAddress}
            </Option>
          );
        })}
    </Select>
  );
};

export default SelectComponent;
