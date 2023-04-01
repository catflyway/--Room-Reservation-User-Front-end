import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col } from "antd";

function Profile() {
  const OnButtonClick = (e) => {
    console.log("Button clicked");
  };

  const [user, setUser] = useState({});
  const Logout = () => {
    localStorage.removeItem("userData");
    document.location.reload(true);
  };


  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <div className="Profile">
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
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
          >
            <Form.Item label="Username">
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item label="Name">
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item label="Lastname">
              <Input placeholder="Lastname" />
            </Form.Item>
            <Form.Item label="E-mail">
              <Input placeholder="E-mail" />
            </Form.Item>
            <Form.Item label="Password">
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item label="Status">
              <Select placeholder="Select a Status">
                <Select.Option value="student">Student</Select.Option>
                <Select.Option value="teacher">Teacher</Select.Option>
                <Select.Option value="athlete">Athlete</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      
      <Row justify="center">
        <Col>
          <Button className='button-logout' type="primary" ghost onClick={OnButtonClick}>
            Reset
          </Button>
          <Button className='button-logout'  type="primary" onClick={OnButtonClick}>
            Save
          </Button>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Button className="button-user-mana3" type="danger" onClick={Logout}>
            Logout
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
