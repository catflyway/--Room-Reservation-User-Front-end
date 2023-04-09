import React, { useState, useEffect, useContext } from "react";
import {
  Avatar,
  Button,
  List,
  Modal,
  Select,
  Form,
  Image,
  Row,
  Col,
  Descriptions,
  Card,
} from "antd";
import axios from "axios";
import { UserContext } from "../user-context";

function Room() {
  const user = useContext(UserContext);
  const { Option } = Select;
  const [dataSource, setDataSource] = useState([]);
  function getRoom() {
    axios
      .get("https://roomreserve1.herokuapp.com/rooms/room", {
        crossdomain: true,
      })
      .then((response) => {
        console.log(response);
        setDataSource(response.data);
      });
  }
  useEffect(() => {
    getRoom();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const showModal = (item) => {
    setModalData(item);
    setIsModalOpen(true);
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
          <div className="searches">
            Organization :{" "}
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
          <div className="searches">
            Building :{" "}
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
          <div className="searches">
            Room :{" "}
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
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={120}
                      src={
                        item.image?.url ||
                        "https://res.cloudinary.com/drundc2zh/image/upload/v1679504757/rooms/ilpqnb4ivbmclg1rqxot.png"
                      }
                    />
                  }
                  title={
                    <Button type="primary" onClick={() => showModal(item)}>
                      {item.Name}
                    </Button>
                  }
                  description={
                    <p>
                      Building : {item.Building.name}
                      <br />
                      RoomType : {item.RoomType.name}
                      <br />
                      Seat : {item.Seat}
                    </p>
                  }
                ></List.Item.Meta>
              </List.Item>
            )}
          />
          <Modal
            title={<>รายละเอียดห้อง {modalData?.Name}</>}
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
          >
            <Row justify="center">
              <Card
                hoverable
                bodyStyle={{padding: "0"}}
              >
                <Image
                  className="imgprofilebor"
                  preview={false}
                  width={200}
                  height={200}
                  src={modalData?.image?.url}
                />
              </Card>
            </Row>

            <br />

            <Descriptions bordered column={1} size={"middle"}>
              <Descriptions.Item label="Room">
                {modalData?.Name}
              </Descriptions.Item>

              <Descriptions.Item label="Roomtype">
                {modalData?.RoomType?.name}
              </Descriptions.Item>

              <Descriptions.Item label="Building">
                {modalData?.Building?.name}
              </Descriptions.Item>

              <Descriptions.Item label="Organization">
                {modalData?.Org?.name}
              </Descriptions.Item>

              <Descriptions.Item label="จำนวนที่นั่งในห้อง">
                {modalData?.Seat}
              </Descriptions.Item>

              <Descriptions.Item label="ขนาดห้อง">
                {modalData?.Size}
              </Descriptions.Item>

              <Descriptions.Item label="อุปกรณ์ภายในห้อง">
                {modalData?.Object.map((value, i) => (
                  <React.Fragment key={i}>
                    {value}
                    <br/>
                  </React.Fragment>
                ))}
              </Descriptions.Item>

              <Descriptions.Item label="รายละเอียดเพิ่มเติม">
                {modalData?.Detail}
              </Descriptions.Item>

              <Descriptions.Item label="ผู้ดูแล">
                {modalData?.Contributor?.name}
              </Descriptions.Item>
            </Descriptions>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Room;
