import { message, Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";
import { DeleteNotification } from "../apicalls/notifications";

function Notifications({
  notifications = [],
  reloadNotifications,
  showNotifications,
  setShowNotifications,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteNotification = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteNotification(id);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        reloadNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Notifications"
      open={showNotifications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={1000}
    >
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <div
            className="flex flex-col p-3 border2 cursor-pointer"
            key={notification._id}
          >
            <div className="flex justify-between">
              <div
                onClick={() => {
                  navigate(notification.onClick);
                  setShowNotifications(false);
                }}
              >
                <h1 className="text-sm text-black-700">{notification.title}</h1>
                <span className="text-gray-600">{notification.message}</span>
                <h1 className="text-sm text-gray-500">
                  {moment(notification.createdAt).fromNow()}
                </h1>
              </div>
              <DeleteOutlined
                className="text-xl hover:text-red-500 cursor-pointer"
                onClick={() => {
                  deleteNotification(notification._id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default Notifications;
