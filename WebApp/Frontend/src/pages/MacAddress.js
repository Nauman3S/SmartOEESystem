import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Popconfirm,
  message,
  Form,
  Input,
  Modal,
} from "antd";

import {
  getAdminUserAllMacAddress,
  getAllMacAddress,
  removeMacAddress,
  addMacAddress,
} from "../Axios/apiFunctions";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "react-query";

const MacAddress = () => {
  const authState = useSelector((state) => state.auth);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { data: macAddress, loading } = useQuery(
    authState.role === "client"
      ? "getAllMacAddress"
      : " getAdminUserAllMacAddress",
    authState.role === "client" ? getAllMacAddress : getAdminUserAllMacAddress
  );
  let adminUserMacAddressess = [];
  if (authState.role === "admin") {
    macAddress?.data?.Macaddressess[0]?.users.map((data, index) => {
      return data.macAddress.map((mac, index) => {
        return adminUserMacAddressess.push({
          macAddress: mac.macAddress,
          _id: data._id,
        });
      });
    });
  } else if (authState.role === "superAdmin") {
    macAddress?.data?.Macaddressess.map((data, index) => {
      return data.macAddress.map((mac, index) => {
        return adminUserMacAddressess.push({
          macAddress: mac.macAddress,
          _id: data._id,
        });
      });
    });
  }
  const columns = [
    {
      title: "MacAddress",
      dataIndex: "macAddress",
      key: "macAddress",
      width: "32%",
    },

    {
      title: "Delete",
      key: "delete",
      render: (data) => (
        <>
          <Popconfirm
            title='Are you sure？'
            okText='Yes'
            cancelText='No'
            onConfirm={() => handleDeleteMacAddress(data)}>
            <Button type='danger' className='tag-primary'>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const queryClient = useQueryClient();
  const getDataMutation = useMutation(
    authState.role === "client" ? getAllMacAddress : getAdminUserAllMacAddress,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(
          authState.role === "client"
            ? "getAllMacAddress"
            : " getAdminUserAllMacAddress"
        );
      },
    }
  );
  const getMacAddressMutation = useMutation(getAllMacAddress, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getAllMacAddress");
    },
  });

  const handleAddMacAddress = async (values) => {
    setConfirmLoading(true);
    const res = await addMacAddress(values.macAddress);
    if (res.status === 200) {
      getMacAddressMutation.mutate();
      message.success("MacAddress added successfully!");
      setVisible(false);
      setConfirmLoading(false);
    }
  };

  const handleDeleteMacAddress = async (data) => {
    const res = await removeMacAddress(data.macAddress, data._id);
    if (res.status === 200) {
      getDataMutation.mutate();
      message.success("MacAddress Deleted!");
    } else {
      message.error(
        "Something went wrong, please check your internet connection!"
      );
    }
  };

  return (
    <>
      <div className='tabled'>
        <Row gutter={[24, 0]}>
          <Col xs='24' xl={24}>
            <Card
              bordered={false}
              className='criclebox tablespace mb-24'
              title={"MacAddress"}
              extra={
                <>
                  {!(authState.role === "admin") && (
                    <Button
                      type='primary'
                      className='tag-primary'
                      onClick={() => setVisible(true)}>
                      {authState.role === "client" && "Add New MacAddress"}
                    </Button>
                  )}
                </>
              }>
              <div className='table-responsive'>
                <Table
                  columns={columns}
                  dataSource={
                    loading || authState.role === "client"
                      ? macAddress?.data?.data?.macAddress
                      : adminUserMacAddressess
                  }
                  pagination={false}
                  className='ant-border-space'
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        title='Add New MacAddress'
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

export default MacAddress;
