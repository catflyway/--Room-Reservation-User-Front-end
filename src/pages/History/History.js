import React, { useState,useEffect} from 'react';
import  {Tabs,Col,Row,List,Typography,Table,Modal}  from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined,DeleteOutlined,EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from "dayjs";

const onChange = (key) => {
  console.log(key);
};


const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];


function History() {
  const columnshistoryPending = [
    {
      title: 'StartTime',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'EndTime',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'AllDay',
      dataIndex: 'timereservation',
      key: 'timereservation',
    },
    {
      title: 'Repeat',
      dataIndex: 'repeatDate',
      key: 'repeatDate',
    },
    {
      title: 'Building',
      dataIndex: 'Building',
      key: 'Building',
    },
    {
      title: 'Room',
      dataIndex: 'Room',
      key: 'Room',
    },
    {
      key: "Actions",
      title: "Actions",
      render: (record) => {
        return (
          <>
              <EditOutlined
                onClick={() => {
                  onEditStudent(record);
                }}
                style={{ color: "blue", marginLeft: 12 }}
              />
              <DeleteOutlined
                onClick={() => {
                  onDeleteStudent(record);
                }}
                style={{ color: "red", marginLeft: 12 }}
              />
          </>
        );
      },
    },
   
  ];
  const [isEditing, setIsEditing] = useState(false);
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
const onEditStudent = (record) => {
  setIsEditing(true);
  setEditingStudent({ ...record });
};
const [data, setData] = useState({
  UserID: "",
});
    const [UsershistoryPending, setUserhistoryPending] = useState(() => {
      let toto = localStorage.getItem("userData");
      let userProfle = JSON.parse(toto);
      setData({ ...data, UserID: userProfle._id });
  });
  const [historyPending, sethistoryPending] = useState([]);
  function gethistoryPending(id) {
    axios.get("requests/searchby?Status_Approve=Pending&UserID=" + id).then((response) => {
      console.log(response);
      sethistoryPending(response.data.map((item) => {
        let timerev =
          dayjs(item.startTime[0]).format("HH:mm") +
          " - " +
          dayjs(item.endTime[0]).format("HH:mm");
        if (item.allDay == true) {
          timerev = "Allday";
        }
        return {
          ...item,
          startTime: dayjs(item.startTime[0]).format('DD/MM/YYYY'),
          endTime: dayjs(item.endTime[item.endTime.length - 1]).format('DD/MM/YYYY'),
          timereservation: timerev,
        };
      }));
    });
  }
  useEffect(() => {
    gethistoryPending(data);
  }, []);

  const items = [
    {
      key: '1',
      label: `กำลังดำเนินการ`,
      children:<Table dataSource={historyPending} columns={columnshistoryPending} pagination={null} />,
    //   children: <List
    //   bordered
    //   dataSource={data}
    //   renderItem={(item) => (
    //     <List.Item >
    //       <Typography.Text mark>[จอง]</Typography.Text> {item}
    //     </List.Item>
    //   )}
    // />,
    },
    {
      key: '2',
      label: `เสร็จสิ้น`,
      children: <Table dataSource={dataSource} columns={columns} pagination={null} />,
    },
    {
      key: '3',
      label: `ประวัติการจอง`,
      children: <Table dataSource={dataSource} columns={columns} pagination={null} />,
    },
  ];
  const [requserList, setrequserList] = useState([]);
  function getReq(id) {
    axios.get("requests/searchby?UserID="+id).then((response) => {
      console.log(response);
      setrequserList(response.data);
    });
  }
  const [orgList, setOrgList] = useState([]);
  function getOrg() {
    axios.get("/org").then((response) => {
      console.log(response);
      setOrgList(response.data);
    });
  }
  return (
    <div className="App-history">
     <div className="User-list">
    <div className="Heard-Manageano">
        <h1>History</h1>
        </div>
        <Row>
      <Col span={12} offset={6}>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} size='large' />
        </Col>
        </Row>
      
    </div>
    </div>
  );
}

export default History;
