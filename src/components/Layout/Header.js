import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              <p
                className="pre"
                style={{
                  color: "white",
                  fontSize: "27px",
                  fontWeight: "bold",
                  fontFamily: "cursive",
                  marginLeft: "50px",
                }}
              >
                <img
                  src="https://i.ibb.co/RTWHN98/unnamed.png"
                  alt="Expense Monitor System"
                  style={{
                    verticalAlign: "middle",
                    marginRight: "10px",
                    width: "50px",
                    height: "50px",
                  }}
                />
                Expenses Monitor System
              </p>
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {" "}
                <span className="nav-link">
                <UserOutlined style={{ marginRight: 5 }} />
                  {loginUser && loginUser.name}
                </span>{" "}
              </li>
              <li className="nav-item">
                <button className="btn btn-primary" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
