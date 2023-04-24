<<<<<<< HEAD
import React, { useState,useEffect } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> 6a232c9d29eb652792398fff4226c17fa4613219
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./conponents/Navbar";
import "./App.css";
import axios from "axios";
<<<<<<< HEAD
import { Layout, ConfigProvider ,Spin, message} from "antd";
=======
import { Layout, ConfigProvider, Spin, message } from "antd";
>>>>>>> 6a232c9d29eb652792398fff4226c17fa4613219

import { MenuItems } from "./conponents/MenuItems";

import LoginForm from "./conponents/LoginForm";
import RegisterForm from "./conponents/RegisterForm";

import { UserContext } from "./user-context";
const { Header, Content, Footer } = Layout;


const allowRole = ["User", "Room Contributor"];

function App() {
  const [loadingCount, setLoadingCount] = useState(0);

<<<<<<< HEAD
useEffect(() => {
  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    setLoadingCount((state, props) => (state + 1))
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    setLoadingCount((state, props) => (state - 1))
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    setLoadingCount((state, props) => (state - 1))
    message.error(error)
    return Promise.reject(error);
  });
}, []);

=======
  useEffect(() => {
    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      setLoadingCount((state, props) => (state + 1))
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      setLoadingCount((state, props) => (state - 1))
      return response;
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      setLoadingCount((state, props) => (state - 1))
      message.error(error)
      return Promise.reject(error);
    });
  }, []);
>>>>>>> 6a232c9d29eb652792398fff4226c17fa4613219
  const [userlogin, setUserlogin] = useState(() => {
    let userProfle = localStorage.getItem("userData");
    if (userProfle) {
      let toto = JSON.parse(userProfle);
      if (allowRole.includes(toto.role)) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${toto.token}`;
        return JSON.parse(userProfle);
      }
      localStorage.removeItem("userData");
    }
    return { email: "" };
  });

  const [error, setError] = useState("");

  const Loginuser = (detailslogin) => {
    console.log(detailslogin);
    axios
      .post("/auth/login", detailslogin)

      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Response not 200");
        }

        if (allowRole.includes(response.data.role)) {
          console.log("Logged in");
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          setUserlogin(response.data);

          localStorage.setItem("userData", JSON.stringify(response.data));
        } else {
          console.log(response.data.role);
          setError("ยังไม่มีสิทธิ์ในการใช้งาน");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("Details do not match!");
        setError("Incorrect email or password");
      });
  };
  return (
    <UserContext.Provider value={userlogin}>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: "#3F478D",
              colorPrimaryActive: "#29306e",
              colorPrimaryBorder: "#8e96e0",
              colorPrimaryHover: "#5d65b0",
            },
          },
        }}
      >
<<<<<<< HEAD
      <Spin size="large" tip="Loading..." spinning={loadingCount !== 0}>
        {userlogin.email !== "" ? (
          <BrowserRouter>
            <Layout className="layout">
              <Header>
                <Navbar />
              </Header>
              <Content
                style={{
                  padding: "0 50px",
                }}
              >
                <div
                  className="site-layout-content"
                  style={{ background: "#FFF" }}
=======
        <Spin size="large" tip="Loading..." spinning={loadingCount !== 0}>
          {userlogin.email !== "" ? (
            <BrowserRouter>
              <Layout className="layout">
                <Header>
                  <Navbar />
                </Header>
                <Content
                  style={{
                    padding: "0 50px",
                  }}
>>>>>>> 6a232c9d29eb652792398fff4226c17fa4613219
                >
                  <div
                    className="site-layout-content"
                    style={{ background: "#FFF" }}
                  >
                    <Routes>
                      {MenuItems.map((item, index) => {
                        if (!item.role.includes(userlogin.role)) {
                          return undefined;
                        }
                        return (
                          <Route
                            key={index}
                            path={item.path}
                            element={item.element}
                          />
                        );
                      })}
                      <Route
                        path="*"
                        element={
                          // <Navigate to={UserDefaultPage[userlogin.role]} replace />
                          <Navigate to="/" replace />
                        }
                      />
                      {/* <Route path="/" element={<Home />} />
            <Route path="/Rooms" element={<Room />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/History" element={<History />} />
            <Route path="/Profiles" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} /> */}
                    </Routes>
                  </div>
                </Content>

<<<<<<< HEAD
              <Footer
                style={{
                  textAlign: "center",
                }}
              ></Footer>
            </Layout>
          </BrowserRouter>
        ) : (
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<LoginForm Loginuser={Loginuser} error={error} />}
              />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        )}
=======
                <Footer
                  style={{
                    textAlign: "center",
                  }}
                ></Footer>
              </Layout>
            </BrowserRouter>
          ) : (
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={<LoginForm Loginuser={Loginuser} error={error} />}
                />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          )}
>>>>>>> 6a232c9d29eb652792398fff4226c17fa4613219
        </Spin>
      </ConfigProvider>
    </UserContext.Provider>
  );
}

export default App;
