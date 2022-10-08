import React, { useState, useEffect, useRef } from "react";
import { Input } from "antd";

const { TextArea } = Input;

const MqttComponent = ({ socket, selectedMacaddress }) => {
  const [logs, setLogs] = useState("Logs");
  const [didMount, setDidMount] = useState(false);

  socket.on("send_message", (data) => {
    const logsData = JSON.parse(data);
    if (logsData?.logs) {
      setLogs(logsData);
    }
  });

  useEffect(() => {
    setDidMount(true);

    return () => {
      setDidMount(false);
      socket.off("send_message");
    };
  }, [socket]);
  if (!didMount) {
    return null;
  }

  // socket.on("send_message", (data) => {
  //   const logsData = JSON.parse(data);
  //   if (
  //     selectedMacaddress === logsData?.macAddress &&

  //   ) {
  //     console.log(logsData);

  //   }
  //   if (logsData?.logs) {
  //     setLogs(logsData);
  //   }
  // });

  return (
    <div style={{ marginBotton: 50, textAlign: "center" }}>
      <TextArea
        rows={4}
        placeholder='Logs'
        disabled={true}
        // ref={textArefRef}
        value={selectedMacaddress === logs.macAddress ? logs.logs : "Logs"} //TODO: Real Logs
        style={{ color: "red", width: "80%" }}
      />
    </div>
  );
};

export default MqttComponent;
