import { Link, NavLink, Outlet } from "react-router-dom";
import "./LayoutDefault.scss";
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";

function LayoutDefault() {
  // lay token
  const token = getCookie("token");

  // lay bien tu trong store
  // khi login duoc thay doi => no thay doi va tai lai trang
  const isLogin = useSelector(state => state.loginReducer)

  //
  return (
    <>
      <div className="layout-default">
        <header className="layout-default__header">
          {/* Quiz */}
          <div className="layout-default__logo">
            <NavLink to="/">Quiz</NavLink>
          </div>
          {/* menu */}
          <div className="menu">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {/* chec token: nếu có thì mới vào được nhưng thằng
              private */}
              {token && (
                <>
                  <li>
                    <NavLink to="/topic">Topic</NavLink>
                  </li>
                  <li>
                    <NavLink to="/answer">Answer</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          {/* Login */}
          <div className="layout-default__account">
            {/* check token */}
            {token ? (
              <>
                {/* nếu có thì đăng xuất */}
                <NavLink to="/logout">Đăng xuất</NavLink>
              </>
            ) : (
              // không có thì phải đăng ký hoặc đăng nhập
              <>
                <NavLink to="/login">Đăng Nhập</NavLink>
                <NavLink to="/register">Đăng ký</NavLink>
              </>
            )}
          </div>
        </header>
        {/*  */}
        <main className="layout-default__main">
          {/* Outlet: hiển thị những ROUTE con */}
          <Outlet />
        </main>
        {/*  */}
        <footer className="layout-default__footer">
          Copyright @ 2023 by Trong
        </footer>
      </div>
    </>
  );
}

export default LayoutDefault;
