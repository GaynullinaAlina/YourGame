import { AnyAction } from "@reduxjs/toolkit";
import { GameType } from "../types";

const initialState: GameType = {
  id: 0,
  createdAt: '',
  balance: 0,
  replies: [],
  isActive: false,
};

//! {type: "ADD_ALL_TASKS", payload: [{}, {}, {}]} - action

const gameReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case 'CREATE_GAME':
      return {...state, ...payload};

    case 'CHANGE_BALANCE': 
      return { ...state, balance: payload}

    case 'ADD_REPLY':
      return { ...state, replies: [...state.replies, payload]}
    
    case 'CHANGE_STATUS':
      return { ...state, isActive: payload}

    case 'END_GAME':
      return initialState

    default:
      return state;
  }
};

export default gameReducer;