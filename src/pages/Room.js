import React, { useState,useEffect } from "react";
import { Avatar, Button, List, Modal,Select} from "antd";
import axios from 'axios';

function Room() {
  const { Option } = Select;
  const [dataSource, setDataSource] = useState([]);
function getRoom(){
  axios.get('https://roomreserve1.herokuapp.com/rooms/room',{crossdomain:true})
  .then(response=>{
    console.log(response)
    setDataSource(response.data);
  })
}
useEffect(() => {
  getRoom();
 }, []); 

 
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <div className="User-list">
      <div className="Heard-Manageano">
        <h1>Rooms</h1>
        </div>
        <div className="searchgraph">
        <div className='searches'>
        Organization : {" "}
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value="1">โรงพยาบาลA</Option>
            <Option value="2">โรงเรียนA</Option>
            <Option value="3">โรงเรียนB</Option>
            <Option value="4">ตึกB</Option>
          </Select>
          </div>
          <div className='searches'>
          Building : {" "}
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value="1">โรงพยาบาลA</Option>
            <Option value="2">โรงเรียนA</Option>
            <Option value="3">โรงเรียนB</Option>
            <Option value="4">ตึกB</Option>
          </Select>
          </div>
          <div className='searches'>
          Room : {" "}
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value="1">โรงพยาบาลA</Option>
            <Option value="2">โรงเรียนA</Option>
            <Option value="3">โรงเรียนB</Option>
            <Option value="4">ตึกB</Option>
          </Select>
          </div>
        </div>
        <div className="User-list-heard">
        <List
    dataSource={dataSource}
    renderItem={(item) => (
      <List.Item  >
        <List.Item.Meta 
              avatar={<Avatar shape="square" size={120} src={item.image?.url || 'https://res.cloudinary.com/drundc2zh/image/upload/v1679504757/rooms/ilpqnb4ivbmclg1rqxot.png'} />}
              title={<Button type="primary" onClick={showModal}>{item.Name}</Button>}
              description={<p>Building : {item.Building}<br/>RoomType : {item.RoomType}<br/>Seat : {item.Seat}</p>}
            ></List.Item.Meta>
      </List.Item>
    )}
  />
  <Modal title='รายละเอียดห้อง' open={isModalOpen} footer={null} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
            </Modal>
        </div>
      </div>
    </div>
  );
}

export default Room;
