import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  message,
  Typography,
  Tooltip,
} from "antd";

import {
  getAdminUsers,
  adminUserSignUp,
  deleteAdminUsers,
  getAllUsers,
} from "../Axios/apiFunctions";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
const { Paragraph } = Typography;

const AllUsers = () => {
  const [visible, setVisible] = useState(false);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    show: false,
    email: "",
  });

  const authState = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const { loading, data } = useQuery(
    authState.role === "admin" ? "getAdminUsers" : "getAllUsers",
    authState.role === "admin" ? getAdminUsers : getAllUsers
  );

  const queryClient = useQueryClient();
  const getDataMutation = useMutation(
    authState.role === "admin" ? getAdminUsers : getAllUsers,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(
          authState.role === "admin" ? "getAdminUsers" : "getAllUsers"
        );
      },
    }
  );
  const handlePasswordView = (email) => {
    if (showPassword.show) {
      setShowPassword({
        show: false,
        email: email,
      });
    } else {
      setShowPassword({
        show: true,
        email: email,
      });
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      width: "32%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      key: "clientPassword",
      render: (data) => (
        <>
          {showPassword.show && data.email === showPassword.email ? (
            <Tooltip title={"Click agian to hide password"} placement='bottom'>
              <Paragraph
                onClick={() => {
                  handlePasswordView(data.email);
                }}
                style={{ cursor: "pointer" }}
                copyable>
                {data.clientPassword}
              </Paragraph>
            </Tooltip>
          ) : (
            <Tooltip title={"Click to show password"} placement='bottom'>
              <Paragraph
                onClick={() => {
                  handlePasswordView(data.email);
                }}
                style={{ fontWeight: "bold", cursor: "pointer" }}>
                ********
              </Paragraph>
            </Tooltip>
          )}
        </>
      ),
      hidden: authState.role === "superAdmin" ? true : false,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
            onConfirm={() => handleDelete(data)}>
            <Button type='danger' className='tag-primary'>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
      hidden: authState.role === "superAdmin" ? true : false,
    },
  ].filter((item) => !item.hidden);
  const handleDelete = async (values) => {
    const res = await deleteAdminUsers(values._id);

    if (res.status === 200) {
      getDataMutation.mutate();
      message.success("User Deleted Successfully");
    }
  };

  const handleAddNewUser = async (values) => {
    values.role = "client";
    setConfirmLoading(true);
    form.resetFields();

    const res = await adminUserSignUp(values);

    if (res.status === 200) {
      getDataMutation.mutate();
      setConfirmLoading(false);
      setVisible(false);

      message.success("New User Added Succssfully!");
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
              title='All Users'
              extra={
                <>
                  {authState.role === "admin" && (
                    <Button
                      type='primary'
                      className='tag-primary'
                      onClick={() => setVisible(true)}>
                      Add User
                    </Button>
                  )}
                </>
              }>
              <div className='table-responsive'>
                <Table
                  columns={columns}
                  dataSource={
                    loading || authState.role === "admin"
                      ? data?.data?.users?.users
                      : data?.data?.users
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
        title='Create New User'
        destroyOnClose={true}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        confirmLoading={confirmLoading}>
        <Form
          name='control-ref'
          onFinish={handleAddNewUser}
          labelCol={{
            span: 8,
          }}>
          <Form.Item
            name='fullName'
            label='Client Full Name'
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='email'
            label='Client Email'
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='password'
            label='Password'
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' loading={confirmLoading}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AllUsers;
