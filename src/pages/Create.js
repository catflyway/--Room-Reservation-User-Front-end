import React, { useState, useEffect } from "react";
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
  Space,
  Checkbox,
  Segmented,
  Result,
} from "antd";
import dayjs from "dayjs";
import axios from "axios";
import { SmileOutlined } from "@ant-design/icons";

function Create() {
  const [data, setData] = useState({
    Room: "",
    Building: "",
    UserID: "",
    startTime: [],
    endTime: [],
    allDay: false,
    Purpose: "",
    repeatDate: "",
  });
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
  const [roomsList, setRoomsList] = useState([]);
  function getRoomsInOrgID(id) {
    axios.get("/rooms/buildingroom/" + id).then((response) => {
      console.log(response);
      setRoomsList(response.data);
    });
  }
  const [usersFirstname, setUsersFirstname] = useState(() => {
    let toto = localStorage.getItem("userData");
    let userProfle = JSON.parse(toto);
    setData({ ...data, UserID: userProfle._id });
    return userProfle.firstname;
  });

  useEffect(() => {
    getOrg();
  }, []);

  const onChangeorg = (orgID) => {
    console.log(`selected ${orgID}`);
    getBuildingInOrgID(orgID);

    setData({ ...data, OrgID: orgID });
  };
  const onChangebuild = (buildingID) => {
    console.log(`selected ${buildingID}`);
    getRoomsInOrgID(buildingID);

    setData({ ...data, buildingID: buildingID });
  };

  const [Clickcreate, setClickcreate] = useState(true);
  const handleSubmit = (value) => {
    console.log(value);
    axios.post("/Requests", data).then((response) => {
      console.log(response.data);
    });
    console.log(data);
    setClickcreate(false);
  };
  const Clicknext = (e) => {
    setClickcreate(true);
    console.log("5555");
  };

  const datOfWeekString = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  const [isAllDay, setIsAllDay] = useState(true);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [timeRange, setTimeRange] = useState([0, 24 * 60]);
  const [weekDay, setWeekDay] = useState();
  const [repeatPattern, setRepeatPattern] = useState("norepeat");

  const onChangeTimeRange = (timesrt, timeString) => {
    let startDiff = timesrt[0]?.diff(
      timesrt[0].clone().startOf("day"),
      "minute"
    );
    let stopDiff = timesrt[1]?.diff(
      timesrt[1].clone().startOf("day"),
      "minute"
    );
    setTimeRange([startDiff, stopDiff]);
  };

  React.useEffect(() => {
    if (startDate) {
      setWeekDay(datOfWeekString[startDate.day()]);
    }
  }, [startDate]);

  React.useEffect(() => {
    if (isAllDay) {
      setTimeRange([0, 24 * 60]);
    }
  }, [isAllDay]);

  React.useEffect(() => {
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

    if (startDate && timeRange && repeatPattern == "norepeat") {
      let range = getTimeRange(startDate);
      startTime = [range[0]];
      endTime = [range[1]];
    } else if (startDate && endDate && timeRange && repeatPattern == "days") {
      [startTime, endTime] = getTimeRangeInterval(1);
    } else if (startDate && endDate && timeRange && repeatPattern == "weeks") {
      [startTime, endTime] = getTimeRangeInterval(7);
    }

    setData({
      ...data,
      allDay: isAllDay,
      repeatDate: repeatPattern,
      startTime,
      endTime,
    });
  }, [repeatPattern, startDate, endDate, timeRange]);

  return (
    <div className="App">
      <div className="User-list">
        <div className="Heard-Manageano">
          <h1>Create</h1>
        </div>
        {Clickcreate == true ? (
          <>
            <Row>
              <Col span={12} offset={6}>
                <Form
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
                    name="หน่วยงาน"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Organization!",
                      },
                    ]}
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
                    name="อาคาร/สถานที่"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Building!",
                      },
                    ]}
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
                    name="ห้อง"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Room!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="ห้อง"
                      optionFilterProp="children"
                      onChange={(value) => setData({ ...data, Room: value })}
                      filterOption={(input, option) =>
                        (option?.Name ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      fieldNames={{ label: "Name", value: "_id" }}
                      options={roomsList}
                    />
                  </Form.Item>
                  <Form.Item label="เวลาการจอง">
                    <Space direction="vertical">
                      <Checkbox
                        name="TimeRange"
                        checked={isAllDay}
                        onChange={(e) => setIsAllDay(e.target.checked)}
                      >
                        Allday
                      </Checkbox>
                      {!isAllDay ? (
                        <Form.Item
                          name="time"
                          rules={[
                            {
                              required: true,
                              message: "Please input your reservation timing!",
                            },
                          ]}
                        >
                          <TimePicker.RangePicker
                            onChange={onChangeTimeRange}
                            format="HH:mm"
                          />
                        </Form.Item>
                      ) : (
                        ""
                      )}
                    </Space>
                  </Form.Item>
                  <Form.Item label="วันจอง">
                    <Space direction="vertical">
                      <Form.Item
                        name="startDate"
                        rules={[
                          {
                            required: true,
                            message: "Please input your StartDate!",
                          },
                        ]}
                      >
                        <DatePicker
                          placeholder="เริ่มจอง"
                          onChange={(date) =>
                            setStartDate(date?.clone().startOf("day"))
                          }
                          value={startDate}
                          disabledDate={(value) =>
                            value && value < dayjs().endOf("day")
                          }
                        />
                      </Form.Item>
                      <Radio.Group
                        value={repeatPattern}
                        onChange={(e) => setRepeatPattern(e.target.value)}
                      >
                        <Radio.Button value="norepeat">
                          Does not repeat
                        </Radio.Button>
                        <Radio.Button value="days">everyday</Radio.Button>
                        <Radio.Button value="weeks">everyweek</Radio.Button>
                      </Radio.Group>
                      {repeatPattern == "days" ? (
                        <Form.Item
                          name="endDate"
                          rules={[
                            {
                              required: true,
                              message: "Please input your EndDate!",
                            },
                          ]}
                        >
                          <DatePicker
                            onChange={(date) =>
                              setEndDate(
                                date?.clone().add(1, "day").startOf("day")
                              )
                            }
                            placeholder="วันสิ้นการจอง"
                            disabledDate={(value) => value && value < startDate}
                          />
                        </Form.Item>
                      ) : repeatPattern == "weeks" ? (
                        <>
                          <Segmented
                            size="large"
                            options={datOfWeekString}
                            value={weekDay}
                            disabled
                          />
                          <Form.Item
                            name="endDate"
                            rules={[
                              {
                                required: true,
                                message: "Please input your EndDate!",
                              },
                            ]}
                          >
                            <DatePicker
                              onChange={(date) =>
                                setEndDate(
                                  date?.clone().add(1, "day").startOf("day")
                                )
                              }
                              placeholder="วันสิ้นสุดสัปดาห์"
                              disabledDate={(value) =>
                                value &&
                                startDate &&
                                (value < startDate ||
                                  value.day() != startDate.day())
                              }
                            />
                          </Form.Item>
                        </>
                      ) : (
                        ""
                      )}
                    </Space>
                  </Form.Item>
                  <Form.Item label="ผู้จอง">
                    <Input
                      placeholder="ผู้จอง"
                      disabled
                      value={usersFirstname}
                    />
                  </Form.Item>
                  <Form.Item
                    label="วัตถุประสงค์"
                    name="วัตถุประสงค์"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Purpose!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="วัตถุประสงค์"
                      onChange={(e) =>
                        setData({ ...data, Purpose: e.target.value })
                      }
                      value={data?.Purpose}
                    />
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
          </>
        ) : (
          <Result
            icon={<SmileOutlined />}
            title="Great, we have done all the operations!"
            extra={
              <Button type="primary" onClick={Clicknext}>
                Next
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}

export default Create;
