import React, { useState, useEffect } from "react";
import {
  Modal,
  Input,
  Typography,
  Form,
  Select,
  Checkbox,
  Col,
  Row,
  message,
  Upload,
  Button,
  Space,
} from "antd";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import LoginForm from "./LoginForm";

const { Title } = Typography;
function RegisterForm() {
  const [orgList, setOrgList] = useState([]);
  const [orgLoading, setOrgLoading] = useState(false);
  function getOrg() {
    setOrgLoading(true);
    axios
      .get("/org")
      .then((response) => {
        setOrgLoading(false);
        console.log(response);
        setOrgList(response.data);
      })
      .catch((err) => {
        setOrgLoading(false);
      });
  }
  const [userStatusLoading, setUserStatusLoading] = useState(false);
  const [status, setstatus] = useState([]);
  function getStatus(id) {
    setUserStatusLoading(true);
    axios
      .get("/org/status/" + id)
      .then((response) => {
        setUserStatusLoading(false);
        console.log(response);
        setstatus(response.data);

        //   form.resetFields(["status"])
      })
      .catch((err) => {
        setUserStatusLoading(false);
      });
  }
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const beforeUpload = (file) => {
    const isLt10M = file.size / 1024 / 1024 < 10;

    if (!isLt10M) {
      message.error("Image must smaller than 10MB!");
      return false;
    }

    getBase64(file, (url) => {
      setImageUrl(url);
    });
    return false;
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onAddUser = (e) => {
    form.submit();
  };
  const onCancelAdd = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    form.resetFields();
    setImageUrl(undefined);
    setLoading(false);
    setIsModalOpen(true);
  };

  const onChangeorg = (orgID) => {
    console.log(`selected ${orgID}`);
    getStatus(orgID);
  };

  const onChangestatus = (statusID) => {
    console.log(`selected ${statusID}`);
  };

  useEffect(() => {
    getOrg();
  }, []);

  const [Clickcreate, setClickcreate] = useState(true);
  const Clicknext = (e) => {
    setClickcreate(true);
    console.log("5555");
  };
  const onFormFinish = (formValue) => {
    // formValue = {
    //   ...formValue,
    //   image: formValue.image[0].originFileObj,
    // };
    // axios
    //   .postForm("/auth/register", formValue)
    //   .then((response) => {
    //     console.log("res", response);
    //     setLoading(false);
    //     setIsModalOpen(false);
    //     message.success("สมัครสมาชิกสำเร็จ");
    //     setClickcreate(false);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //     setLoading(false);
    //     message.error("ERROR");
    //   });
    setClickcreate(false);
    console.log(formValue);
  };
  const uploadButton = (
    <div>
      {loading ? <UploadOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      {Clickcreate == true ? (
        <div className="User-list">
          <Row justify="center">
            <Col>
              <Title style={{ color: " #3F478D" }}>RegisterForm</Title>
            </Col>
          </Row>
          <br />

          <Row justify="center">
            <Col span={18} offset={6}>
              <Form
                form={form}
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 12,
                }}
                layout="horizontal"
                onFinish={onFormFinish}
                disabled={loading}
              >
                <Form.Item
                  name="image"
                  rules={[{ required: true }]}
                  label=""
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  wrapperCol={{ span: 16 }}
                >
                  <Upload
                    accept="image/*"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    maxCount={1}
                    className="form-upload-picture"
                  >
                    {imageUrl ? (
                      <div style={{ width: "100%" }}>
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{
                            maxHeight: "150px",
                            marginBottom: "8px",
                          }}
                        />
                      </div>
                    ) : (
                      uploadButton
                    )}
                    {/* <Button icon={<UploadOutlined />}>Click to upload</Button> */}
                  </Upload>
                </Form.Item>

                <Form.Item
                  label="หน่วยงาน"
                  name="org"
                  rules={[{ required: true, whitespace: true }]}
                >
                  <Select
                    showSearch
                    placeholder="หน่วยงาน"
                    optionFilterProp="children"
                    onChange={onChangeorg}
                    filterOption={(input, option) =>
                      (option?.name ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    fieldNames={{ label: "name", value: "_id" }}
                    options={orgList}
                    loading={orgLoading}
                  />
                </Form.Item>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { min: 6, max: 12, required: true, whitespace: true },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                  label="Firstname"
                  name="firstname"
                  rules={[
                    { min: 4, max: 25, required: true, whitespace: true },
                  ]}
                >
                  <Input placeholder="Firstname" />
                </Form.Item>
                <Form.Item
                  label="Lastname"
                  name="lastname"
                  rules={[
                    { min: 6, max: 25, required: true, whitespace: true },
                  ]}
                >
                  <Input placeholder="Lastname" />
                </Form.Item>
                <Form.Item
                  label="E-mail"
                  name="email"
                  validateFirst={true}
                  rules={[
                    {
                      min: 6,
                      max: 25,
                      required: true,
                      type: "email",
                      whitespace: true,
                    },
                    {
                      validator: (_, value) => {
                        console.log(value);
                        return new Promise((resolve) => {
                          setTimeout(() => {
                            console.log(value, "ok");
                            resolve();
                          }, 1000);
                        });
                      },

                      message: "มีคนใช้แล้ว นะจ่ะ",
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="E-mail" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { min: 6, max: 25, required: true, whitespace: true },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                  label="Status"
                  name="status"
                  rules={[{ required: true, whitespace: true }]}
                >
                  <Select
                    showSearch
                    placeholder="Status"
                    optionFilterProp="children"
                    onChange={onChangestatus}
                    filterOption={(input, option) =>
                      (option?.name ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    fieldNames={{ label: "name", value: "_id" }}
                    options={status}
                    loading={userStatusLoading}
                  />
                </Form.Item>

                <Form.Item
                  label="Role"
                  name="role"
                  rules={[{ required: true, whitespace: true }]}
                >
                  <Select placeholder="Select a Role">
                    <Select.Option value="User">User</Select.Option>
                    {/* <Select.Option value="Room Contributor">
                  Room Contributor
                </Select.Option>
                <Select.Option value="Contributor">Contributor</Select.Option>
                <Select.Option value="Administrator">
                  Administrator
                </Select.Option> */}
                  </Select>
                </Form.Item>
                <Row justify="center">
                  <Col span={6}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        สร้างการจอง
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      ) : (
        <LoginForm />
      )}
    </>
  );
}

export default RegisterForm;
