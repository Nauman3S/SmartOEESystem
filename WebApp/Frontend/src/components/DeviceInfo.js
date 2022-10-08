import React, { useState, useEffect, useRef } from "react";
import { Card, Col, Row, Typography } from "antd";
import SelectComponent from "./SelectComponent";
import { getAllMacAddress } from "../Axios/apiFunctions";
let mac;
const DeviceInfo = ({ socket }) => {
  const { Title } = Typography;
  const [selectedMacaddress, setSelectedMacaddress] = useState();
  // const [data, setData] = useState();
  const [didMount, setDidMount] = useState(false);

  let memory = useRef();
  let throttled = useRef();
  let sdCard = useRef();
  let gpuTemp = useRef();
  let cpuTemp = useRef();
  let powerUsage = useRef();
  let armMemory = useRef();
  let gpuMemory = useRef();
  let cpuInfo = useRef();

  const fetchFirstMacAddress = async () => {
    try {
      const result = await getAllMacAddress();
      setSelectedMacaddress(result?.data?.data.macAddress[0]?.macAddress);
      mac = result?.data?.data.macAddress[0]?.macAddress;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDidMount(true);

    fetchFirstMacAddress();

    return () => {
      setDidMount(false);
      socket.off("send_message");
    };
  }, [socket]);

  const setMacAddress = (value) => {
    mac = value;
    setSelectedMacaddress(value);
  };

  const color = (value, macAddress, ref) => {
    if (selectedMacaddress === macAddress && ref?.current) {
      if (value > 75) {
        ref.current.style.background = "red";
        return;
      } else if (value > 25 && value < 75) {
        ref.current.style.background = "orange";
        return;
      } else {
        ref.current.style.background = "green";
        return;
      }
    }

    return;
  };
  const setDeviceInfo = (logsData) => {
    if (
      mac === logsData?.macAddress &&
      cpuInfo?.current &&
      memory?.current &&
      throttled?.current &&
      sdCard?.current &&
      cpuTemp?.current &&
      gpuTemp?.current &&
      powerUsage?.current &&
      armMemory?.current &&
      gpuMemory?.current
    ) {
      cpuInfo.current.innerText = logsData?.cpuInfo + "%";

      memory.current.innerText = logsData?.memory + "%";

      sdCard.current.innerText = logsData?.sdCard + "%";

      cpuTemp.current.innerText = logsData?.cpuTemp + "°";

      gpuTemp.current.innerText = logsData?.gpuTemp + "°";

      throttled.current.innerText = logsData?.throttled;
      powerUsage.current.innerText = logsData?.powerUsage + "V";
      armMemory.current.innerText = logsData?.armMemory + "M";
      gpuMemory.current.innerText = logsData?.gpuMemory + "M";
      color(logsData?.cpuInfo, logsData?.macAddress, cpuInfo);
      color(logsData?.memory, logsData?.macAddress, memory);
      color(logsData?.sdCard, logsData?.macAddress, sdCard);
      color(logsData?.cpuTemp, logsData?.macAddress, cpuTemp);
      color(logsData?.gpuTemp, logsData?.macAddress, gpuTemp);
    }
  };

  socket.on("send_message", (data) => {
    const logsData = JSON.parse(data);
    setDeviceInfo(logsData);
  });

  if (!didMount) {
    return null;
  }

  const deviceInfo = [
    {
      type: "deviceInfo",
      title: "CPU Info",
      ref: cpuInfo,
    },
    {
      type: "deviceInfo",
      title: "Memory",
      ref: memory,
    },
    {
      type: "deviceInfo",
      title: "SD Card",
      ref: sdCard,
    },
    {
      type: "deviceInfo",
      title: "CPU Temp",
      ref: cpuTemp,
    },
    {
      type: "deviceInfo",
      title: "GPU Temp",
      ref: gpuTemp,
    },
    {
      type: "deviceInfo",
      title: "Throttled",
      ref: throttled,
    },
    {
      type: "deviceInfo",
      title: "Power Usage",
      ref: powerUsage,
    },
    {
      type: "deviceInfo",
      title: "Arm Memory",
      ref: armMemory,
    },
    {
      type: "deviceInfo",
      title: "GPU Memory",
      ref: gpuMemory,
    },
  ];

  return (
    <>
      <div className='layout-content'>
        <Card
          // bordered={false}
          style={{ padding: 10 }}
          className='criclebox tablespace mb-24'
          title={
            <>
              <h3>Device Info</h3>
              <SelectComponent
                setSelectedMacaddress={setMacAddress}
                page='home'
              />
            </>
          }>
          <Row className='rowgap-vbox' gutter={[24, 0]}>
            {deviceInfo.map((c, index) => (
              <Col
                key={"deviceInfo" + index}
                xs={24}
                sm={24}
                md={12}
                lg={6}
                xl={6}
                className='mb-24'>
                <Card
                  bordered={false}
                  className='criclebox'
                  style={{ backgroundColor: "#D3D3D3", padding: 10 }}>
                  <div className='number'>
                    <Row align='middle' gutter={[24, 0]}>
                      <Col xs={18}>
                        <span>{c.today}</span>
                        <Title
                          level={3}
                          style={{ fontSize: c.type === "deviceInfo" && 23 }}>
                          {c.title} <small className={c.bnb}>{c.persent}</small>
                        </Title>
                      </Col>
                      <Col xs={6}>
                        <div
                          className='icon-box'
                          ref={c.ref}
                          title={c.title}
                          style={{
                            fontWeight: "bold",
                          }}>
                          ...
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </div>
    </>
  );
};

export default DeviceInfo;
