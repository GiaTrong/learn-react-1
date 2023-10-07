import { combineReducers } from "redux";
import loginReducer from "./loginReducer"

// tra ra 2 cai object: bao gom tat ca nhung HAM trong REDUCERS
// gui no len store
const allReducers = combineReducers({
  loginReducer,
  // them nhieu reducer o dau
});

export default allReducers;
