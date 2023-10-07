import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAns } from "../../services/userAnswer";
import { getListQuestions } from "../../services/userQuestion";
import "./Result.css";

function Answer() {
  const params = useParams();
  const [dataResult, setDataResult] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      // lấy được danh sách các câu trả lời của thằng userId ấy
      const dataAns = await getAns(params.id);
      // bên trên chỉ có danh sách câu trả lời thôi
      // phải lấy thêm câu hỏi nữa
      const dataQuestion = await getListQuestions(dataAns.topicId);
      //
      // console.log(dataAns)
      // console.log(dataQuestion)

      // kết hợp 2 thằng trên lại
      let dataAnsAndDataQuestion = [];

      // kết hợp
      for (let i = 0; i < dataQuestion.length; i++) {
        dataAnsAndDataQuestion.push({
          // DẢI HẾT PHẦN TỬ CON
          ...dataQuestion[i],
          // TÌM PHẦN TỬ CON THỎA MÃN ĐIỀU KIỆN 2 CÁI ID BẰNG NHAU
          ...dataAns.answers.find(
            (item) => item.questionId === dataQuestion[i].id
          ),
        });
      }

      //
      setDataResult(dataAnsAndDataQuestion);
      console.log(dataAnsAndDataQuestion);
    };

    fetchApi();
  }, []);

  return (
    <>
      <h1>Kết quả: </h1>
      <div className="result__list">
        {dataResult.map((item, index) => (
          <div className="result__item" key={item.id}>
            {/*  */}
            <div
              style={{ marginBottom: "20px" }}
              className="form-quiz_item"
              key={item.id}
            >
              <p>
                Câu {index + 1}: {item.question}
                {/* kết quả đúng sai sau câu hỏi */}
                {item.correctAnswer === item.answer ? (
                  <>
                    <span
                      style={{ marginLeft: "10px" }}
                      className="result__tag result__tag--true"
                    >
                      Đúng
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      style={{ marginLeft: "10px" }}
                      className="result__tag result__tag--false"
                    >
                      Sai
                    </span>
                  </>
                )}
              </p>

              {/* In ra câu trả lời */}
              {item.answers.map((itemAns, indexAns) => {
                //
                let className = "";
                let checked = false;

                // itemAns chạy từ 0 đến 3, indexAns là số đáp án câu trả lời
                // => nếu mà nó trùng thì bằng  checked = true;
                if (item.answer === indexAns) {
                  className = "result__item--selected";
                  checked = true;
                }

                // item.correctAnswer chạy từ 0 đến 3, indexAns là số đáp án câu trả lời
                // => nếu mà nó trùng thì bằng thêm 1 class nữa
                if (item.correctAnswer === indexAns) {
                  className += " result__item--result";
                }
                //
                return (
                  <div className="result__ans" key={indexAns}>
                    <input
                      style={{ marginBottom: "7px" }}
                      type="radio"
                      checked={checked}
                      disabled
                    />
                    <label style={{ display: "inline" }} className={className}>
                      {itemAns}
                    </label>
                  </div>
                );
              })}
            </div>
            {/*  */}
          </div>
        ))}
      </div>
    </>
  );
}

export default Answer;
