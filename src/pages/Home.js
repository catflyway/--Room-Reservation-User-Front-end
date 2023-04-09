import React, { useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import listPlugin from "@fullcalendar/list";

import { Row, Col, Modal,Select } from "antd";

function Home() {
    const { Option } = Select;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
    const [values, setValues] = useState({
      title: '',
      start: '',
      end: '',
      color: ''
  })
  const onChangeValues = (e) => {
    console.log(e.target.value)
    setValues({ ...values, [e.target.name]: e.target.value })
}
const handleSelect = (info) => {
  showModal();
  console.log(info)
  setValues({
      ...values,
      start: info.startStr,
      end: info.endStr
  })
}
const showModal = () => {
  setIsModalVisible(true);
};
const handleOk = () => {
  console.log(values)
  setIsModalVisible(false);
};
const handleCancel = () => {
  setValues({ ...values, title: '' })
  setIsModalVisible(false);
};
  return (
    <div className="App">
        <div>
      <Row justify="center">
        <div className="Heard-ManageCa">
        <h2>Dashboard</h2>
        </div>
        <div className="col-1">
        <button className="col-1-1">
          <h4>1</h4>
          จองวันนี้
        </button>
        <button className="col-1-1">
          <h4>1</h4>
          จองเดือนนี้
        </button>

        </div>
      </Row>
      <Row>
        <Col span={24}>
        <div className="searchgraphdate">
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
          <Row justify="center">
            <Col span={16}>
              <div>
                <label>
                  <h2>ตารางการใช้งานห้อง</h2>
                </label>
                <FullCalendar
                  plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                  ]}
                  headerToolbar={{
                    left: "prevYear,nextYear prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                  }}
                />
                <Modal title="รายละเอียดการจอง" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                    </Modal>
              </div>
            </Col>
            <Col span={5} offset={1}>
              <h2>รายละเอียดการจอง</h2>
              <FullCalendar
                plugins={[listPlugin]}
                initialView="listMonth"
                headerToolbar={{
                  left: "",
                  center: "",
                  right: "",
                }}
                height={"80%"}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
    </div>
  );
}

export default Home;
