import React, { useState, useEffect, useContext } from "react";
import { Tabs, Row, Table, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import { UserContext } from "../../user-context";

function History() {
  const user = useContext(UserContext);

  const columnshistoryPending = [
    {
      title: "StartTime",
      render: (text, record, index) => (
        <>{dayjs(record.startTime[0]).format("DD/MM/YYYY")}</>
      ),
      key: "startTime",
    },
    {
      title: "EndTime",
      render: (text, record, index) => (
        <>
          {dayjs(record.endTime[record.endTime.length - 1]).format(
            "DD/MM/YYYY"
          )}
        </>
      ),
      key: "endTime",
    },
    {
      title: "AllDay",
      render: (text, record, index) => (
        <>
          {record.allDay
            ? "Allday"
            : dayjs(record.startTime[0]).format("HH:mm") +
              " - " +
              dayjs(record.endTime[0]).format("HH:mm")}
        </>
      ),
      key: "timereservation",
    },
    {
      title: "Repeat",
      dataIndex: "repeatDate",
      key: "repeatDate",
    },
    {
      title: "Building",
      dataIndex: ["Building", "name"],
      key: "buildingname",
    },
    {
      title: "Room",
      dataIndex: ["Room", "name"],
      key: "roomname",
    },
    {
      title: "Purpose",
      dataIndex: "Purpose",
      key: "Purpose",
    },
    {
      key: "9",
      title: "Status",
      dataIndex: "Status_Approve",
      width: 200,
      render: (value, record) => {
        if (value === "Pending") {
          return <DeleteOutlined style={{ color: "red", marginLeft: 12 }} />;
        } else {
          return value;
        }
      },
      // render: (value, record) => {
      //   return (
      //     <>
      //       <Select
      //         value={value}
      //         onChange={(newValue) => onChangeStatus(record, newValue)}
      //       >
      //         <Select.Option value="Pending">Pending</Select.Option>
      //         <Select.Option value="Cancled">Cancled</Select.Option>
      //       </Select>
      //     </>
      //   );
      // },
    },
  ];
  function onChangeStatus(request, status) {
    let data = {
      Status_Approve: status,
    };
    axios.put("/Requests/" + request._id, data).then((response) => {
      console.log(response.data);
    });
    console.log("Change", request, status);
  }

  const [historyPending, sethistoryPending] = useState([]);
  function gethistoryPending() {
    axios
      .get("requests/searchby", {
        params: { Status_Approve: "Pending", UserID: user._id },
      })
      .then((response) => {
        sethistoryPending(response.data);
      });
  }
  const [historyAppored, sethistoryAppored] = useState([]);
  function gethistoryAppored() {
    axios
      .get("requests/searchby", {
        params: { Status_Approve: "Approved", UserID: user._id },
      })
      .then((response) => {
        sethistoryAppored(response.data);
      });
  }
  const [historyRejectOrCancel, sethistoryRejectOrCancel] = useState([]);
  function gethistoryRejectOrCancel() {
    axios
      .get("requests/searchby", {
        params: { Status_Approve: ["Rejected", "Cancled"], UserID: user._id },
      })
      .then((response) => {
        sethistoryRejectOrCancel(response.data);
      });
  }
  useEffect(() => {
    gethistoryPending();
    gethistoryAppored();
    gethistoryRejectOrCancel();
  }, []);

  const items = [
    {
      key: "Pending",
      label: `กำลังดำเนินการ`,
      children: (
        <Table
          dataSource={historyPending}
          columns={columnshistoryPending}
          pagination={null}
          rowKey="_id"
        />
      ),
    },
    {
      key: "Appored",
      label: `คำขอที่ได้รับการอนุญาต`,
      children: (
        <Table
          dataSource={historyAppored}
          columns={columnshistoryPending}
          pagination={null}
          rowKey="_id"
        />
      ),
    },
    {
      key: "RejectOrCancel",
      label: `คำขอที่ได้รับการปฏิเสธ/ยกเลิก`,
      children: (
        <Table
          dataSource={historyRejectOrCancel}
          columns={columnshistoryPending}
          pagination={null}
          rowKey="_id"
        />
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
          <Tabs style={{ alignItems: "center" }} items={items} size="large" />
        </Row>
      </div>
    </div>
  );
}

export default History;
