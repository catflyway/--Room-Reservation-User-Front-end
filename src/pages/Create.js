import React, { useState, useEffect, Fragment, useContext } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Col,
  Row,
  Button,
  TimePicker,
  Radio,
  Checkbox,
  Segmented,
  Result,
  Typography,
} from "antd";
import dayjs from "dayjs";
import axios from "axios";
import { SmileOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { UserContext } from "../user-context";

const { Title } = Typography;
const { RangePicker } = DatePicker;

function Create() {
  const user = useContext(UserContext);
  const [form] = Form.useForm();
  const location = useLocation();

  const [orgList, setOrgList] = useState([]);
  function getOrg() {
    axios.get("/org").then((response) => {
      setOrgList(response.data);
    });
  }

  const [buildingList, setBuildingList] = useState([]);
  function getBuildingInOrgID(id) {
    axios.get("/org/building/" + id).then((response) => {
      setBuildingList(response.data);
    });
  }

  const [roomsList, setRoomsList] = useState([]);
  function getRoomsInBuildingID(id) {
    axios.get("/rooms/buildingroom/" + id).then((response) => {
      setRoomsList(response.data);
    });
  }

  const onChangeorg = (orgID) => {
    getBuildingInOrgID(orgID);
  };
  const onChangebuild = (buildingID) => {
    getRoomsInBuildingID(buildingID);
  };

  const [dateRangeDisable, setDateRangeDisable] = useState([false, true]);

  const dateRange = Form.useWatch("dateRange", form);
  const repeatDate = Form.useWatch("repeatDate", form);
  React.useEffect(() => {
    if (!dateRange) return;
    if (repeatDate === "norepeat") {
      setDateRangeDisable([false, true]);
      form.setFieldValue("dateRange", [dateRange[0], null]);
    } else {
      setDateRangeDisable([false, false]);
      if (!dateRange[1]) {
        form.setFieldValue("dateRange", [
          dateRange[0],
          dateRange[0].add(1, "month"),
        ]);
      }
    }
  }, [repeatDate]);

  const [isCreated, setIsCreated] = useState(false);
  const handleSubmit = (value) => {
    let timeRange = [0, 24 * 60];

    if (!value.allDay) {
      let startDiff = value.timeRange[0]?.diff(
        value.timeRange[0].clone().startOf("day"),
        "minute"
      );
      let stopDiff = value.timeRange[1]?.diff(
        value.timeRange[1].clone().startOf("day"),
        "minute"
      );
      timeRange = [startDiff, stopDiff];
    }

    const startDate = value.dateRange[0];
    const endDate = value.dateRange[1];

    let getTimeRange = (day) => {
      let start = [
        day.clone().add(timeRange[0], "minute").format("YYYY-MM-DDTHH:mm:ssZ"),
      ];
      let end = [
        day.clone().add(timeRange[1], "minute").format("YYYY-MM-DDTHH:mm:ssZ"),
      ];
      return [start, end];
    };

    let getTimeRangeInterval = (interval) => {
      let startTime = [];
      let endTime = [];
      let iDate = startDate.clone();
      while (iDate < endDate) {
        let range = getTimeRange(iDate);
        startTime.push(range[0]);
        endTime.push(range[1]);
        iDate = iDate.add(interval, "day");
      }

      return [startTime, endTime];
    };

    let startTime = [];
    let endTime = [];

    if (startDate && value.repeatDate === "norepeat") {
      let range = getTimeRange(startDate);
      startTime = [range[0]];
      endTime = [range[1]];
    } else if (startDate && endDate && value.repeatDate === "days") {
      [startTime, endTime] = getTimeRangeInterval(1);
    } else if (startDate && endDate && value.repeatDate === "weeks") {
      [startTime, endTime] = getTimeRangeInterval(7);
    }

    value = {
      ...value,
      startTime,
      endTime,
      dateRange: undefined,
      timeRange: undefined,
      OrgID: undefined,
      UserID: user._id,
    };

    axios.post("/Requests", value).then((response) => {
      setIsCreated(true);
      form.resetFields();
    });
  };
  const Clicknext = (e) => {
    setIsCreated(false);
  };

  const datOfWeekString = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  useEffect(() => {
    getOrg();
  }, []);

  useEffect(() => {
    if (!location.state) return;
    const room = location.state.room;

    form.resetFields();
    onChangeorg(room.Org.id);
    onChangebuild(room.Building.id);
  }, [location.state]);

  return (
    <Fragment>
      <Row align={"center"}>
        <Title>Create</Title>
      </Row>
      {!isCreated ? (
        <Row align={"center"}>
          <Col style={{ maxWidth: "500px" }} span={24}>
            <Form
              form={form}
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 18,
              }}
              layout="horizontal"
              onFinish={handleSubmit}
            >
              <Form.Item
                label="หน่วยงาน"
                name="OrgID"
                rules={[
                  {
                    required: true,
                    message: "Please input your Organization!",
                  },
                ]}
                initialValue={location.state?.room?.Org.id}
              >
                <Select
                  showSearch
                  placeholder="หน่วยงาน"
                  optionFilterProp="children"
                  onChange={onChangeorg}
                  filterOption={(input, option) =>
                    (option?.name ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  fieldNames={{ label: "name", value: "_id" }}
                  options={orgList}
                />
              </Form.Item>
              <Form.Item
                label="อาคาร/สถานที่"
                name="Building"
                rules={[
                  {
                    required: true,
                    message: "Please input your Building!",
                  },
                ]}
                initialValue={location.state?.room?.Building.id}
              >
                <Select
                  showSearch
                  placeholder="อาคาร/สถานที่"
                  optionFilterProp="children"
                  onChange={onChangebuild}
                  filterOption={(input, option) =>
                    (option?.name ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  fieldNames={{ label: "name", value: "_id" }}
                  options={buildingList}
                />
              </Form.Item>
              <Form.Item
                label="ห้อง"
                name="Room"
                rules={[
                  {
                    required: true,
                    message: "Please input your Room!",
                  },
                ]}
                initialValue={location.state?.room?._id}
              >
                <Select
                  showSearch
                  placeholder="ห้อง"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.Name ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  fieldNames={{ label: "Name", value: "_id" }}
                  options={roomsList}
                />
              </Form.Item>
              <Form.Item
                label="วันจอง"
                name="dateRange"
                initialValue={[dayjs(), null]}
                rules={[
                  {
                    required: true,
                    message: "Please input your StartDate!",
                  },
                ]}
              >
                <RangePicker
                  allowClear={false}
                  placeholder={[
                    "เริ่ม",
                    dateRangeDisable[1]
                      ? dateRange?.[0]?.format("YYYY-MM-DD")
                      : "สิ้นสุด",
                  ]}
                  defaultPickerValue={[dayjs(), null]}
                  disabledDate={(value) =>
                    value && value < dayjs().endOf("day")
                  }
                  disabled={dateRangeDisable}
                  allowEmpty={dateRangeDisable}
                  cellRender={(current) => {
                    const style = {};
                    if (
                      repeatDate === "weeks" &&
                      current.day() === dateRange?.[0]?.day()
                    ) {
                      style.border = "1px solid #1890ff";
                      style.borderRadius = "50%";
                    }
                    return (
                      <div className="ant-picker-cell-inner" style={style}>
                        {current.date()}
                      </div>
                    );
                  }}
                />
              </Form.Item>
              <Form.Item
                label="การเกิดซ้ำ"
                name="repeatDate"
                initialValue="norepeat"
              >
                <Radio.Group>
                  <Radio.Button value="norepeat">Does not repeat</Radio.Button>
                  <Radio.Button value="days">everyday</Radio.Button>
                  <Radio.Button value="weeks">everyweek</Radio.Button>
                </Radio.Group>
              </Form.Item>
              {repeatDate === "weeks" ? (
                <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
                  <Segmented
                    size="large"
                    options={datOfWeekString}
                    value={datOfWeekString[dateRange?.[0]?.day()]}
                    disabled
                  />
                </Form.Item>
              ) : null}
              <Form.Item
                label="เวลาการจอง"
                name="allDay"
                valuePropName="checked"
                initialValue={true}
                style={{ marginBottom: "0" }}
              >
                <Checkbox name="TimeRange">Allday</Checkbox>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.allDay !== currentValues.allDay
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("allDay") !== true ? (
                    <Form.Item
                      name="timeRange"
                      rules={[
                        {
                          required: true,
                          message: "Please input your reservation timing!",
                        },
                      ]}
                      wrapperCol={{ span: 18, offset: 6 }}
                    >
                      <TimePicker.RangePicker format="HH:mm" />
                    </Form.Item>
                  ) : (
                    <div style={{ height: "24px" }}></div>
                  )
                }
              </Form.Item>
              <Form.Item label="ผู้จอง">
                <Input placeholder="ผู้จอง" disabled value={user.firstname} />
              </Form.Item>
              <Form.Item
                label="วัตถุประสงค์"
                name="Purpose"
                rules={[
                  {
                    required: true,
                    message: "Please input your Purpose!",
                  },
                ]}
              >
                <Input placeholder="วัตถุประสงค์" />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Row>
                  <Col span={8}></Col>
                  <Col span={2}>
                    <Button type="primary" htmlType="submit">
                      สร้างการจอง
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      ) : (
        <Result
          icon={<SmileOutlined />}
          title="Your reservation has been made! ^_^"
          extra={
            <Button type="primary" onClick={Clicknext}>
              Next
            </Button>
          }
        />
      )}
    </Fragment>
  );
}

export default Create;
