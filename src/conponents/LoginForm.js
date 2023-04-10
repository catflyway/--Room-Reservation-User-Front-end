import React, { useState } from "react";
import profile from "./image/a.jpg";
import { FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { Button } from "antd";

function LoginForm({ Loginuser, error }) {
  const [detailslogin, setDetailslogin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();

    Loginuser(detailslogin);
  };
  return (
    <div className="main">
      <form>
        <div className="form-inner">
          <h2>User Login</h2>
          {error != "" ? <div className="error">{error}</div> : ""}
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt="profile" className="profile" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <h4>Email</h4>{" "}
            </label>
            <div className="login-icon">
              <FiMail />
            </div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              onChange={(e) =>
                setDetailslogin({ ...detailslogin, email: e.target.value })
              }
              value={detailslogin.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              {" "}
              <h4>Password:</h4>
            </label>
            <div className="login-icon">
              <FiLock />
            </div>
            <input
              type="password"
              placeholder="password"
              name="password"
              id="password"
              onChange={(e) =>
                setDetailslogin({ ...detailslogin, password: e.target.value })
              }
              value={detailslogin.password}
            />
          </div>
          <Button className="button-login" size="large" onClick={submitHandler}>
            Login
          </Button>
          <Button className="button-reg" href="/register" size="large">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
