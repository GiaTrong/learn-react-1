import { get, post } from "../untils/request";

// GET
export const login = async (email, pass) => {
  // check api ?phanTu
  const resultLogin = await get(
    `users?email=${email}&password=${pass}`); 
  return resultLogin;
};

// POST
export const register = async (options) => {
  const resultRegister = await post(`users`, options);
  return resultRegister;
};

// CHECK
export const checkExits = async (key, value) => {
  const checkExits = await get(`users?${key}=${value}`);
  return checkExits;
};
