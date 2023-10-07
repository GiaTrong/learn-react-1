import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../services/userService";
import { setCookie } from "../../helpers/cookie";
import "./Login.css";
import Img from "./img";
import { checkLogin } from "../../components/actions/login";
function Login() {
  // tu dong chuyen hung
  const navigate = useNavigate();
  //
  const dispatch = useDispatch();

  // handleSubmit
  const handleSubmit = async (e) => {
    // avoiding load web again
    e.preventDefault();
    //
    const email = e.target[0].value;
    const password = e.target[1].value;
    //
    const response = await login(email, password);
    //
    if (response.length > 0) {
      console.log(response);
      // tự động chuyển hướng sang trang home
      navigate("/");
      // set cooky
      setCookie("id", response[0].id, 1);
      setCookie("fullName", response[0].fullName, 1);
      setCookie("email", response[0].email, 1);
      setCookie("token", response[0].token, 1);

      // goi len 1 cai dispatch de SET lai CHECKLOGIN = TRUE
      dispatch(checkLogin(true));
      // tu dong chuyen huong ve home
      navigate("/");
    } else {
      alert("sai tk hoac mk");
    }
  };
  return (
    <>
      <div className="login_form">
        {/*  */}
        <div className="details">
          <div className="welcome">Welcome</div>
          <form action="/" method="post" onSubmit={handleSubmit}>
            <div className="wrap">
              <label>Email</label>
              <input type="text" className="input" />
            </div>
            <div className="wrap">
              <label>Password</label>
              <input type="password" className="input" data-type="password" />
            </div>
            <div className="wrap">
              <label>Forgot password?</label>
            </div>
            <button type="submit" className="button">
              <h1 className="sign">Sign in!</h1>
            </button>
          </form>
        </div>
        {/*  */}
        <Img />
      </div>
    </>
  );
}

export default Login;
