import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import serverURI from "../config/serverConfig";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post(`${serverURI}/users/register`, values);
      message.success("Registeration Successfull");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");  
    }
  }, [navigate]);
  return (
    <div className="page">
      <div className="register-page ">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Register Form</h1>
          <Form.Item label="Name" name="name" required >
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" required>
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" required>
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/login">Already Register ? Click Here to login</Link>
            <button className="btn btn-primary">Resgiter</button>
          </div>
        </Form>
      </div>
      </div>
  );
};

export default Register;