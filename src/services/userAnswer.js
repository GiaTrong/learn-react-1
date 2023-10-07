import { get, post } from "../untils/request";
import { getCookie } from "../helpers/cookie";

// GET
export const getAnswerByUserId = async () => {
  // lấy userId từ cookie
  const userId = getCookie("id");
  // check api phanTu
  const getListTopic = await get(`answers?userId=${userId}`);
  return getListTopic;
};

export const getAns = async (id) => {
  // check api phanTu
  const getListTopic = await get(`answers/${id}`);
  return getListTopic;
};