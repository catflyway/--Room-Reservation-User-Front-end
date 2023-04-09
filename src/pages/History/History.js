import React, { useState, useEffect } from "react";
import { Tabs, Col, Row, List, Typography, Table, Modal } from "antd";
import { DeleteOutlined} from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";

const onChange = (key) => {
  console.log(key);
};

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

function History() {
  const columnshistoryPending = [
    {
      title: "StartTime",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "EndTime",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "AllDay",
      dataIndex: "timereservation",
      key: "timereservation",
    },
    {
      title: "Repeat",
      dataIndex: "repeatDate",
      key: "repeatDate",
    },
    {
      title: "Building",
      dataIndex: "Building",
      key: "Building",
    },
    {
      title: "Room",
      dataIndex: "Room",
      key: "Room",
    },
    {
      title: "Purpose",
      dataIndex: "Purpose",
      key: "Purpose",
    },
    {
      key: "Actions",
      title: "Actions",
      render: (record) => {
        return (
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
        );
      },
    },
  ];

  const [editingStudent, setEditingStudent] = useState(null);
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this organization record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setEditingStudent((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };

  let toto = localStorage.getItem("userData");
  let userProfle = JSON.parse(toto);

  const [historyPending, sethistoryPending] = useState([]);
  function gethistoryPending() {
    axios
      .get("requests/searchby?Status_Approve=Pending&&UserID=" + userProfle._id)
      .then((response) => {
        console.log(response);
        sethistoryPending(
          response.data.map((item) => {
            let timerev =
              dayjs(item.startTime[0]).format("HH:mm") +
              " - " +
              dayjs(item.endTime[0]).format("HH:mm");
            if (item.allDay == true) {
              timerev = "Allday";
            }
            return {
              ...item,
              startTime: dayjs(item.startTime[0]).format("DD/MM/YYYY"),
              endTime: dayjs(item.endTime[item.endTime.length - 1]).format(
                "DD/MM/YYYY"
              ),
              timereservation: timerev,
            };
          })
        );
      });
  }
  const [historyAppored, sethistoryAppored] = useState([]);
  function gethistoryAppored() {
    axios
      .get("requests/searchby?Status_Approve=Appored&&UserID=" + userProfle._id)
      .then((response) => {
        console.log(response);
        sethistoryAppored(
          response.data.map((item) => {
            let timerev =
              dayjs(item.startTime[0]).format("HH:mm") +
              " - " +
              dayjs(item.endTime[0]).format("HH:mm");
            if (item.allDay == true) {
              timerev = "Allday";
            }
            return {
              ...item,
              startTime: dayjs(item.startTime[0]).format("DD/MM/YYYY"),
              endTime: dayjs(item.endTime[item.endTime.length - 1]).format(
                "DD/MM/YYYY"
              ),
              timereservation: timerev,
            };
          })
        );
      });
  }
  const [historyRejectOrCancel, sethistoryRejectOrCancel] = useState([]);
  function gethistoryRejectOrCancel() {
    axios
      .get("requests/searchby?Status_Approve=Cancled||Status_Approved=Rejected&&UserID=" + userProfle._id)
      .then((response) => {
        console.log(response);
        sethistoryRejectOrCancel(
          response.data.map((item) => {
            let timerev =
              dayjs(item.startTime[0]).format("HH:mm") +
              " - " +
              dayjs(item.endTime[0]).format("HH:mm");
            if (item.allDay == true) {
              timerev = "Allday";
            }
            return {
              ...item,
              startTime: dayjs(item.startTime[0]).format("DD/MM/YYYY"),
              endTime: dayjs(item.endTime[item.endTime.length - 1]).format(
                "DD/MM/YYYY"
              ),
              timereservation: timerev,
            };
          })
        );
      });
  }
  useEffect(() => {
    gethistoryPending();
    gethistoryAppored();
    gethistoryRejectOrCancel();
  }, []);

  const items = [
    {
      key: "1",
      label: `กำลังดำเนินการ`,
      children: (
        <Table
          dataSource={historyPending}
          columns={columnshistoryPending}
          pagination={null}
        />
      ),
    },
    {
      key: "2",
      label: `คำขอที่ได้รับการอนุญาต`,
      children: (
        <Table dataSource={dataSource} columns={columnshistoryPending} pagination={null} />
      ),
    },
    {
      key: "3",
      label: `คำขอที่ได้รับการปฏิเสธ/ยกเลิก`,
      children: (
        <Table dataSource={dataSource} columns={columnshistoryPending} pagination={null} />
      ),
    },
  ];
  return (
    <div className="App-history">
      <div className="User-list">
        <div className="Heard-Manageano">
          <h1>History</h1>
        </div>
        <Row justify="center">
            <Tabs
            style={{alignItems:"center"}}
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
              size="large"
            />
        </Row>
      </div>
    </div>
  );
}

export default History;
