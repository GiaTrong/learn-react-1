import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkExits, login, register } from "../../services/userService";
import { setCookie } from "../../helpers/cookie";
import "../Login/Login.css";
import Img from "../Login/img";
import { checkLogin } from "../../components/actions/login";
import { generateToken } from "../../helpers/generateToke copy";

function Register() {
  // tu dong chuyen hung
  const navigate = useNavigate();
  //
  const dispatch = useDispatch();

  // handleSubmit
  const handleSubmit = async (e) => {
    // avoiding load web again
    e.preventDefault();
    //
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    // check xem đã có tài khoản tồn tại hay chưa
    const checkExitsEmail = await checkExits("email", email);

    if (checkExitsEmail.length > 0) {
      alert("Email đã tồn tại");

    } else {
      // lưu các key value khi mà đăng ký
      const options = {
        fullName: fullName,
        email: email,
        password: password,
        token: generateToken(),
      };
      // when register successfully, variable res has a value
      const response = await register(options);

      //
      if (response) {
        // tự động chuyển hướng sang trang home
        alert("Đăng ký thành công");
        navigate("/login");
      } else {
        alert("Đăng ký thất bại");
      }
    }
  };

  return (
    <>
      <div className="login_form">
        {/*  */}
        <div className="details">
          <h2 className="welcome">Register</h2>
          <form action="/" method="post" onSubmit={handleSubmit}>
            <div className="wrap">
              <label>FullName</label>
              <input type="fullName" className="input" />
            </div>
            <div className="wrap">
              <label>Email</label>
              <input type="email" className="input" data-type="password" />
            </div>
            <div className="wrap">
              <label>Password</label>
              <input type="password" className="input" data-type="password" />
            </div>
            <div className="wrap">
              <label>Forgot password?</label>
            </div>
            <button type="submit" className="button">
              <h1 className="sign">Create new account</h1>
            </button>
          </form>
        </div>
        {/*  */}
        <Img />
      </div>
    </>
  );
}

export default Register;
