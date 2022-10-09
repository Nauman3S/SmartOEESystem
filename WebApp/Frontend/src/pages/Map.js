import React from "react";
import { Marker } from "react-mapbox-gl";
import { GiPositionMarker } from "react-icons/gi";
import { Tooltip, Spin, Alert } from "antd";
import { useQuery } from "react-query";
import {
  getAllMacAddress,
  getDeviceLocationsByMacAddress,
} from "../Axios/apiFunctions";
import MapComponent from "../components/MapComponent";

const Map = () => {
  const { data: macAddress } = useQuery("getAllMacAddress", getAllMacAddress);
  const macAddressAr = macAddress?.data?.data?.macAddress?.map((data) => {
    return data.macAddress;
  });

  const { data: locationData, loading: locationLoading } = useQuery(
    ["getDeviceLocationsByMacAddress", macAddressAr],
    () => getDeviceLocationsByMacAddress(macAddressAr)
  );

  let marker;
  let macAddressArr = [];
  if (!locationLoading && locationData?.data?.location[0]?.longitude) {
    for (let i = 0; i < locationData?.data?.location.length; i++) {
      for (let j = 0; j < locationData?.data?.location.length; j++) {
        if (
          locationData?.data?.location[i]?.longitude ===
            locationData?.data?.location[j]?.longitude &&
          i !== j &&
          macAddressArr.indexOf(locationData?.data?.location[i]?.macAddress) ===
            -1
        ) {
          macAddressArr.push(locationData?.data?.location[i]?.macAddress);
        }
      }
    }
    marker = locationData?.data?.location?.map((location, index) => {
      return (
        <Tooltip
          key={location + "map" + index}
          title={`MacAddresses: ${
            macAddressArr?.indexOf(location?.macAddress) !== -1
              ? macAddressArr
              : location?.macAddress
          }`}
          color={"geekblue"}>
          <Marker coordinates={[location?.longitude, location?.latitude]}>
            <GiPositionMarker size={40} color='#108ee9' />
          </Marker>
        </Tooltip>
      );
    });
  }

  return (
    <div>
      {!locationLoading && locationData?.data?.location[0]?.longitude ? (
        <MapComponent
          coordinates={{
            long: locationData?.data?.location[0]?.longitude,
            lat: locationData?.data?.location[0]?.latitude,
          }}
          marker={marker}
          height={"80vh"}
        />
      ) : (
        <Spin>
          <Alert
            message='Loading...'
            description='No Device Longitude & Longitude Found'
            type='info'
          />
        </Spin>
      )}
    </div>
  );
};
export default Map;
