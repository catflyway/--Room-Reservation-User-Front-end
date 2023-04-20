import React, { useState, useEffect } from "react";
import { Tabs, Row, Table, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";

const onChange = (key) => {
  console.log(key);
};

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
      dataIndex: "buildingname",
      key: "buildingname",
    },
    {
      title: "Room",
      dataIndex: "roomname",
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
        return <DeleteOutlined style={{ color: "red", marginLeft: 12 }} />;
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

  let toto = localStorage.getItem("userData");
  let userProfle = JSON.parse(toto);

  const [historyPending, sethistoryPending] = useState([]);
  function gethistoryPending() {
    axios
      .get("requests/searchby?Status_Approve=Pending&UserID=" + userProfle._id)
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
              buildingname: item.Building.name,
              roomname: item.Room.name,
            };
          })
        );
      });
  }
  const [historyAppored, sethistoryAppored] = useState([]);
  function gethistoryAppored() {
    axios
      .get("requests/searchby?Status_Approve=Approved&UserID=" + userProfle._id)
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
              buildingname: item.Building.name,
              roomname: item.Room.name,
            };
          })
        );
      });
  }
  const [historyRejectOrCancel, sethistoryRejectOrCancel] = useState([]);
  function gethistoryRejectOrCancel() {
    axios
      .get(
        "requests/searchby?Status_Approve=Cancled&Status_Approve=Cancled&UserID=" +
          userProfle._id
      )
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
              buildingname: item.Building.name,
              roomname: item.Room.name,
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
        <Table
          dataSource={historyAppored}
          columns={columnshistoryPending}
          pagination={null}
        />
      ),
    },
    {
      key: "3",
      label: `คำขอที่ได้รับการปฏิเสธ/ยกเลิก`,
      children: (
        <Table
          dataSource={historyRejectOrCancel}
          columns={columnshistoryPending}
          pagination={null}
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
          <Tabs
            style={{ alignItems: "center" }}
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
