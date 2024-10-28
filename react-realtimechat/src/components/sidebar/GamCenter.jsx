import { useContext, useEffect, useState } from 'react';
import './GameCenter.css';
import HideContext from '../../context/HideProvider';
import { createProAPI, createTrialAPI, verifiedGameCenterAPI } from '../../api/userApi';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthProvider';

const GameCenter = (props) => {
    const { setHideOverLay } = useContext(HideContext);
    const [valid, setValid] = useState(props.isValid);

    console.log('Game Center1', valid);


    const verifiedGameCenter = async () => {
        const res = await verifiedGameCenterAPI();
        console.log("Game Center", res);
        if (res.statusCode === 200) {
            setValid(res.message)
        }

    }

    const registerTrial = async () => {
        const res = await createTrialAPI();
        if (res.statusCode === 200) {
            toast.success("Đăng ký bản dùng thử thành công!");
            var token = res.message.value;
            localStorage.setItem('access_token', token);
            await verifiedGameCenter();
        }
        if (res.statusCode === 400) {
            toast.error(res.message);
        }
        console.log("Trial registered", res);

    }
    const registerPro = async () => {
        const res = await createProAPI();
        if (res.statusCode === 200) {
            toast.success("Nâng cấp tài khoản thành công.");
            var token = res.message.value;
            localStorage.setItem('access_token', token);
            await verifiedGameCenter();
        }
        if (res.statusCode === 400) {
            toast.error(res.message);
        }
        console.log("Pro registered", res);

    }

    return (
        <>
            <div className="gamecenter-container">

                <div className="content-container">
                    <div className="banner-container">
                        <div className='exit-item'>
                            <i
                                onClick={() => setHideOverLay(true)}
                                className="fa fa-arrows-alt" aria-hidden="true"></i>
                        </div>
                        <img src='./game3.webp' />
                    </div>
                    {valid.isValid ?
                        <>
                            <div className='game-container'>
                                <button>Chơi ngay</button>

                            </div>
                        </>
                        :
                        <>
                            <div className="payment-container">

                                <div className="payment">
                                    <h3>Nâng cấp tài khoản để sử dụng dịch vụ</h3>
                                    <div className='payment-item'>
                                        <button onClick={() => registerPro()} >Gói 6 tháng giá 300.000</button>
                                    </div>
                                    <div className='payment-item'>
                                        <button onClick={() => registerPro()}>Gói 12 tháng giá 500.000 </button>
                                    </div>


                                </div>
                                <div>
                                    <h5>Hoặc </h5>
                                    <button onClick={() => registerTrial()}>Dùng thử 1 tháng miễn phí</button>
                                </div>

                            </div>
                        </>
                    }




                </div>

            </div>
        </>
    )
}

export default GameCenter;