import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, message, Table, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
import serverURI from "../config/serverConfig";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selecteDate, setSelecteData] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  // Table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span> {moment(text).format("YYYY-MM-DD")} </span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  // Delete Handler
  const handleDelete = async (record) => {
    try {
      await axios.post(`${serverURI}/transection/delete-transection`, {
        transectionId: record._id,
      });
      const result = allTransection.filter(
        (transaction) => (transaction.id = record._id)
      );
      setAllTransection(result);
      setLoading(false);
      message.success("Transection Delete");
    } catch (error) {
      console.log(error);
      message.error("unable to delete");
    }
  };

  // form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);

      if (editable) {
        await axios.post(`${serverURI}/transection/edit-transection`, {
          payload: {
            ...values,
            userid: user._id,
          },
          transectionId: editable._id,
        });
        setLoading(false);
        message.success("Transection updated Sucessfully");
      } else {
        await axios.post(`${serverURI}/transection/add-transection`, {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success("Transection Added Sucessfully");
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Faild to add transection");
    }
  };

  // get all transection
  const getAllTransection = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post(`${serverURI}/transection/get-transection`, {
        userid: user._id,
        frequency,
        selecteDate,
        type,
      });
      setLoading(false);
      setAllTransection(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      message.error("Fetch Issues with Transection");
    }
  };
  // useEffect Hook
  useEffect(() => {
    getAllTransection();
  }, [frequency, selecteDate, type, showModal]);

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6 className="heading"> Select Frequency </h6>
          <Select
            className="sel"
            value={frequency}
            onChange={(values) => setFrequency(values)}
          >
            <Select.Option value="7"> Last 1 Week</Select.Option>
            <Select.Option value="30"> Last 1 Month</Select.Option>
            <Select.Option value="365"> Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selecteDate}
              onChange={(values) => setSelecteData(values)}
            />
          )}
        </div>

        <div>
          <h6 className="heading"> Select Type </h6>
          <Select
            className="sel"
            value={type}
            onChange={(values) => setType(values)}
          >
            <Select.Option value="all"> # All.......</Select.Option>
            <Select.Option value="income"> INCOME </Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selecteDate}
              onChange={(values) => setSelecteData(values)}
            />
          )}
        </div>
        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>
        <div>
          <button className="bt" onClick={() => setShowModal(true)}>
            {" "}
            Add New{" "}
          </button>
        </div>
      </div>

      <div className="content">
        {viewData === "table" ? (
          <Table className="ct" columns={columns} dataSource={allTransection} />
        ) : (
          <Analytics allTransection={allTransection} />
        )}
      </div>

      <Modal
        title={editable ? "Edit Transection" : "Add Trasection"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Enter Amount" name="amount">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="income"> Income </Select.Option>
              <Select.Option value="expense"> Expences</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary"> Salary </Select.Option>
              <Select.Option value="tip"> Tip</Select.Option>
              <Select.Option value="project"> Porject </Select.Option>
              <Select.Option value="food"> Food </Select.Option>
              <Select.Option value="movie"> Movie </Select.Option>
              <Select.Option value="bills"> Bills </Select.Option>
              <Select.Option value="medical"> Medical </Select.Option>
              <Select.Option value="fee"> Due-fee</Select.Option>
              <Select.Option value="tax"> Tax</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Refrence" name="refrence">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex">
            <button className="btn btn-primary" type="submit">
              {" "}
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
