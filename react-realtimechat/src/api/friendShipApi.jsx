import instance from "./axiosFriendShip.jsx";

// https://localhost:7231/api/
const END_POINT = {
    LISTFRIEND: "Friendship/friends", // GET
    LISTBLOCK: "Friendship/blocked-users", // GET
    LISTLMKB: "Friendship/friend-receives", // GET
    LISTYCKB: "Friendship/friend-requests", // GET
    SEARCH: "Friendship/search-users", // GET
    DELETEFRIEND: "Friendship/remove-friend", // DELETE
    ADDFRIEND: "Friendship/add-friend", // POST
    ACCEPTFRIEND: "Friendship/accept-friend", // PUT
    BLOCKFRIEND: "Friendship/block-user", // POST

};

// 1. List Friends API
const listFriendAPI = () => {
    // Include the Authorization header with the token
    return instance.get(`${END_POINT.LISTFRIEND}`);
};

// 2. List Blocked Users API
const listBlockAPI = () => {
    return instance.get(`${END_POINT.LISTBLOCK}`);
}

// 3. List Received Friend Requests API
const listFriendReiceivedAPI = () => {
    return instance.get(`${END_POINT.LISTLMKB}`);
}

// 4. List Sent Friend Requests API
const listFriendRequestAPI = () => {
    return instance.get(`${END_POINT.LISTYCKB}`);
}

// 5. Add Friend API
const addFriendAPI = (phoneNumber) => {
    return instance.post(`${END_POINT.ADDFRIEND}`, { phoneNumber });
}

// 6. Accept Friend API
const acceptFriendAPI = (phoneNumber) => {
    return instance.put(`${END_POINT.ACCEPTFRIEND}?senderPhoneNumber=${encodeURIComponent(phoneNumber)}`);
}

// 7. Block Friend API
const blockFriendAPI = (phoneNumber) => {
    return instance.post(`${END_POINT.BLOCKFRIEND}?blockedUserPhoneNumber=${encodeURIComponent(phoneNumber)}`);
}

// 8. Delete Friend API
const deleteFriendAPI = (phoneNumber) => {
    return instance.post(`${END_POINT.DELETEFRIEND}?friendPhoneNumber=${encodeURIComponent(phoneNumber)}`);
}
// 9.Search API
const searchAPI=(searchTerm)=>{
    return instance.get(`${END_POINT.SEARCH}?searchTerm=${encodeURIComponent(searchTerm)}`);
}

export { listFriendAPI, listBlockAPI, listFriendReiceivedAPI, listFriendRequestAPI, addFriendAPI, acceptFriendAPI, blockFriendAPI, deleteFriendAPI,searchAPI };
