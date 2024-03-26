import { AnyAction } from "@reduxjs/toolkit";
import { ITheme } from "../types";

interface ThemesState {
  themes: ITheme[];
}

const initialState: ThemesState = {
  themes: [],
};

//! {type: "ADD_ALL_TASKS", payload: [{}, {}, {}]} - action

const questionReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case "INIT_THEMES":
      return { ...state, themes: payload };

    default:
      return state;
  }
};

export default questionReducer;
