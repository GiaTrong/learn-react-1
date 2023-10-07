import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/userTopic";
import { getListQuestions } from "../../services/userQuestion";
import { getCookie } from "../../helpers/cookie";
import { createAns } from "../../services/topicService";

function Quiz() {
  const params = useParams();
  const navigate = useNavigate();
  const [dataTopic, setDataTopic] = useState();
  const [dataQuestion, setDataQuestion] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getTopic(params.id);
      setDataTopic(response);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListQuestions(params.id);
      setDataQuestion(response);
    };
    fetchApi();
  }, []);

  // Đoạn này hơi khó hiểu
  const handleSubmit = async (e) => {
    e.preventDefault();
    // tại saoo nó lại checked được ???????
    // console.log(e);
    // console.log(e.target.elements);

    let selectedAns = [];
    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].checked) {
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;

        selectedAns.push({
          questionId: parseInt(name),
          answer: parseInt(value),
        });
      }
    }

    let options = {
      userId: parseInt(getCookie("id")),
      topicId: parseInt(params.id),
      answers: selectedAns,
    };

    const response = await createAns(options);
    console.log(response);
    // console.log(options)

    // tự động sang trang result sau khi nộp bài xong
    // nếu mà có response thì sẽ tự động sang => navigate
    if (response) {
      // response.id: bài làm mới nhất vì trong 1 thằng userId làm nhiều bài
      navigate(`/result/${response.id}`);
    }
  };

  // console.log(dataQuestion);

  return (
    <>
      <h2>Bài quiz chủ đề: {dataTopic && <>{dataTopic.name}</>}</h2>

      <div className="form-quiz">
        <form onSubmit={handleSubmit}>
          {dataQuestion.map((item, index) => (
            <div
              style={{ marginBottom: "20px" }}
              className="form-quiz_item"
              key={index}
            >
              <p>
                Câu {index + 1}: {item.question}
              </p>
              {item.answers.map((itemAns, indexAns) => (
                <div className="form-quiz_answers" key={indexAns}>
                  <input
                    style={{ marginBottom: "7px" }}
                    type="radio"
                    name={item.id}
                    value={indexAns}
                    id={`quiz-${item.id}-${indexAns}`}
                  />
                  <label
                    style={{ display: "inline", color: "black" }}
                    htmlFor={`quiz-${item.id}-${indexAns}`}
                  >
                    {itemAns}
                  </label>
                </div>
              ))}
            </div>
          ))}

          {/* Sau khi nộp bài xong => sang trang kết quả  */}
          <button type="submit">Nộp bài</button>
        </form>
      </div>
    </>
  );
}

export default Quiz;
