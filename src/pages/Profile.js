import React, { useState, useEffect,useContext } from "react";
import { Form, Input, Select, Button, Row, Col, Image } from "antd";
import axios from "axios";
import { UserContext } from "../user-context";

function Profile() {
  const userData = useContext(UserContext);
  const OnButtonClick = (e) => {
    console.log("Button clicked");
  };
  const [editingProfile, setEditingProfile] = useState(null);
  const [dataSource, setDataSource] = useState({});
  function getManageReq() {
    axios.get("/users/userprofile").then((response) => {
      console.log(response);
      setDataSource(response.data);
    });
  }
    const [statuslist, setstatuslist] = useState([]);
  function getStatus() {
    console.log(userData)
    axios
      .get("/org/status/" + userData.org.id, { crossdomain: true })
      .then((response) => {
        console.log(response);
        setstatuslist(response.data);
      });
  }
  const [orgList, setOrgList] = useState([]);
  function getOrg() {
    axios.get("/org").then((response) => {
      console.log(response);
      setOrgList(response.data);
    });
  }
  useEffect(() => {
    getManageReq();
    getStatus()
    getOrg()
  }, []);
  const Logout = () => {
    localStorage.removeItem("userData");
    document.location.reload(true);
  };

  return (
    <div className="Profile">
      <div className="User-list">
        <div className="Profilehead">
          <h1>Profile</h1>
        </div>
        <Row justify="center">
          <Col span={12}>
            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              layout="horizontal"
            >
              <div className="imgprofile">
                <Image
                  className="imgprofilebor"
                  preview={false}
                  width={150}
                  height={150}
                  src={dataSource.image?.url}
                />
              </div>
              <Form.Item label="Username">
                <Input
                  placeholder="Username"
                  value={dataSource?.username}
                  onChange={(e) => {
                    setEditingProfile((pre) => {
                      return { ...pre, username: e.target.value };
                    });
                  }}
                />
              </Form.Item>
              <Form.Item label="Name">
                <Input placeholder="Name" value={userData?.firstname} />
              </Form.Item>
              <Form.Item label="Lastname">
                <Input placeholder="Name" value={userData?.lastname} />
              </Form.Item>
              <Form.Item label="E-mail">
                <Input placeholder="Name" value={userData?.email} />
              </Form.Item>
              <Form.Item label="Password">
                <Input.Password
                  placeholder="Password"
                  value={userData?.password}
                />
              </Form.Item>
              <Form.Item label="Status" value={userData?.status}>
              <Select
                showSearch
                placeholder="Status"
                optionFilterProp="children"
                value={userData?.status?.name}
                filterOption={(input, option) =>
                  (option?.name ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                fieldNames={{ label: "name", value: "_id" }}
                options={statuslist}
              />
            </Form.Item>
            <Form.Item
                    label="หน่วยงาน"
                    value={userData?.org}
                  >
                    <Select
                      showSearch
                      placeholder="หน่วยงาน"
                      optionFilterProp="children"
                      // onChange={onChangeorg}
                      filterOption={(input, option) =>
                        (option?.name ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      fieldNames={{ label: "name", value: "_id" }}
                      options={orgList}
                      value={userData?.org?.name}
                    />
                  </Form.Item>
            </Form>
          </Col>
        </Row>

        <Row justify="center">
          <Col>
            <Button
              className="button-logout"
              type="primary"
              ghost
              onClick={OnButtonClick}
            >
              Reset
            </Button>
            <Button
              className="button-logout"
              type="primary"
              onClick={OnButtonClick}
            >
              Save
            </Button>
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <Button
              className="button-user-mana3"
              type="danger"
              onClick={Logout}
            >
              Logout
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Profile;
