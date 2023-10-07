import { get, post } from "../untils/request";

// GET
export const getListTopic = async () => {
  // check api phanTu
  const getListTopic = await get(`topics`);
  return getListTopic;
};

export const getTopic = async (id) => {
  // check api phanTu
  const getListTopic = await get(`topics/${id}`);
  return getListTopic;
};

