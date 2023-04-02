import React, { useState ,useEffect} from "react";
import { Form, Input, Select, Button, Row, Col ,Image} from "antd";
import axios from "axios";

function Profile() {
  const OnButtonClick = (e) => {
    console.log("Button clicked");
  };
  const [editingProfile, setEditingProfile] = useState(null);
  const [dataSource, setDataSource] = useState({});
  function getManageReq(){
    axios.get('/users/userprofile')
    .then(response=>{
      console.log(response)
      setDataSource(response.data);
    })
  }
  useEffect(() => {
    getManageReq();
   }, []); 
  const [user, setUser] = useState({});
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
             <Image className="imgprofilebor"
            preview={false} 
            width={150}
  height={150}
 src={dataSource.image?.url}/></div>
            <Form.Item label="Username">
            <Input placeholder="Username"  value={dataSource?.username}
              onChange={(e) => {
                setEditingProfile((pre) => {
                  return { ...pre, username: e.target.value };
                });
              }} />
            </Form.Item>
            <Form.Item label="Name">
            <Input placeholder="Name" value={dataSource?.firstname} />
            </Form.Item>
            <Form.Item label="Lastname">
            <Input placeholder="Name" value={dataSource?.lastname} />
            </Form.Item>
            <Form.Item label="E-mail">
            <Input placeholder="Name" value={dataSource?.email} />
            </Form.Item>
            <Form.Item label="Password">
            <Input.Password placeholder="Password"  value={dataSource?.password} />
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
    </div>
  );
}

export default Profile;
