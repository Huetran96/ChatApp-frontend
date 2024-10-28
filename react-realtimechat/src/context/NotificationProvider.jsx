import { createContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [connection, setConnection] = useState();
    const [notifications, setNotifications] = useState([]);

    return (
        <NotificationContext.Provider value={{ connection, setConnection, notifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    )

}

export default NotificationContext;