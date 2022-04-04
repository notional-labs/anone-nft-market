import { notification } from "antd";

notification.config({
    duration: 3,
});

export const openNotification = (type, message) => {
    notification[type]({
        message,
    });
};