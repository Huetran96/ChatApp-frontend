import {useContext, useEffect, useState} from 'react';
import './AdminPage.css';
import HideContext from '../../context/HideProvider';
import {getAllUsersAPIData} from '../../api/userApi';


const AdminPage = (props) => {
    const {setHideOverLay} = useContext(HideContext);
    const [users, setUsers] = useState(props.users.users);

    // const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(props.users.totalPage);
    const [input, setInput] = useState('');
    const [Keyword, setKeyword] = useState('');
    const [data, setData] = useState({
        Page: 1,
        PageSize: 10,
    })

    const classNameActive = 'active';

    useEffect(() => {
        if (Keyword !== '') {
            setData(pre => ({
                ...pre,
                Keyword: Keyword
            }))
        } else {
            setData({
                Page: data.Page,
                PageSize: data.PageSize
            })
        }
    }, [Keyword])

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <a onClick={() => setData(pre => ({
                ...pre,
                Page: i
            }))}
               className={data.Page === i ? classNameActive : null}
               key={i} href="#">{i}</a>
        );
    }
    console.log("check data search", data);

    useEffect(() => {
        const getAllUsers = async () => {
            console.log("ckeck data 3", data);

            const res = await getAllUsersAPIData(data);
            console.log("check all users ADMIN", res.message);
            setUsers(res.message.users);
            setTotalPages(res.message.totalPage);

        }
        getAllUsers();
    }, [data])

    const handleSenNotification = async () => {
        const connection = new HubConnectionBuilder()
            .withUrl("http://localhost:5065/notification-hub")
            .build();
        await connection.start();
        await connection.invoke("SendMessage", input);
    }


    return (
        <div className='admin-container'>
            <div className='content-container'>
                <div className='exit-container'>
                    <i
                        onClick={() => {
                            setHideOverLay(true);
                        }}
                        className="fa fa-arrows-alt" aria-hidden="true"></i>

                </div>
                <div className='title'>
                    <h1>Admin Page</h1>
                </div>
                <div className='search-container'>
                    <input
                        onChange={(e) => setKeyword(e.target.value)}
                        value={Keyword} placeholder='Tìm kiếm '/>

                </div>
                <div className='table-container'>
                    <table>
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone number</th>
                            <th>Address</th>
                            <th>Gender</th>
                            <th>Dob</th>
                            <th>Role</th>
                            <th>Claim</th>
                            <th>Expire Game</th>
                            <th>Friend</th>
                            <th>Message</th>
                            <th>Action</th>

                        </tr>

                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{(data.Page - 1) * data.PageSize + index + 1}</td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>50</td>
                                <td>50</td>
                                <td>50</td>
                                <td>50</td>
                                <td>50</td>
                                <td>50</td>
                                <td>50</td>
                                <td>50</td>
                                <td>50</td>
                            </tr>
                        ))}


                        </tbody>


                    </table>

                </div>
                <div className='pagination-container'>
                    <div className='pagination'>
                        <a href="#">&laquo;</a>
                        {pages}
                        <a href="#">&raquo;</a>

                    </div>


                </div>

            </div>

            <div className='sendnotify-container'>
                <input onChange={e => setInput(e.target.value)} value={input}/>
                <button onClick={() => handleSenNotification()}>Gửi thông báo tất cả</button>

            </div>


        </div>
    )
}

export default AdminPage;