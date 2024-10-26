import { useContext } from "react";
import "./addUser.css";
import HideContext from "../../../../context/HideProvider";

const AddUser = () => {
  const { setHideOverLay } = useContext(HideContext)

  const handleExit = () => {
    setHideOverLay(true);
  };
  return (
    <div className="adduser-container">
      <div className='exit-item'>
        <i onClick={() => handleExit()} className="fa fa-arrows-alt" aria-hidden="true"></i>
      </div>
      <div className="addUser">
        <form>
          <input type="text" placeholder="Username" name="username" />
          <button>Search</button>
        </form>

        <div className="user">
          <div className="detail">
            <img src="./avatar.png" alt="" />
            <span>JaneDoe</span>
          </div>
          <button>Add User</button>
        </div>

      </div>

    </div>

  );
};

export default AddUser;
