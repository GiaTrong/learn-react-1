import LayoutDefault from "../Layout/LayoutDefault";
import PrivateRouter from "../components/PrivateRouter";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Answer from "../pages/Answer";
import Quiz from "../pages/Quiz";
import Topic from "../pages/Topic";
import Result from "../pages/Result";
import Register from "../pages/Register";
import Logout from "../pages/Logout";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    // nhung thang con thi vat vao day
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        element: <PrivateRouter />,
        children: [
          {
            path: "answer",
            element: <Answer />,
          },
          {
            path: "quiz/:id",
            element: <Quiz />,
          },
          {
            path: "result/:id",
            element: <Result />,
          },
          {
            path: "topic",
            element: <Topic />,
          },
          {
            path: "logout",
            element: <Logout />,
          },
        ],
      },
    ],
  },
];
