import { useContext, useState } from 'react';
import './AdminPage.css';
import HideContext from '../../context/HideProvider';


const AdminPage = (props) => {
    const { setHideOverLay } = useContext(HideContext);
    const users = props.users;
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
                                    <td>{index + 1}</td>
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
                        <a className='active' href="#">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">&raquo;</a>

                    </div>


                </div>

            </div>


        </div>
    )
}

export default AdminPage;