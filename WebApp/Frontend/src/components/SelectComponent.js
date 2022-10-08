import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useQuery } from "react-query";
import {
  getAllMacAddress,
  getAdminUserAllMacAddress,
} from "../Axios/apiFunctions";
import { useSelector } from "react-redux";

const SelectComponent = ({ setSelectedMacaddress, page }) => {
  const [mac0, setMac0] = useState();

  const authState = useSelector((state) => state.auth);
  const { data: macAddress } = useQuery(
    authState.role === "client"
      ? "getAllMacAddress"
      : "getAdminUserAllMacAddress",
    authState.role === "client" ? getAllMacAddress : getAdminUserAllMacAddress
  );

  useEffect(() => {
    authState.role === "client" && page === "home"
      ? setMac0(macAddress?.data?.data?.macAddress[0]?.macAddress)
      : setMac0("Select MacAddresss");
  }, [macAddress?.data?.data?.macAddress, authState.role, page]);

  const { Option } = Select;

  return (
    <Select
      value={mac0}
      style={{
        width: "15%",
        height: "25%",
        border: "1px solid black",
      }}
      onChange={(value) => {
        setMac0(value);
        setSelectedMacaddress(value);
      }}>
      {authState.role === "client"
        ? macAddress?.data?.data?.macAddress?.map((data) => {
            return (
              <Option key={data._id} value={data.macAddress}>
                {data.macAddress}
              </Option>
            );
          })
        : authState.role === "admin"
        ? macAddress?.data?.Macaddressess[0]?.users.map((data) => {
            return data.macAddress.map((data) => {
              return (
                <Option key={data._id} value={data.macAddress}>
                  {data.macAddress}
                </Option>
              );
            });
          })
        : macAddress?.data?.Macaddressess.map((data) => {
            return data.macAddress.map((data) => {
              return (
                <Option key={data._id} value={data.macAddress}>
                  {data.macAddress}
                </Option>
              );
            });
          })}
    </Select>
  );
};

export default SelectComponent;
