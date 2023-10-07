import { useEffect, useState } from "react";
import { getAnswerByUserId } from "../../services/userAnswer";
import { getListTopic } from "../../services/userTopic";
import { Link } from "react-router-dom";

function Answer() {
  const [dataAnswer, setDataAnswer] = useState([]);

  // api để lấy ra danh sách các topic
  useEffect(() => {
    const fetchApi = async () => {
      // lấy danh sách
      const answerByUserId = await getAnswerByUserId();
      // lấy ra tên theo id truyền vào
      const topics = await getListTopic();

    //   console.log(answerByUserId);
    //   console.log(topics);

      // tạo 1 cái bảng mới 
      let result = [];

      // duyêt và DẢI các giá trị của mảng cũ và mảng mới
      // thỏa mãn nếu 2 cái topic id với id trùng nhau
      for (let i = 0; i < answerByUserId.length; i++) {
        result.push({
          ...topics.find(
            (itemTopic) => itemTopic.id === answerByUserId[i].topicId
          ),
          ...answerByUserId[i],
        });
      }

      // set lại và đảo thằng mới lên đầu
     setDataAnswer(result.reverse());
    };
    fetchApi();
  }, []);

  console.log(dataAnswer)
  return (
    <>
      <h2>Danh sách bài đã luyện tập</h2>

      {dataAnswer.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên chủ đề</th>
              <th>Làm bài</th>
            </tr>
          </thead>
          {dataAnswer.map((item, index) => (
            <tbody key={index}>
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <Link to={"/result/" + item.id}>Xem chi tiết</Link>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </>
  );
}

export default Answer;
