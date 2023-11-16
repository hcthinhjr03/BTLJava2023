import { combineReducers } from "redux";
import authenReducer from "./authentication";
import cartReducer from "./Cart";

const allReducers = combineReducers({
  authenReducer, cartReducer
  // Thêm nhiều reducer ở đây
});

export default allReducers;
