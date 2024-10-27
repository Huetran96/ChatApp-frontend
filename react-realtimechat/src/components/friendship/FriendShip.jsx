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
import { FaEllipsisV } from 'react-icons/fa';

const FriendShip = () => {
    const {hideOverlay, setHideOverLay} = useContext(HideContext);
    const [hideAdd, setHideAdd] = useState(true);
    const [friends, setFriends] = useState([]); // Trạng thái lưu danh sách bạn bè
    const [activeTab, setActiveTab] = useState("listFriend"); // Trạng thái theo dõi tab đang hoạt động

    // Hàm bật/tắt dropdown menu cho từng bạn bè
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    const { hide, setHide } = useContext(HideContext);
    const handleAdd = () => {
        setHide({
            hideMyProfile: true,
            hideFriendProfile: true,
            hideEdit: true,
            hideAdd: !hide.hideAdd,
            hideOverlay: !hide.hideOverlay
        })
    }

    const handleTabClick = async (tab) => {
        setActiveTab(tab); // Set the active tab state

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
                <div className="friendShipList">
                    <div className="ChatList">
                        <div className="Search">
                            <div className="SearchBar">
                                <img src="search.png" alt=""/>
                                <input type="text" placeholder="Search"/>
                            </div>
                            <img src={!hideAdd ? "./minus.png" : "./plus.png"} alt=""
                                 className="add"
                                 onClick={() => handleAdd()}/>
                        </div>
                        <div>
                            <ul>
                                <li className="item" key={0} onClick={() => handleTabClick("listFriend")}>
                                    <div className="texts">
                                        <span>Danh sách bạn bè</span>
                                    </div>
                                </li>
                                <li className="item" key={1} onClick={() => handleTabClick("listBlock")}>
                                    <div className="texts">
                                        <span>Danh sách chặn</span>
                                    </div>
                                </li>
                                <li className="item" key={2} onClick={() => handleTabClick("requestedFriend")}>
                                    <div className="texts">
                                        <span>Yêu cầu kết bạn</span>
                                    </div>
                                </li>
                                <li className="item" key={3} onClick={() => handleTabClick("receivedFriend")}>
                                    <div className="texts">
                                        <span>Lời mời kết bạn</span>
                                    </div>
                                </li>
                            </ul>
                        </div>


                        {!hideAdd && <AddUser/>}
                    </div>
                </div>
                <div className="friendShipChat">
                    {friends.length > 0 ? (
                        <ul>
                            {friends.map((friend) => (
                                <li key={friend.phoneNumber} className="friend-item">
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
                                            <button onClick={toggleDropdown} className="dropdown-icon">
                                                <FaEllipsisV/>
                                            </button>

                                            {/* Dropdown menu */}
                                            {isDropdownOpen && (
                                                <div className="dropdown-menu">
                                                    {activeTab === "listFriend" && (
                                                        <>
                                                            <button onClick={() => onRemoveFriend(friend.phoneNumber)}>
                                                                Xóa bạn
                                                            </button>
                                                            <button onClick={() => onBlockFriend(friend.phoneNumber)}>
                                                                Chặn bạn
                                                            </button>
                                                        </>
                                                    )}
                                                    {activeTab === "listBlock" && (
                                                        <button onClick={() => unblockFriend(friend.phoneNumber)}>
                                                            Bỏ chặn
                                                        </button>
                                                    )}
                                                    {activeTab === "requestedFriend" && (
                                                        <button onClick={() => cancelRequest(friend.phoneNumber)}>
                                                            Hủy yêu cầu
                                                        </button>
                                                    )}
                                                    {activeTab === "receivedFriend" && (
                                                        <>
                                                            <button onClick={() => acceptFriend(friend.phoneNumber)}>
                                                                Chấp nhận
                                                            </button>
                                                            <button onClick={() => rejectFriend(friend.phoneNumber)}>
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

                <div className="friendShipDetail"></div>


            </div>
            {!hide.hideAdd && <AddUser/>}
        </div>


    );
};


export default FriendShip;