import React, { useState, useEffect, useContext, Fragment } from "react";
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
  Space,
  Input,
  Radio,
  Collapse,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Room() {
  let navigate = useNavigate();
  const { Search } = Input;
  const { Panel } = Collapse;

  const [form] = Form.useForm();
  const [orgList, setOrgList] = useState([]);
  function getOrg() {
    axios.get("/org").then((response) => {
      console.log(response);
      setOrgList(response.data);
    });
  }
  const [buildingList, setBuildingList] = useState([]);
  function getBuildingInOrgID(id) {
    axios.get("/org/building/" + id).then((response) => {
      console.log(response);
      setBuildingList(response.data);
    });
  }
  const [RoomtypeList, setRoomtypeList] = useState([]);
  function getRoomtype(id) {
    axios.get("/org/roomtype/" + id).then((response) => {
      console.log(response);
      setRoomtypeList(response.data);
    });
  }

  const [SearchroomsList, setSearchRoomsList] = useState([]);
  function getSearchRoom(id) {
    axios.get("/rooms/search/" + id).then((response) => {
      console.log(response);
      setSearchRoomsList(response.data);
    });
  }
  const [dataSource, setDataSource] = useState([]);
  function getManageRooms(option) {
    axios.get("/rooms/searchby", { params: option }).then((response) => {
      console.log(response);
      setDataSource(
        response.data.map((item) => {
          return {
            ...item,
            BuildingName: item.Building.name,
            RoomTypeName: item.RoomType.name,
          };
        })
      );
    });
  }

  const onChangeorg = (orgID) => {
    console.log(`selected ${orgID}`);
    if (orgID) {
      getBuildingInOrgID(orgID);
      getRoomtype(orgID);
    }
    form.resetFields(["BuildingID"]);
    form.resetFields(["RoomTypeID"]);
  };
  useEffect(() => {
    getManageRooms();
    getOrg();
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
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = SearchroomsList.filter(
    (o) => !selectedItems.includes(o)
  );
  const onFilterChange = (changedValues, allValues) => {
    if (changedValues.hasOwnProperty("Name")) return;
    if (changedValues.hasOwnProperty("Seat")) return;
    if (changedValues.hasOwnProperty("Size")) return;

    if (changedValues.hasOwnProperty("OrgID")) {
      onChangeorg(changedValues.OrgID);
      allValues.BuildingID = undefined;
      changedValues.BuildingID = undefined;
      allValues.RoomTypeID = undefined;
      changedValues.RoomTypeID = undefined;
    }
    getManageRooms(allValues);
  };
  const onClickSearch = (field) => (value, event) => {
    let formValue = {
      ...form.getFieldsValue(),
      [field]: value,
    };
    onFilterChange({}, formValue);
  };
  let userObjecteOption = [
    {
      value: "พัดลม/แอร์",
      label: "พัดลม/แอร์",
    },
    {
      value: "ปลั๊กไฟ",
      label: "ปลั๊กไฟ",
    },
    {
      value: "เครื่องเสียง/ไมค์",
      label: "เครื่องเสียง/ไมค์",
    },
    {
      value: "คอมพิวเตอร์",
      label: "คอมพิวเตอร์",
    },
    {
      value: "โปรเจคเตอร์",
      label: "โปรเจคเตอร์",
    },
  ];

  return (
    <Fragment>
      <div className="Heard-Manageano">
        <h1>Rooms</h1>
      </div>
      <Row justify="center">
        <Col style={{ maxWidth: "800px" }} span={24}>
          <Form
            form={form}
            onValuesChange={onFilterChange}
            layout="horizontal"
            labelCol={8}
          >
            <Row justify="start" gutter={16}>
              <Col span={8}>
                <Form.Item label="Organization" name="OrgID">
                  <Select
                    style={{ width: "100%" }}
                    allowClear
                    showSearch
                    placeholder="หน่วยงาน"
                    filterOption={(input, option) =>
                      (option?.name ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    fieldNames={{ label: "name", value: "_id" }}
                    options={orgList}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Building" name="BuildingID">
                  <Select
                    style={{ width: "100%" }}
                    allowClear
                    showSearch
                    placeholder="อาคาร/สถานที่"
                    filterOption={(input, option) =>
                      (option?.name ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    fieldNames={{ label: "name", value: "_id" }}
                    options={buildingList}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name="Name">
                  <Search
                    placeholder="Search Room"
                    allowClear
                    // value={selectedItems}
                    // onChange={setSelectedItems}
                    // options={filteredOptions.map((item) => ({
                    //   value: item._id,
                    //   label: [item.Name, item.Seat],
                    // }))}
                    style={{ width: "100%" }}
                    onSearch={onClickSearch("Name")}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Collapse ghost>
              <Panel header="Advance option" key="1">
                <Row justify="start" gutter={16}>
                  <Col span={8}>
                    <Form.Item label="Roomtype" name="RoomTypeID">
                      <Select
                        style={{ width: "100%" }}
                        allowClear
                        showSearch
                        placeholder="ประเภทห้อง"
                        filterOption={(input, option) =>
                          (option?.name ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        fieldNames={{ label: "name", value: "_id" }}
                        options={RoomtypeList}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Object" name="Object">
                      <Select
                        style={{ width: "100%" }}
                        allowClear
                        showSearch
                        mode="multiple"
                        placeholder="อุปกรณ์ภายในห้อง"
                        filterOption={(input, option) =>
                          (option?.value ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={userObjecteOption}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item label="Seat" name="Seat">
                      <Search
                        placeholder="Search Seat"
                        allowClear
                        // value={selectedItems}
                        // onChange={setSelectedItems}
                        // options={filteredOptions.map((item) => ({
                        //   value: item._id,
                        //   label: item.Seat,
                        // }))}
                        style={{ width: "100%" }}
                        onSearch={onClickSearch("Seat")}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item label="Size" name="Size">
                      <Search
                        placeholder="Search Size"
                        allowClear
                        // value={selectedItems}
                        // onChange={setSelectedItems}
                        // options={filteredOptions.map((item) => ({
                        //   value: item._id,
                        //   label: item.Seat,
                        // }))}
                        // style={{
                        //   width: 200,
                        // }}
                        style={{ width: "100%" }}
                        onSearch={onClickSearch("Size")}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Form>
        </Col>
      </Row>

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
            <Card hoverable bodyStyle={{ padding: "0" }}>
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
                  <br />
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
          <br />
          <Row justify="center">
            <Button
              type="primary"
              onClick={() => {
                navigate("/Create", { state: { room: modalData } });
              }}
            >
              สร้างการจอง
            </Button>
          </Row>
        </Modal>
      </div>
    </Fragment>
  );
}

export default Room;
