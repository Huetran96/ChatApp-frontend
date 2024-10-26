
import { useContext, useEffect, useState } from 'react';
import './Profile.css'
import AuthContext from '../../../context/AuthProvider';
import HideContext from '../../../context/HideProvider';
import { getAccountAPI, myProfileAPI, updateAccountAPI, updateProfileAPI } from '../../../api/userApi';
import { toast } from 'react-toastify';

//const PHONE_REGEX = /^[0-9]{10,11}$/;
//const EMAIL_REGEX = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

//2 props: infor, user
const Profile = (props) => {
    const { auth } = useContext(AuthContext);
    const { setHideOverLay } = useContext(HideContext);
    const [infor, setInfor] = useState(props.infor);
    const [user, setUser] = useState(props.user);

    const [hidepass, setHidepass] = useState(true);
    const [hideEdit, setHideEdit] = useState(true);
    const [password, setPassword] = useState('');

    const [property, setProperty] = useState('');
    const [input, setInput] = useState('');
    const [active, setActive] = useState('')

    const className = "infor-list";
    const classNameActive = 'infor-list active';

    const getProfile = async () => {
        const response = await myProfileAPI();
        if (response.statusCode === 200) {
            setInfor(response.message);
        }
    }
    const getAccount = async () => {
        const res = await getAccountAPI();
        if (res.statusCode === 200) {
            setUser(res.message);
        }

    }

    const handleEdit = (e) => {
        setHideEdit(false);
        setProperty(e.target.id);
        setActive(e.target.id);

    }

    const handleSubmit = async () => {
        let data = {
            prop: property,
            value: input
        };
        if (hidepass) {
            const response = await updateProfileAPI(data);
            if (response.statusCode === 200) {
                await getProfile();
                setActive('')
                toast.success("Cập nhật thành công!");
                setHideEdit(true);
            }

        } else {
            data = {
                prop: property,
                value: input,
                password: password
            }
            const response = await updateAccountAPI(data);
            if (response.statusCode === 200) {
                toast.success("Cập nhật thành công");
                getAccount();
                setActive('')
                setPassword('');
                setInput('');
                setHidepass(true);
                setHideEdit(true);
            }
            if (response.statusCode === 400) {
                toast.error(response.message);
            }
        }


    }

    return (
        <>

            <div className="profile-container" >
                <div className='exit-item'>
                    <i onClick={() => setHideOverLay(true)}
                        className="fa fa-arrows-alt" aria-hidden="true"></i>
                </div>
                <div className='content-container'>

                    <div className='avatar-container'>
                        <img src='./favicon.png' alt='' />
                        <h3>{auth.user.username}</h3>
                        <div className={active === 'Bio' ? classNameActive : className}>
                            Bio:
                            <span>{infor.bio}</span>
                            <button disabled={!hideEdit}>
                                <i id='Bio' onClick={(e) => handleEdit(e)} className="fa fa-pencil" aria-hidden="true" title='Sửa'></i>
                            </button>

                        </div>
                    </div>
                    <div className='info-container'>
                        <div className='edit-container'>
                            {!hidepass &&
                                <div className='password-conatiner'>
                                    <label htmlFor="">Mật khẩu : </label>
                                    <input onChange={(e) => setPassword(e.target.value)} type='password' /> <br />

                                </div>
                            }


                            {!hideEdit &&
                                <>
                                    <label htmlFor="">Chỉnh sửa : </label>
                                    <input required onChange={(e) => setInput(e.target.value)} />
                                    <button onClick={() => handleSubmit()} ><i className="fa fa-check" aria-hidden="true" title='Cập nhật'></i></button>
                                    <button
                                        onClick={() => (
                                            setHideEdit(true),
                                            setActive(''),
                                            setHidepass(true)
                                        )} >
                                        <i className="fa fa-times" aria-hidden="true" title='Hủy'></i></button>
                                </>
                            }
                        </div>
                        <ul >
                            <li className={active === 'Gender' ? classNameActive : className}>
                                Giới tính:
                                <span>{infor.gender}</span>
                                <button disabled={!hideEdit}>
                                    <i id='Gender' onClick={(e) => handleEdit(e)} className="fa fa-pencil" aria-hidden="true" title='Sửa'></i>
                                </button>

                            </li>
                            <li className={active === 'Address' ? classNameActive : className}>
                                Địa chỉ:
                                <span>{infor.address}</span>
                                <button disabled={!hideEdit}>
                                    <i id='Address' onClick={(e) => handleEdit(e)} className="fa fa-pencil" aria-hidden="true" title='Sửa'></i>
                                </button>

                            </li >
                            <li className={className}>
                                Ngày sinh:
                                <span>{infor.dob}</span>
                                <button disabled={!hideEdit}><i className="fa fa-pencil" aria-hidden="true" title='Sửa'></i></button>

                            </li>


                            <li className={active === 'Hobby' ? classNameActive : className}>
                                Sở thích:
                                <span>{infor.hobby}</span>
                                <button disabled={!hideEdit}>
                                    <i id='Hobby' onClick={(e) => handleEdit(e)} className="fa fa-pencil" aria-hidden="true" title='Sửa'></i>
                                </button>

                            </li>
                            <li className={active === 'Sport' ? classNameActive : className}>
                                Thể thao:
                                <span>{infor.sport}</span>
                                <button disabled={!hideEdit}>
                                    <i id='Sport' onClick={(e) => handleEdit(e)} className="fa fa-pencil" aria-hidden="true" title='Sửa'></i>
                                </button>

                            </li>

                            <li className={active === 'WorkStatus' ? classNameActive : className}>
                                Công việc:
                                <span>{infor.workStatus}</span>
                                <button disabled={!hideEdit}>
                                    <i id='WorkStatus' onClick={(e) => handleEdit(e)} className="fa fa-pencil" aria-hidden="true" title='Sửa'></i>
                                </button>

                            </li>
                            <li className={active === 'Email' ? classNameActive : className}>
                                Email:
                                <span>{user.email}</span>
                                <button disabled={!hideEdit}>
                                    <i id='Email' onClick={(e) => (handleEdit(e), setHidepass(false))} className="fa fa-pencil" aria-hidden="true" title='Sửa'></i>
                                </button>

                            </li>
                            <li className={active === 'PhoneNumber' ? classNameActive : className}>
                                Số điện thoại:
                                <span>{user.phoneNumber}</span>
                                <button disabled={!hideEdit}>
                                    <i id='PhoneNumber' onClick={(e) => (handleEdit(e), setHidepass(false))} className="fa fa-pencil" aria-hidden="true" title='Sửa'></i>
                                </button>

                            </li>

                        </ul>

                    </div>
                    <div className='button-container'>
                        <button disabled={!hideEdit}> Xóa tài khoản</button>
                    </div>
                </div>
            </div>

        </>
    );
}


export default Profile;