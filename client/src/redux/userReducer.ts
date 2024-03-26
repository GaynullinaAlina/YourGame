import { AnyAction } from "@reduxjs/toolkit";
import { User } from "../types";

 export const initialState: User = {
    userId: 0,
    username: '',
    email:'',
};

//! {type: "ADD_ALL_TASKS", payload: [{}, {}, {}]} - action

const userReducer = (state: User = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case 'AUTH':
      return payload;

    case 'LOG_OUT': 
      return initialState;

    default:
      return state;
  }
};

export default userReducer;