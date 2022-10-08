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
import { useSelector } from "react-redux";
import { useQuery, useQueryClient, useMutation } from "react-query";

import { Card, Col, Row, Typography } from "antd";
import { clientDashboardCount } from "../Axios/apiFunctions";
import { ReadFilled, ProjectFilled, ControlFilled } from "@ant-design/icons";
import TableComponent from "../components/TableComponent";

const Home = ({ socket }) => {
  const { Title } = Typography;

  const { data: counts } = useQuery(
    "clientDashboardCount",
    clientDashboardCount
  );

  const authState = useSelector((state) => state.auth);
  const [visible, setVisible] = useState(false);

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
  let a = 23;
  const count = [
    {
      today: "Total Macaddress",
      title: counts?.data?.macAddressCount?.macAddress,
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
      today: "Role",
      title: authState.role.toUpperCase(),
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
              key={index}
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
        <TableComponent />
      </div>
    </>
  );
};

export default Home;
