import React, { useState} from 'react';
import {
  Form,
  Input,
  Switch,
  DatePicker,Col,Row, Button,TimePicker,Radio,Space,Checkbox
} from 'antd';
import dayjs from "dayjs";



function Create() {
  const { RangePicker } = DatePicker;
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const onChangeswitch = (checked) => {
    console.log(`switch to ${checked}`);
  };
  const disabledStartDate = (current) => {
    return current && current < dayjs().endOf("day");
  };
  const disabledStopDate = (current) => {
    return current && current < startDate;
  };
  const [startDate, setStartDate] = useState();
  const [checkedcheckbox, setCheckedcheckbox] = useState(true);
  const onChangebox = (e) => {
    console.log(`checked = ${e.target.checked}`);
    setCheckedcheckbox(e.target.checked);
  };
  const [data, setData] = useState({
    Room: "",
    Building: "",
    UserID:"",
    Date_Reserve:"",
    Purpose:"",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };
  
  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };
  const onOk = (value) => {
    console.log('onOk: ', value);
  };
  const onChangestart = (datestart, datestartString) => {
    console.log(datestart, datestartString);
  };
  const onChangeend = (dateend, dateendString) => {
    console.log(dateend, dateendString);
  };
  const [placement, SetPlacement] = useState('norepeat');
  const placementChange = (e) => {
    SetPlacement(e.target.value);
  };
   
  return (
    <div className="App">
    <div className="User-list">
        <h1>Create</h1>
        <Row>
      <Col span={12} offset={6}>
        <Form
      
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="อาคาร/สถานที่">
        <Input placeholder='อาคาร/สถานที่'/>
        </Form.Item>
        <Form.Item label="ห้อง">
        <Input placeholder='ห้อง'/>
        </Form.Item>
        <Form.Item label="เวลาการจอง">
        Allday &nbsp;
        <Switch defaultChecked onChange={onChangeswitch} /> &nbsp;
        <RangePicker
      showTime={{
        format: 'HH:mm',
      }}
      format="HH:mm"
      onChange={onChange}
      onOk={onOk}
    />
        </Form.Item>
        <Form.Item label="เวลาการจอง">
        <Space direction="vertical">
          <Checkbox checked={checkedcheckbox} onChange={onChangebox}>
            Allday
          </Checkbox>
          {!checkedcheckbox ? <TimePicker.RangePicker format="HH:mm" /> : ""}
        </Space>
      </Form.Item>
      <Form.Item label="วันจอง">
        <Space direction="vertical">
          <DatePicker
            placeholder="เริ่มจอง"
            onChange={onChangestart}
            value={startDate}
            disabledDate={disabledStartDate}
          />
          <Radio.Group value={placement} onChange={placementChange}>
            <Radio.Button value="norepeat">Does not repeat </Radio.Button>
            <Radio.Button value="days">everyday</Radio.Button>
            <Radio.Button value="weeks">everyweek</Radio.Button>
          </Radio.Group>
          {placement == "days" ? (
            <DatePicker
              onChange={onChangeend}
              placeholder="วันสิ้นการจอง"
              disabledDate={disabledStopDate}
            />
          ) : placement == "weeks" ? (
            <>
              {/* <Segmented
                size="large"
                options={datOfWeekString}
                value={startDateDay}
                onChange={setStartDateDay}
              /> */}
              <DatePicker
                onChange={onChangeend}
                placeholder="วันสิ้นสุดสัปดาห์"
                disabledDate={disabledStopDate}
              />
            </>
          ) : (
            ""
          )}
        </Space>
      </Form.Item>
        <Form.Item label="ผู้ขอจอง">
        <Input placeholder='ผู้ขอจอง'/>
        </Form.Item>
        
        <Form.Item label="วัตถุประสงค์">
        <Input placeholder='วัตถุประสงค์'/>
        </Form.Item>
      </Form>
      </Col>
    </Row>
    <Row>
    <Col span={11}></Col>
      <Col span={2} ><Button type='primary'>สร้างการจอง</Button></Col>
      <Col span={11}></Col>
      
    </Row>
      </div>
    </div>
  );
}

export default Create;
