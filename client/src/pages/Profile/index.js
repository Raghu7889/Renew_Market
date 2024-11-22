import React from "react";
import { Tabs } from "antd";
import Products from "./Products";
import Userbids from "./Userbids";
import { useSelector } from "react-redux";
import moment from "moment";

function Profile() {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab=" My Bids" key="2">
          <Userbids />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <div className="flex flex-col w-1/4">
            <span className="text1 flex justify-between">
              Name: <span className="text1">{user.name}</span>
            </span>
            <span className="text1 flex justify-between">
              Email: <span className="text1">{user.email}</span>
            </span>
            <span className="text1 flex justify-between">
              created At :{" "}
              <span className="text1">
                {moment(user.createdAt).format("MMM D , YYYY hh:mm A")}
              </span>
            </span>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
