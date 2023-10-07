import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../components/actions/login";

function Logout() {
  // nhiệm vụ => xóa hết logout đi
  deleteAllCookies();
  //
  const navigate = useNavigate();
  //
  const dispatch = useDispatch();
  //
  // const 

  // dungf useEffect để cho nó chạy 1 lần thôi
  // kể cả khi componets có render lại 
  useEffect(() => {
    navigate("/login");
    dispatch(checkLogin(false))
  }, []);

  return <></>;
}

export default Logout;
