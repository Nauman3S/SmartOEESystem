import React, { useState } from "react";
import { addMacAddress, getAllMacAddress } from "../Axios/apiFunctions";

import { useQueryClient, useMutation } from "react-query";

import { Button, Form, Input, Modal, message } from "antd";
import TableComponent from "../components/TableComponent";

const ClientData = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleAddMacAddress = async (values) => {
    setConfirmLoading(true);
    const res = await addMacAddress(values.macAddress);
    if (res.status === 200) {
      getDataMutation.mutate();
      message.success("MacAddress added successfully!");
      setVisible(false);
      setConfirmLoading(false);
    }
  };

  const queryClient = useQueryClient();
  const getDataMutation = useMutation(getAllMacAddress, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getAllMacAddress");
    },
  });

  return (
    <>
      {" "}
      <TableComponent setVisible={setVisible} />{" "}
      <Modal
        title='Add New Program'
        destroyOnClose={true}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        confirmLoading={confirmLoading}>
        <Form
          name='control-ref'
          onFinish={handleAddMacAddress}
          labelCol={{
            span: 8,
          }}>
          <Form.Item
            name='macAddress'
            label='MacAddress'
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' loading={confirmLoading}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ClientData;
