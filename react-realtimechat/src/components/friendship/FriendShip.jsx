import {useContext, useEffect, useState} from "react";
import "./FriendShip.css";
import AddUser from "../list/ChatList/addUser/addUser.jsx";
import HideContext from "../../context/HideProvider";
import {
    acceptFriendAPI,
    blockFriendAPI,
    deleteFriendAPI,
    listBlockAPI,
    listFriendAPI,
    listFriendRequestAPI
} from "../../api/friendShipApi.jsx";
import Profile from "../list/userinfo/Profile.jsx";

const FriendShip = () => {
    const {hideOverlay, setHideOverLay} = useContext(HideContext);
    const [hideList, setHideList] = useState(false);
    const [hideChat, setHideChat] = useState(false);
    const [hideDetail, setHideDetail] = useState(true);
    const [hideAdd, setHideAdd] = useState(true);
    const [friends, setFriends] = useState([]); // Trạng thái lưu danh sách bạn bè
    const [activeTab, setActiveTab] = useState("listFriend"); // Trạng thái theo dõi tab đang hoạt động
    const [selectedFriend, setSelectedFriend] = useState(null); // State for selected friend

    // Hàm bật/tắt dropdown menu cho từng bạn bè
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);


    const handleAdd = () => {
        setHideAdd(!hideAdd);
    }
    const handleTabClick = async (tab) => {
        setActiveTab(tab); // Set the active tab state
        setSelectedFriend(null);

        // Fetch data based on the selected tab
        try {
            let response;
            switch (tab) {
                case "listFriend":
                    response = await listFriendAPI();
                    break;
                case "listBlock":
                    response = await listBlockAPI();
                    break;
                case "requestedFriend":
                    response = await listFriendRequestAPI();
                    break;
                case "receivedFriend":
                    response = await listFriendRequestAPI(); // Assuming the same API is used for received requests
                    break;
                default:
                    return;
            }

            if (response && response.status === 200) {
                setFriends(response.data); // Update friends list based on selected tab data
            }
        } catch (error) {
            console.error("Unable to fetch data", error);
            if (error.response && error.response.status === 401) {
                console.log("Unauthorized access - please log in again.");
            }
        }
    };

    // Hàm xử lý xóa bạn bè
    const onRemoveFriend = async (phoneNumber) => {
        try {
            const response = await deleteFriendAPI(phoneNumber);
            if (response.status === 200) {
                // Cập nhật danh sách bạn bè sau khi xóa
                setFriends((prevFriends) =>
                    prevFriends.filter((friend) => friend.phoneNumber !== phoneNumber)
                );
                console.log("Xóa bạn bè thành công.");
            }
        } catch (error) {
            console.error("Không thể xóa bạn bè", error);
            if (error.response && error.response.status === 401) {
                console.log("Truy cập không hợp lệ - vui lòng đăng nhập lại.");
            }
        }
    };

    // Hàm xử lý chặn bạn bè
    const onBlockFriend = async (phoneNumber) => {
        try {
            const response = await blockFriendAPI(phoneNumber);
            if (response.status === 200) {
                // Cập nhật danh sách bạn bè sau khi chặn
                setFriends((prevFriends) =>
                    prevFriends.filter((friend) => friend.phoneNumber !== phoneNumber)
                );
                console.log("Chặn bạn bè thành công.");
            }
        } catch (error) {
            console.error("Không thể chặn bạn bè", error);
            if (error.response && error.response.status === 401) {
                console.log("Truy cập không hợp lệ - vui lòng đăng nhập lại.");
            }
        }

    };

    const acceptFriend = async (phoneNumber) => {
        try {
            const response = await acceptFriendAPI(phoneNumber); // Assuming `acceptFriendAPI` is defined in your API file
            if (response.status === 200) {
                setFriends((prevFriends) =>
                    prevFriends.filter((friend) => friend.phoneNumber !== phoneNumber)
                );
                console.log("Friend request accepted.");
            }
        } catch (error) {
            console.error("Failed to accept friend request", error);
            if (error.response && error.response.status === 401) {
                console.log("Unauthorized access - please log in again.");
            }
        }
    };

    const rejectFriend = async (phoneNumber) => {
        try {
            const response = await deleteFriendAPI(phoneNumber); // Assuming `rejectFriendAPI` is defined in your API file
            if (response.status === 200) {
                setFriends((prevFriends) =>
                    prevFriends.filter((friend) => friend.phoneNumber !== phoneNumber)
                );
                console.log("Friend request rejected.");
            }
        } catch (error) {
            console.error("Failed to reject friend request", error);
            if (error.response && error.response.status === 401) {
                console.log("Unauthorized access - please log in again.");
            }
        }
    };

    const cancelRequest = async (phoneNumber) => {
        try {
            const response = await deleteFriendAPI(phoneNumber); // Assuming `cancelFriendRequestAPI` is defined in your API file
            if (response.status === 200) {
                setFriends((prevFriends) =>
                    prevFriends.filter((friend) => friend.phoneNumber !== phoneNumber)
                );
                console.log("Friend request canceled.");
            }
        } catch (error) {
            console.error("Failed to cancel friend request", error);
            if (error.response && error.response.status === 401) {
                console.log("Unauthorized access - please log in again.");
            }
        }
    };

    const unblockFriend = async (phoneNumber) => {
        try {
            const response = await deleteFriendAPI(phoneNumber); // Assuming `unblockFriendAPI` is defined in your API file
            if (response.status === 200) {
                // Update the friends list by removing the unblocked friend from the list
                setFriends((prevFriends) =>
                    prevFriends.filter((friend) => friend.phoneNumber !== phoneNumber)
                );
                console.log("Friend successfully unblocked.");
            }
        } catch (error) {
            console.error("Failed to unblock friend", error);
            if (error.response && error.response.status === 401) {
                console.log("Unauthorized access - please log in again.");
            }
        }
    };

    useEffect(() => {
        if (hideOverlay) {
            setHideAdd(true);
        }

    }, [hideOverlay])
    return (
        <div className="containerFriendShip">
            <div className="containerFriendShip2">
                <div className="friendShipSidebar"></div>
                {!hideList &&
                    <div className="friendShipList">
                        <div className="ChatList">
                            <div className="Search">
                                <div className="SearchBar">
                                    <img src="search.png" alt="" className="searchIcon"/>
                                    <input type="text" placeholder="Search"/>
                                </div>
                                <img src={!hideAdd ? "./minus.png" : "./plus.png"} alt=""
                                     className="add"
                                     onClick={() => handleAdd()}/>
                            </div>
                            <div>
                                <ul>
                                    <li className={`item ${activeTab === "listFriend" ? "active" : ""}`} key={0}
                                        onClick={() => handleTabClick("listFriend")}>
                                        <div className="texts">
                                            <span>Danh sách bạn bè</span>
                                        </div>
                                    </li>
                                    <li className={`item ${activeTab === "listBlock" ? "active" : ""}`} key={1}
                                        onClick={() => handleTabClick("listBlock")}>
                                        <div className="texts">
                                            <span>Danh sách chặn</span>
                                        </div>
                                    </li>
                                    <li className={`item ${activeTab === "requestedFriend" ? "active" : ""}`} key={2}
                                        onClick={() => handleTabClick("requestedFriend")}>
                                        <div className="texts">
                                            <span>Yêu cầu kết bạn</span>
                                        </div>
                                    </li>
                                    <li className={`item ${activeTab === "receivedFriend" ? "active" : ""}`} key={3}
                                        onClick={() => handleTabClick("receivedFriend")}>
                                        <div className="texts">
                                            <span>Lời mời kết bạn</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>


                            {!hideAdd && <AddUser/>}
                        </div>
                    </div>}
                {!hideChat &&
                    <div className="friendShipChat">
                        {friends.length > 0 ? (
                            <ul className="listFriendShipChat">
                                {friends.map((friend) => (
                                    <li key={friend.phoneNumber} className="friend-item"
                                        onClick={() => setSelectedFriend(friend)}>
                                        <div className="listContainer">
                                            <div className="listAvatar">
                                                <img src="./avatar.png" alt="User Avatar"/>
                                            </div>
                                            <div className="listContent">
                                                <div>
                                                    <span>Tên</span>
                                                    <p>{friend.name}</p>
                                                </div>
                                                <div>
                                                    <span>Số điện thoại</span>
                                                    <p>{friend.phoneNumber}</p>
                                                </div>
                                            </div>
                                            <div className="listFunction">
                                                {/* Icon to toggle dropdown */}
                                                <div className="iconDropdown" onClick={toggleDropdown}>
                                                    <img
                                                        src={"./plus.png"}
                                                        alt=""
                                                        className="dropdown-icon"
                                                    />
                                                </div>

                                                {/* Dropdown menu */}
                                                {isDropdownOpen && (
                                                    <div className="contentDropdown">
                                                        {activeTab === "listFriend" && (
                                                            <>
                                                                <button className="buttonDropdown"
                                                                        onClick={() => onRemoveFriend(friend.phoneNumber)}>
                                                                    Xóa bạn
                                                                </button>
                                                                <button className="buttonDropdown"
                                                                        onClick={() => onBlockFriend(friend.phoneNumber)}>
                                                                    Chặn bạn
                                                                </button>
                                                            </>
                                                        )}
                                                        {activeTab === "listBlock" && (
                                                            <button className="buttonDropdown"
                                                                    onClick={() => unblockFriend(friend.phoneNumber)}>
                                                                Bỏ chặn
                                                            </button>
                                                        )}
                                                        {activeTab === "requestedFriend" && (
                                                            <button className="buttonDropdown"
                                                                    onClick={() => cancelRequest(friend.phoneNumber)}>
                                                                Hủy yêu cầu
                                                            </button>
                                                        )}
                                                        {activeTab === "receivedFriend" && (
                                                            <>
                                                                <button className="buttonDropdown"
                                                                        onClick={() => acceptFriend(friend.phoneNumber)}>
                                                                    Chấp nhận
                                                                </button>
                                                                <button className="buttonDropdown"
                                                                        onClick={() => rejectFriend(friend.phoneNumber)}>
                                                                    Từ chối
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Hãy chọn một danh sách để xem.</p>
                        )}
                    </div>
                }



                {/* Conditionally render friendShipDetail based on selectedFriend */}
                {selectedFriend && (
                    <div className="friendShipDetail">
                        <div className="detail">
                            <div className="user">
                                <img src="./avatar.png" alt=""/>
                                <h2>{selectedFriend.name}</h2>
                                <p>Số điện thoại: {selectedFriend.phoneNumber}</p>
                            </div>
                            <div className="info">
                                <div className="option">
                                    <div className="title">
                                        <span>Chat Settings</span>
                                        <img src="./arrowUp.png" alt=""/>
                                    </div>
                                </div>

                                <div className="option">
                                    <div className="title">
                                        <span>Privacy & help</span>
                                        <img src="./arrowUp.png" alt=""/>
                                    </div>
                                </div>

                                <div className="option">
                                    <div className="title">
                                        <span>Shared photos</span>
                                        <img src="./arrowDown.png" alt=""/>
                                    </div>
                                    <div className="photos">
                                        <div className="photoItem">
                                            <div className="photoDetail">
                                                <img src="./camera.png" alt=""/>
                                                <span>photo_2024_10.png</span>
                                            </div>
                                            <img src="./download.png" alt="" className="icon"/>
                                        </div>
                                        <div className="photoItem">
                                            <div className="photoDetail">
                                                <img src="./camera.png" alt=""/>
                                                <span>photo_2024_10.png</span>
                                            </div>
                                            <img src="./download.png" alt="" className="icon"/>
                                        </div>
                                        <div className="photoItem">
                                            <div className="photoDetail">
                                                <img src="./camera.png" alt=""/>
                                                <span>photo_2024_10.png</span>
                                            </div>
                                            <img src="./download.png" alt="" className="icon"/>
                                        </div>

                                    </div>
                                </div>

                                <div className="option">
                                    <div className="title">
                                        <span>Shared Files</span>
                                        <img src="./arrowUp.png" alt=""/>
                                    </div>
                                </div>
                                <button onClick={() => onBlockFriend(selectedFriend.phoneNumber)}>Block User</button>
                            </div>
                        </div>
                    </div>
                )}


            </div>
            {!hideAdd && <AddUser/>}
        </div>


    );
};


export default FriendShip;