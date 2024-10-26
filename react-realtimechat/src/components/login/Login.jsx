import { useContext, useEffect, useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { loginAPI, registerAPI, verifiedAPI } from "../../api/userApi";
import AuthContext from "../../context/AuthProvider";

const USERNAME_REGEX = /^[A-z][A-z0-9]{3,23}$/;
const PHONE_REGEX = /^[0-9]{10,11}$/;
const EMAIL_REGEX = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    //validate input field login
    const [emailLogin, setEmailLogin] = useState('');
    const [validEmailLogin, setValidEmailLogin] = useState(false);
    const [emailLoginFocus, setEmailLoginFocus] = useState(false);

    const [passwordLogin, setPasswordLogin] = useState('');
    const [validPasswordLogin, setValidPasswordLogin] = useState(false);
    const [passwordLoginFocus, setPasswordLoginFocus] = useState(false);

    useEffect(() => {
        setValidEmailLogin(EMAIL_REGEX.test(emailLogin));
        console.log(emailLogin);

    }, [emailLogin]);

    useEffect(() => {
        setValidPasswordLogin(PWD_REGEX.test(passwordLogin));
    }, [passwordLogin]);

    //validate input field register
    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [phonenumber, setPhonenumber] = useState('');
    const [validPhonenumber, setValidPhonenumber] = useState(false);
    const [phonenumberFocus, setPhonenumberFocus] = useState(false);


    const [emailRegister, setEmailRegister] = useState('');
    const [validEmailRegister, setValidEmailRegister] = useState(false);
    const [emailRegisterFocus, setEmailRegisterFocus] = useState(false);

    const [passwordRegister, setPasswordRegister] = useState('');
    const [validPasswordRegister, setValidPasswordRegister] = useState(false);
    const [passwordRegisterFocus, setPasswordRegisterFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    useEffect(() => {
        setValidUsername(USERNAME_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPhonenumber(PHONE_REGEX.test(phonenumber));
    }, [phonenumber])

    useEffect(() => {
        setValidEmailRegister(EMAIL_REGEX.test(emailRegister));
    }, [emailRegister]);

    useEffect(() => {
        setValidPasswordRegister(PWD_REGEX.test(passwordRegister));
        setValidMatch(matchPassword === passwordRegister);
    }, [passwordRegister, matchPassword]);


    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })

    const handleAvatar = e => {
        if (e.target.files[0])
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const u = {
            Email: emailLogin,
            Password: passwordLogin

        }
        try {
            const response = await loginAPI(u);
            if (response.statusCode === 200) {
                toast.success("xin chào ");
                const token = response.message.value;
                localStorage.setItem('access_token', token);
                setEmailLogin('');
                setPasswordLogin('');

                const res = await verifiedAPI();
                if (res.statusCode === 200) {
                    console.log("Check auth APP", res);

                    const isValid = res.message.isValid
                    if (!isValid) {
                        toast.error("Tài khoản hết hiệu lực, mời đăng nhập lại");
                    }
                    const token = res.message.token;
                    const userId = res.message.userId
                    const userName = res.message.userName; // Get username from response message
                    const roles = res.message.roles
                    setAuth({
                        isAuth: isValid,
                        token: token,
                        user: {
                            id: userId,
                            username: userName,
                            roles: roles
                        }
                    })
                }
            }
            if (response.statusCode === 400) {
                toast.error(response.message);
            }
            console.log('ckeck login: ', response);

        } catch (err) {
            toast.error("Error: " + err.message)
        }
    }
    const handleRegister = async (e) => {
        e.preventDefault()
        const user = {
            UserName: username,
            PhoneNumber: phonenumber,
            Email: emailRegister,
            Password: passwordRegister
        }
        try {
            const response = await registerAPI(user);
            if (response.statusCode === 200) {
                toast.success(response.message);
                setUsername('');
                setPhonenumber('');
                setEmailRegister('');
                setPasswordRegister('');
                setMatchPassword('');
            }
            if (response.statusCode === 400) {
                response.message[0] ? toast.error(response.message[0].description) : toast.error(response.message)
            }
            //console.log('ckeck register: ', response);
            console.log(response.message[0].description);


        } catch (err) {
            toast.error("Error: " + err.message)
        }


    }
    return (
        <div className="login">
            <div className="item">
                <h2>Welcome Back!</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Email"
                        name="emailLogin"
                        onChange={(e) => setEmailLogin(e.target.value)}
                        value={emailLogin}
                        required
                        aria-invalid={validEmailLogin ? "false" : "true"}
                        aria-describedby="emailloginnote"
                        onFocus={() => setEmailLoginFocus(true)}
                        onBlur={() => setEmailLoginFocus(false)}
                    />
                    <p id="emailloginnote"
                        className={emailLogin && !validEmailLogin ? "show" : "hide"}
                    >
                        Nhập email đúng định dạng, ex: abc@gmail.com,... <br />
                    </p>
                    <input
                        type="password"
                        placeholder="Password"
                        name="passwordLogin"
                        onChange={(e) => setPasswordLogin(e.target.value)}
                        value={passwordLogin}
                        required
                        aria-invalid={validPasswordLogin ? "false" : "true"}
                        aria-describedby="passloginnote"
                        onFocus={() => setPasswordLoginFocus(true)}
                        onBlur={() => setPasswordLoginFocus(false)}
                    />
                    <p id="passloginnote"
                        className={passwordLoginFocus && passwordLogin && !validPasswordLogin ? "show" : "hide"}
                    >
                        Mật khẩu cần có từ 8-24 kí tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt

                    </p>
                    <button disabled={!validEmailLogin || !validPasswordLogin ? true : false} >Log in</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.png"} alt="" />
                        Upload an image</label>
                    <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />

                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                        aria-invalid={validUsername ? "false" : "true"}
                        aria-describedby="usernote"
                        onFocus={() => setUsernameFocus(true)}
                        onBlur={() => setUsernameFocus(false)}
                    />
                    <p id="usernote"
                        className={usernameFocus && username && !validUsername ? "show" : "hide"}
                    >
                        Username cần 3-23 ký tự, không chưa ký tự đặc biệt.

                    </p>
                    <input
                        type="text"
                        placeholder="Phone number"
                        name="phonenumber"
                        onChange={(e) => setPhonenumber(e.target.value)}
                        value={phonenumber}
                        required
                        aria-invalid={validPhonenumber ? "false" : "true"}
                        aria-describedby="phonenote"
                        onFocus={() => setPhonenumberFocus(true)}
                        onBlur={() => setPhonenumberFocus(false)}
                    />
                    <p id="phonenote"
                        className={phonenumberFocus && phonenumber && !validPhonenumber ? "show" : "hide"}
                    >
                        Nhập số điện thoại hợp lệ

                    </p>

                    <input
                        type="text"
                        placeholder="Email"
                        name="emailRegister"
                        onChange={(e) => setEmailRegister(e.target.value)}
                        value={emailRegister}
                        required
                        aria-invalid={validEmailRegister ? "false" : "true"}
                        aria-describedby="emailregisternote"
                        onFocus={() => setEmailRegisterFocus(true)}
                        onBlur={() => setEmailRegisterFocus(false)}
                    />
                    <p id="emailregisternote"
                        className={emailRegisterFocus && emailRegister && !validEmailRegister ? "show" : "hide"}
                    >
                        Nhập email đúng định dạng, ex: abc@gmail.com,... <br />
                    </p>

                    <input
                        type="password"
                        placeholder="Password"
                        name="passwordRegister"
                        onChange={(e) => setPasswordRegister(e.target.value)}
                        value={passwordRegister}
                        required
                        aria-invalid={validPasswordRegister ? "false" : "true"}
                        aria-describedby="passregisternote"
                        onFocus={() => setPasswordRegisterFocus(true)}
                        onBlur={() => setPasswordRegisterFocus(false)}
                    />
                    <p id="passregisternote"
                        className={passwordRegisterFocus && passwordRegister && !validPasswordRegister ? "show" : "hide"}
                    >
                        Mật khẩu cần có từ 8-24 kí tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt

                    </p>
                    <input
                        type="password"
                        placeholder="Confirm password"
                        name="passwordConfirm"
                        onChange={(e) => setMatchPassword(e.target.value)}
                        value={matchPassword}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="passmatchnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="passmatchnote"
                        className={matchFocus && matchPassword && !validMatch ? "show" : "hide"}
                    >
                        Mật khẩu chưa trùng khớp

                    </p>
                    <button type="submit" disabled={!validUsername || !validPhonenumber || !validEmailRegister || !validPasswordRegister || !validMatch ? true : false} > Register </button>
                </form>
            </div>
        </div >
    )
}

export default Login