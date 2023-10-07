import { get } from "../untils/request";

// GET
export const getListQuestions = async (topicId) => {
  // check api phanTu
  const getListQuestions = await get(`questions?topicId=${topicId}`);
  return getListQuestions;
};

