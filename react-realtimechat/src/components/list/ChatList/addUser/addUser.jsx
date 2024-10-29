import {useContext, useState} from "react";
import "./addUser.css";
import HideContext from "../../../../context/HideProvider";
import {addFriendAPI, searchAPI} from "../../../../api/friendShipApi.jsx";

const AddUser = () => {
    const {setHide} = useContext(HideContext)
    const [searchTerm, setSearchTerm] = useState(""); // State to manage search input
    const [searchResults, setSearchResults] = useState([]); // State to store API results

    const handleExit = () => {
        setHide({
            hideMyProfile: true,
            hideFriendProfile: true,
            hideAdd: true,
            hideOverlay: true
        })
    };
    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await searchAPI(searchTerm);
            if (response.status === 200) {
                const results = response.data;

                // Check if searchTerm is a number (only contains digits)
                const isPhoneNumber = /^\d+$/.test(searchTerm);

                // Find the best match based on the search type
                const bestMatch = results.find(user => {
                    if (isPhoneNumber) {
                        // If searchTerm is a phone number, match only PhoneNumber
                        return (user.phoneNumber || "").includes(searchTerm);
                    } else {
                        // Otherwise, match only Name
                        return (user.name || "").toLowerCase().includes(searchTerm.toLowerCase());
                    }
                });
                console.log(bestMatch);
                setSearchResults(bestMatch ? [bestMatch] : []); // Store the best match or empty array if none
            }
        } catch (error) {
            console.error("Failed to fetch search results", error);
        }
    };

    const handleAddFriend = async (user) => {
        try {
            const response = await addFriendAPI(user.phoneNumber);
            if (response.status === 200) {
                alert("Friend request sent successfully!");
            } else {
                alert("Failed to send friend request.");
            }
        } catch (error) {
            console.error("Error sending friend request", error);
            alert("Failed to send friend request.");
        }
    };
    return (
        <div className="adduser-container">
            {/*<div className='exit-item'>*/}
            {/*    <i onClick={() => handleExit()} className="fa fa-arrows-alt" aria-hidden="true"></i>*/}
            {/*</div>*/}
            <div className="addUser">
                <form onSubmit={handleSearch} className="formAddUser">
                    <input
                        type="text"
                        placeholder="Username or Phone Number"
                        name="username"
                        className="inputAddUser"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state on input change
                    />
                    <button type="submit" className="buttonAddUser">Search</button>
                </form>

                <div className="user">
                    {searchResults.length > 0 ? (
                        searchResults.map((user) => (
                            <div key={user.name || user.phoneNumber} className="user-detail">

                                    <div className="detail">
                                        <img src="./avatar.png" alt="User Avatar"/>
                                        <div className="userInfo">
                                            <div className="userInfoA">
                                                <span>Tên </span>
                                                <span>{user.name} </span>
                                            </div>
                                            <div className="userInfoB">
                                                <span>Tel: </span>
                                                <span>{user.phoneNumber} </span>
                                            </div>

                                        </div>

                                    </div>
                                <button
                                        className="buttonAddUser"
                                        type="button"
                                        onClick={() => handleAddFriend(user)}
                                    >
                                        Add User
                                    </button>

                            </div>
                        ))
                    ) : (
                        <p>No users found</p> // Message if no results
                    )}
                </div>

            </div>

        </div>

    );
};

export default AddUser;
