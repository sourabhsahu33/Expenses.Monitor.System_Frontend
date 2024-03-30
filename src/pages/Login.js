import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import serverURI from "../config/serverConfig";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post( `${serverURI}/users/login`, values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
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
      <div className="register">
<h1 style={{ fontFamily: 'Lumanosimo' }}>Expenses Monitor System!</h1>
      <div className="register-page ">
        {loading && <Spinner />}
        <img src="https://i.ibb.co/vhCZRyP/Cloud-System-1.png" alt=" "></img>
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Login Form</h1>

          <Form.Item label="Email" name="email" required>
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" required>
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/register">Not a user ? Click Here to register</Link>
            <button className="btn btn-primary">Login</button>
          </div>
        </Form>
      </div>
      </div>
  );
};

export default Login;