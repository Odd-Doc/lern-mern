import {
  FETCH_ALL,
  DELETE,
  UPDATE,
  LIKE,
  CREATE,
} from "../constants/actionTypes.js";
export default (posts = [], action) => {
  //do not need to name it here, we can name it in the combineReducer w/n the index
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return posts.filter((val) => val._id !== action.payload);
    default:
      return posts;
  }
};
