import { Button, Card, Input, Typography, Form, notification ,message } from "antd";
export function openNotification  ( message, description ){
    notification.open({
      placement: "bottomRight",
      message,
      description,
      onClick: () => {
        console.log("Notification Clicked!")
      },
    });
  };