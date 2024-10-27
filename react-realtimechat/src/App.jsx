import {useContext, useEffect, useState} from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import AuthContext from "./context/AuthProvider";
import Sidebar from "./components/sidebar/sidebar";
import { verifiedAPI } from "./api/userApi";
import { toast } from "react-toastify";
import HideContext from "./context/HideProvider";
import FriendShip from "./components/friendship/FriendShip.jsx";

const App = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { hideOverlay } = useContext(HideContext);
  //console.log("check hide APP: ", hide);
  console.log("check auth App", auth);
const [activeComponent, setActiveComponent] = useState("Friendship")
  const handleFriendship = (e) => {
    setActiveComponent("Friendship");
  };

  useEffect(() => {
    async function getAccount() {
      const res = await verifiedAPI();
      if (res.statusCode === 200) {
        console.log("Check auth APP", res);

        const isValid = res.message.isValid
        if (!isValid) {
          toast.error("Tài khoản hết hiệu lực, mời đăng nhập lại");
        }
        const token = res.message.token;
        const userId = res.message.userId
        const userName = res.message.userName; // Get username from response message
        const roles = res.message.roles
        setAuth({
          isAuth: isValid,
          token: token,
          user: {
            id: userId,
            username: userName,
            roles: roles
          }
        })
      }

    }
    getAccount();

  }, [hideOverlay]);

  return (

    <div className="container">
      {!hideOverlay &&
        <div className="overlay-container">
        </div>
      }
      {auth.isAuth ? (
        <>
          <Sidebar handleFriendship={handleFriendship} />
          {activeComponent === "List" && <List />}
          {activeComponent === "Chat" && <Chat />}
          {activeComponent === "Detail" && <Detail />}
          {activeComponent === "Friendship" && <FriendShip />}
        </>
      ) : (
        <Login />)
      }
      <Notification />
      {/* <Profile /> */}

    </div>
  );
};


export default App;