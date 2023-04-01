import React, { useState} from 'react';
import  {Tabs,Col,Row,List,Typography}  from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const data = [
  'จอง1',
  'จอง2',
  'จอง3',
  'จอง4',
  'จอง5',
];
const onChange = (key) => {
  console.log(key);
};


function History() {
  const items = [
    {
      key: '1',
      label: `กำลังดำเนินการ`,
      children: <List
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item >
          <Typography.Text mark>[จอง]</Typography.Text> {item}
        </List.Item>
      )}
    />,
    },
    {
      key: '2',
      label: `เสร็จสิ้น`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: '3',
      label: `ประวัติการจอง`,
      children: `Content of Tab Pane 3`,
    },
  ];
 
  return (
    <div className="App-history">
        <h1>History</h1>
        <Row>
      <Col span={12} offset={6}>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} size='large' />
        </Col>
        </Row>
      
    </div>
  );
}

export default History;
