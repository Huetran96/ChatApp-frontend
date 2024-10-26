import { useContext, useEffect, useState } from "react";
import "./ChatList.css";
import AddUser from "./addUser/addUser";
import HideContext from "../../../context/HideProvider";

const ChatList = () => {
  const { hideOverlay, setHideOverLay } = useContext(HideContext);
  const [hideAdd, setHideAdd] = useState(true);

  const handleAdd = () => {
    setHideOverLay(false);
    setHideAdd(false);
  }
  useEffect(() => {
    if (hideOverlay) {
      setHideAdd(true);
    }

  }, [hideOverlay])
  return (
    <div className="ChatList">
      <div className="Search">
        <div className="SearchBar">
          <img src="search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img src={!hideAdd ? "./minus.png" : "./plus.png"} alt=""
          className="add"
          onClick={() => handleAdd()} />
      </div>

      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Nguyễn Đức Thuận</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Huệ Trần</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Đinh Tuấn Hùng</span>
          <p>What r u doin</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Phan Nguyễn</span>
          <p>Wut sup</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Lốp Xốp</span>
          <p>Hi there</p>
        </div>
      </div>
      {!hideAdd && <AddUser />}
    </div>

  );
};


export default ChatList;