import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";

import { Card, Col, Row, Typography } from "antd";
import {
  clientDashboardCount,
  getDataByMacAddress,
} from "../Axios/apiFunctions";
import { ReadFilled } from "@ant-design/icons";
import TableComponent from "../components/TableComponent";
import ProfileSvg from "../assets/Icons/ProfileSvg";
import LineChart from "../components/chart/LineChart";

const Home = () => {
  const [selectedMacaddress, setSelectedMacaddress] = useState("");
  const { Title } = Typography;

  const { data: counts } = useQuery(
    "clientDashboardCount",
    clientDashboardCount
  );

  const { data: mqttData, loading: mqttLoading } = useQuery(
    ["getDataByMacAddress", selectedMacaddress],
    () => getDataByMacAddress({ query: { macAddress: selectedMacaddress } })
  );

  const authState = useSelector((state) => state.auth);

  const count = [
    {
      today: "Total Macaddress",
      title: counts?.data?.macAddressCount?.macAddress,
      icon: <ReadFilled />,
      bnb: "bnb2",
    },

    {
      today: "Role",
      title: authState.role.toUpperCase(),
      icon: <ProfileSvg />,
      bnb: "bnb2",
    },
  ];

  return (
    <>
      <div className='layout-content'>
        <Row
          className='rowgap-vbox'
          gutter={[24, 0]}
          style={{ justifyContent: "center" }}>
          {count.map((c, index) => (
            <Col
              key={c + index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className='mb-24'>
              <Card bordered={false} className='criclebox'>
                <div className='number'>
                  <Row align='middle' gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={4}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={5}>
                      <div className='icon-box'>{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <TableComponent
          selectedMacaddress={selectedMacaddress}
          setSelectedMacaddress={setSelectedMacaddress}
          mqttData={mqttData}
          mqttLoading={mqttLoading}
        />
        {!mqttLoading &&
          selectedMacaddress &&
          mqttData?.data?.data.length > 0 && (
            <LineChart
              selectedMacaddress={selectedMacaddress}
              mqttData={mqttData}
            />
          )}
      </div>
    </>
  );
};

export default Home;
