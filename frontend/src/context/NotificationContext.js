import { message } from "antd";
import { createContext, useContext } from "react";

const NotificationContext = createContext();

export const NotificationProvider = (props) => {
  const { children } = props;
  const [messageApi, contextHolder] = message.useMessage();

  const successNotification = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const errorNotification = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const warningNotification = (message) => {
    messageApi.open({
      type: "warning",
      content: message,
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        successNotification,
        errorNotification,
        warningNotification,
      }}
    >
      {children}
      {contextHolder}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};
