import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Card,
  Modal,
  Table,
  Popconfirm,
} from "antd";
import {
  updateSensorName,
  getSensorNames,
  removeSensorName,
} from "../Axios/apiFunctions";
import { useMutation, useQueryClient, useQuery } from "react-query";

const Data = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [sensors, setSensors] = useState(false);

  const { loading, data } = useQuery("getSensorNames", getSensorNames);

  useEffect(() => {
    if (!loading && data?.data.length > 0) {
      setSensors(data?.data[0]?.sensors);
    }
  }, [loading, data?.data]);

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

  const handleRemoveSensorName = async (sensorName) => {
    const res = await removeSensorName({ sensorName });
    if (res.status === 200) {
      sensorNamesMutation.mutate();
      message.success("Senor Deleted!");
    } else {
      message.error(
        "Something went wrong, please check your internet connection!"
      );
    }
  };
  const columns = [
    {
      title: "Sensors",
      key: "sensors",
      width: "90%",
      render: (data) => data,
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
            onConfirm={() => handleRemoveSensorName(data)}>
            <Button type='danger' className='tag-primary'>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        title='Sensor Names'
        headStyle={{ fontWeight: "bold" }}
        extra={
          <>
            {
              <Button
                type='primary'
                className='tag-primary'
                onClick={() => setVisible(true)}>
                Add New Sensors
              </Button>
            }
          </>
        }
        style={{ width: "100%" }}>
        <div className='table-responsive'>
          <Table
            columns={columns}
            dataSource={!loading && sensors}
            pagination={false}
            className='ant-border-space'
          />
        </div>
      </Card>

      <Modal
        title='Update Sensors Name'
        destroyOnClose={true}
        // open={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        confirmLoading={confirmLoading}>
        <Form
          name='control-ref'
          onFinish={handleChangeSenorNames}
          labelCol={{
            span: 0,
          }}
          initialValues={{
            sensor1: sensors?.sensor1,
            sensor2: sensors?.sensor2,
            sensor3: sensors?.sensor3,
            sensor4: sensors?.sensor4,
            sensor5: sensors?.sensor5,
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
          <Form.Item name='sensor4' label='Sensor 4 Name'>
            <Input />
          </Form.Item>
          <Form.Item name='sensor5' label='Sensor 5 Name'>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              loading={confirmLoading}
              style={{ alignSelf: "right" }}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title='Add New Sensor'
        destroyOnClose={true}
        open={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        confirmLoading={confirmLoading}>
        <Form
          name='control-ref'
          onFinish={handleChangeSenorNames}
          labelCol={{
            span: 0,
          }}>
          <Form.Item name='sensor' label='Sensor Name'>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              loading={confirmLoading}
              style={{ alignSelf: "right" }}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Data;
