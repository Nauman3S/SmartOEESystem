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
  message,
  Popconfirm,
} from "antd";

import {
  getProgramsOfLoggedInUser,
  addProgram,
  allPrograms,
  publishToMqtt,
  deleteProgram,
  editProgram,
} from "../Axios/apiFunctions";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "react-query";
import SelectComponent from "../components/SelectComponent";

const Program = () => {
  const authState = useSelector((state) => state.auth);
  const [visible, setVisible] = useState({
    visible: false,
    type: "add",
  });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedMacaddress, setSelectedMacaddress] = useState();
  const [editProgramId, setEditProgramId] = useState({});
  const [form] = Form.useForm();

  const { data, loading } = useQuery(
    authState.role === "superAdmin"
      ? "allPrograms"
      : "allProgramsOfLoggedInUser",
    authState.role === "superAdmin" ? allPrograms : getProgramsOfLoggedInUser
  );
  const columns = [
    {
      title: "Program Name",
      dataIndex: "programName",
      key: "programName",
      width: "32%",
    },
    {
      title: "Command",
      dataIndex: "command",
      key: "command",
    },

    {
      title: "Run",
      key: "run",
      width: "1%",
      render: (data) => (
        <>
          <Button
            type='primary'
            className='tag-primary'
            onClick={() => {
              hanldeRunProgram(data);
            }}>
            Run
          </Button>
        </>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      width: "1%",

      render: (data) => (
        <>
          <Button
            type='primary'
            className='tag-primary'
            onClick={() => {
              handleEditProgram(data);
            }}>
            Edit
          </Button>
        </>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      width: "20%",

      render: (data) => (
        <>
          <Popconfirm
            title='Are you sure to delete this task?'
            onConfirm={() => {
              handleDeleteProgram(data);
            }}
            // onCancel={cancel}
            okText='Yes'
            cancelText='No'>
            <Button type='danger' className='tag-primary'>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleDeleteProgram = async (data) => {
    const res = await deleteProgram(data._id);

    if (res.status === 200) {
      getDataMutation.mutate();
      message.success(`${data.programName} Deleted`);
    } else {
      message.error(
        `Something went wrong, please check your internet connection`
      );
    }
  };
  const handleEditProgram = (data) => {
    form.setFieldsValue({
      programName: data.programName,
      command: data.command,
    });
    setEditProgramId(data._id);
    setVisible({ visible: true, type: "edit" });
  };

  const hanldeRunProgram = async (data) => {
    if (selectedMacaddress) {
      const res = await publishToMqtt(
        selectedMacaddress,
        data.command,
        "remoteExecutor"
      );

      if (res.status === 200) {
        message.success(`${data.programName} Running`);
      } else {
        message.error(
          `Something went wrong, please check your internet connection`
        );
      }
    } else {
      message.warning(`Please Select a MacAddress to Run a Program`);
    }
  };

  const queryClient = useQueryClient();
  const getDataMutation = useMutation(getProgramsOfLoggedInUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allProgramsOfLoggedInUser");
    },
  });

  const handleAddProgram = async (values) => {
    setConfirmLoading(true);
    let res;
    if (visible.type === "edit") {
      res = await editProgram(values, editProgramId);
    } else {
      res = await addProgram(values);
    }
    if (res.status === 200) {
      message.success(
        `Program ${visible.type === "edit" ? "Updated" : "Added"} Succssfully!`
      );
      getDataMutation.mutate();
    } else {
      message.success("Something went wrong!");
    }
    setConfirmLoading(false);
    setVisible({ visible: false, type: "add" });
  };
  return (
    <>
      <div className='tabled'>
        <Row gutter={[24, 0]}>
          <Col xs='24' xl={24}>
            <Card
              bordered={false}
              className='criclebox tablespace mb-24'
              title={
                <>
                  <h4>Programs Table</h4>
                  <SelectComponent
                    setSelectedMacaddress={setSelectedMacaddress}
                  />
                </>
              }
              extra={
                <>
                  {authState.role !== "admin" &&
                    authState.role !== "superAdmin" && (
                      <Button
                        type='primary'
                        className='tag-primary'
                        onClick={() =>
                          setVisible({ visible: true, type: "add" })
                        }>
                        Add Program
                      </Button>
                    )}
                </>
              }>
              <div className='table-responsive'>
                <Table
                  columns={columns}
                  dataSource={loading || data?.data?.data}
                  pagination={false}
                  className='ant-border-space'
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        title={`${visible.type === "add" ? "Add New" : "Edit"}  Program`}
        destroyOnClose={true}
        visible={visible.visible}
        footer={null}
        onCancel={() => setVisible({ visible: false })}
        confirmLoading={confirmLoading}>
        <Form
          name='control-ref'
          form={form}
          onFinish={handleAddProgram}
          labelCol={{
            span: 8,
          }}>
          <Form.Item
            name='programName'
            label='Program Name'
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='command'
            label='Command'
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' loading={confirmLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Program;
