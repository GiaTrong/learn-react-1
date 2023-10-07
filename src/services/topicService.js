import { post } from "../untils/request";

// POST
export const createAns = async (options) => {
  const resultRegister = await post(`answers`, options);
  return resultRegister;
};
