import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { updateSensorName, getSensorNames } from "../Axios/apiFunctions";
import { useMutation, useQueryClient } from "react-query";
import TableComponent from "../components/TableComponent";

const Data = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const queryClient = useQueryClient();
  const sensorNamesMutation = useMutation(getSensorNames, {
    onSuccess: () => {
      queryClient.invalidateQueries("getSensorNames");
    },
  });
  const handleChangeSenorNames = async (data) => {
    setConfirmLoading(true);
    const res = await updateSensorName(data);
    if (res.status === 200) {
      sensorNamesMutation.mutate();
      message.success("Senors names updated successfully!");
      setConfirmLoading(false);
      setVisible(false);
    } else {
      message.error(
        "Something went wrong, please check your internet connection!"
      );
      setConfirmLoading(false);
      setVisible(false);
    }
  };

  return (
    <>
      <TableComponent setVisible={setVisible} />
      <Modal
        title='Update Sensors Name'
        destroyOnClose={true}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        confirmLoading={confirmLoading}>
        <Form
          name='control-ref'
          onFinish={handleChangeSenorNames}
          labelCol={{
            span: 8,
          }}>
          <Form.Item name='sensor1' label='Sensor 1 Name'>
            <Input />
          </Form.Item>
          <Form.Item name='sensor2' label='Sensor 2 Name'>
            <Input />
          </Form.Item>
          <Form.Item name='sensor3' label='Sensor 3 Name'>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={confirmLoading}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Data;
