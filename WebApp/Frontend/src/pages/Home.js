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
import React, { useState } from "react";

import { Card, Col, Row, Typography, Spin, Alert } from "antd";

import { useSelector } from "react-redux";

// import LineChart from "../components/chart/LineChart";

import { Marker } from "react-mapbox-gl";
import { GiPositionMarker } from "react-icons/gi";
import { Tooltip } from "antd";
import MapComponent from "../components/MapComponent";

import { ReadFilled, ProjectFilled, ControlFilled } from "@ant-design/icons";
import {
  getCounts,
  getAdminUserAllMacAddress,
  getDeviceLocationsByMacAddress,
} from "../Axios/apiFunctions";
import { useQuery } from "react-query";

function Home() {
  const { Title, Text } = Typography;
  const authState = useSelector((state) => state.auth);
  const [spinLoading, setSpinLoading] = useState(true);

  const { data: counts, loading } = useQuery("getCounts", getCounts);

  const { data: macAddress, loading: macLoading } = useQuery(
    "getAdminUserAllMacAddress",
    getAdminUserAllMacAddress
  );
  let macAddressArr = [];
  if (authState.role === "admin") {
    !macLoading &&
      macAddress?.data?.Macaddressess[0] &&
      macAddress?.data?.Macaddressess[0]?.users.map((data) => {
        return data.macAddress?.map((data1) => {
          return macAddressArr.push(data1.macAddress);
        });
      });
  } else {
    !macLoading &&
      macAddress?.data?.Macaddressess &&
      macAddress?.data?.Macaddressess?.map((data) => {
        return (
          data?.macAddress &&
          data.macAddress?.map((data) => {
            return macAddressArr.push(data.macAddress);
          })
        );
      });
  }

  const { data: locationData, loading: locationLoading } = useQuery(
    ["getDeviceLocationsByMacAddress", macAddressArr],
    () => getDeviceLocationsByMacAddress(macAddressArr)
  );
  let marker;
  let macAddressAr = [];
  if (!locationLoading && locationData?.data?.location[0]?.longitude) {
    for (let i = 0; i < locationData?.data?.location.length; i++) {
      for (let j = 0; j < locationData?.data?.location.length; j++) {
        if (
          locationData?.data?.location[i]?.longitude ===
            locationData?.data?.location[j]?.longitude &&
          i !== j &&
          macAddressAr.indexOf(locationData?.data?.location[i]?.macAddress) ===
            -1
        ) {
          macAddressAr.push(locationData?.data?.location[i]?.macAddress);
        }
      }
    }
    marker = locationData?.data?.location?.map((location, index) => {
      return (
        <Tooltip
          key={location + "Map01" + index}
          title={`MacAddress: ${
            macAddressAr?.indexOf(location?.macAddress) !== -1
              ? macAddressAr
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

  const profile = [
    <svg
      width='22'
      height='22'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      key={0}>
      <path
        d='M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z'
        fill='#fff'></path>
      <path
        d='M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z'
        fill='#fff'></path>
      <path
        d='M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z'
        fill='#fff'></path>
      <path
        d='M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z'
        fill='#fff'></path>
    </svg>,
  ];

  const count = [
    {
      today: "Total Macaddress",
      title: counts?.data?.totalMacAddress,
      icon: <ReadFilled />,
      bnb: "bnb2",
    },
    {
      today: "Total Programs",
      title: counts?.data?.program,
      icon: <ProjectFilled />,
      bnb: "bnb2",
    },
    {
      today: "Total Controls",
      title: "12",
      icon: <ControlFilled />,
      bnb: "redtext",
    },
    {
      today: "Total Users",
      title:
        authState.role === "superAdmin"
          ? counts?.data?.totalUser
          : counts?.data?.totalAdminUsers?.users?.length,
      icon: profile,
      bnb: "bnb2",
    },
  ];

  return (
    <>
      <div className='layout-content'>
        <Row className='rowgap-vbox' gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={"Home" + index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className='mb-24'>
              <Card bordered={false} className='criclebox '>
                <div className='number'>
                  <Row align='middle' gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className='icon-box'>{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <div>
          {!locationLoading && locationData?.data?.location[0]?.longitude ? (
            <MapComponent
              coordinates={{
                long: locationData?.data?.location[0]?.longitude,
                lat: locationData?.data?.location[0]?.latitude,
              }}
              marker={marker}
              height={"60vh"}
            />
          ) : (
            <Spin spinning={spinLoading}>
              <Alert
                message='Loading...'
                description='No Device Longitude & Longitude Found'
                type='info'
              />
            </Spin>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
