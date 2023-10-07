import { Link } from "react-router-dom";
import "./Topic.css";
import { useEffect, useState } from "react";
import { getListTopic } from "../../services/userTopic";

function Topic() {
  const [topic, setTopic] = useState([]);

  // api để lấy ra danh sách các topic
  useEffect(() => {
    const fetchApi = async () => {
      // lấy danh sách
      const response = await getListTopic();
      // set lại
      setTopic(response);
    };
    fetchApi();
  }, []);

  console.log(topic);

  return (
    <>
      <h2>Danh sách chủ đề</h2>

      {topic.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên chủ đề</th>
              <th>Làm bài</th>
            </tr>
          </thead>
          {topic.map((item, index) => (
            <tbody key={index}>
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <Link to={"/quiz/" + item.id}>Làm bài</Link>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </>
  );
}

export default Topic;
