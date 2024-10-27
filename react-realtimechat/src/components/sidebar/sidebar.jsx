import { useContext, useEffect, useState } from 'react';
import './sidebar.css';
import AuthContext from '../../context/AuthProvider';
import { toast } from 'react-toastify';
import HideContext from '../../context/HideProvider';
import { getAccountAPI, getAllUsersAPI, logoutAPI, myProfileAPI, verifiedGameCenterAPI } from '../../api/userApi';
import Profile from '../list/userinfo/Profile';
import GameCenter from './GamCenter';
import AdminPage from './AdminPage';

const Sidebar = ({ setActiveComponent }) => {
    const { auth, setAuth } = useContext(AuthContext);
    const { hideOverlay, setHideOverLay } = useContext(HideContext);

    const [active, setActive] = useState('');
    const [hideGameCenter, setHideGameCenter] = useState(true);
    const [hideProfile, setHideProfile] = useState(true);
    const [hideAdmin, setHideAdmin] = useState(true)

    const [profile, setProfile] = useState({});
    const [user, setUser] = useState({});
    const [listUser, setListUser] = useState([]);
    const [isValidGame, setIsValidGame] = useState(false);

    const className = "w3-bar-item w3-button";
    const classNameActive = "w3-bar-item w3-button active";
    const isAdmin = auth.user.roles.includes('ADMIN');
    console.log("ADMIN", isAdmin);

    useEffect(() => {
        if (hideOverlay) {
            setActive('');
            setHideGameCenter(true);
            setHideAdmin(true);
            setHideProfile(true);
        }
    }, [hideOverlay]);

    useEffect(() => {
        getInfor();
        getUser();

    }, [hideProfile]);

    useEffect(() => {
        verifiedGameCenter();
    }, [hideGameCenter]);

    useEffect(() => {
        getAllUsers();
    }, [hideAdmin]);

    const getInfor = async () => {
        const response = await myProfileAPI();
        if (response.statusCode === 200) {
            setProfile(response.message);

        }
    }
    const getUser = async () => {
        const res = await getAccountAPI();
        if (res.statusCode === 200) {
            setUser(res.message);
        }

    }
    const getAllUsers = async () => {
        const res = await getAllUsersAPI();
        if (res.statusCode === 200) {
            setListUser(res.message);
            console.log("check ALL USERS", res.message);
        }
    }

    const handleProfile = async (e) => {
        setHideProfile(false);
        setHideOverLay(false);
        setActive('profile');
        await getInfor();
        await getUser();


    }


    const verifiedGameCenter = async () => {
        const res = await verifiedGameCenterAPI();
        if (res.statusCode === 200) {
            setIsValidGame(res.message);
        }
    }

    const handleGameCenter = async () => {
        setActive('gamecenter');
        setHideOverLay(false);
        setHideGameCenter(false);
        await verifiedGameCenter();
    }


    const handleAdmin = async () => {
        setActive('admin');
        setHideAdmin(false);
        setHideOverLay(false);
        await getAllUsers();
    }


    const handleLogout = async () => {
        if (confirm('Bạn có muốn đăng xuất không ?')) {
            const res = await logoutAPI();
            localStorage.removeItem('access_token');
            console.log("check res logout: ", res);
            setAuth(auth.isAuth = false)
            toast.success(" Bạn đã đăng xuất ");

        }
    }

  const handleFriendShip = (e) => {
        setActiveComponent("FriendShip"); // Trigger Friendship component
    };
    return (
        <div className="side-bar" >
            <div className='bar-top'>
                <ul>
                    <li onClick={(e) => handleProfile(e)} className={active === "profile" ? classNameActive : className} id='profile' title='Thông tin cá nhân'>
                        <i className="fa fa-user-circle" aria-hidden="true"></i>
                    </li>
                    <li onClick={(e) => handleGameCenter(e)} className={active === "gamecenter" ? classNameActive : className} id='gamecenter' title='Game center'>
                        <i className="fa fa-gamepad" aria-hidden="true"></i>
                    </li>
                    <li className="w3-bar-item w3-button" id='message' title='Tin nhắn'>
                        <i className="fa fa-commenting-o" aria-hidden="true"></i>
                    </li>
                      <li key={3} onClick={handleFriendShip} className="w3-bar-item w3-button" id='bar-item'
                        title='Danh bạ'>
                        <i className="fa fa-address-book-o" aria-hidden="true"></i>
                    </li>
                    <li className="w3-bar-item w3-button" id='notification' title='Thông báo'>
                        <i className="fa fa-bell" aria-hidden="true"></i>
                    </li>

                </ul>

            </div>

            <div className='bar-bottom'>
                <ul>
                    {isAdmin &&
                        <li onClick={() => { handleAdmin() }} className={active === "admin" ? classNameActive : className} id='admin' title='Admin'>
                            <i className="fa fa-sign-out" aria-hidden="true"></i> <br />
                            <small>Admin</small>
                        </li>
                    }

                    <li onClick={() => { handleLogout() }} className="w3-bar-item w3-button" id='logout' title='Đăng xuất'>
                        <i className="fa fa-power-off" aria-hidden="true"></i>
                    </li>
                </ul>
            </div>
            {!hideProfile && <Profile infor={profile} user={user} />}
            {!hideGameCenter && <GameCenter isValid={isValidGame} />}
            {!hideAdmin && <AdminPage users={listUser} />}


        </div >
    )
}

export default Sidebar;