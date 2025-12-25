import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export const reducerFactory = (
  actionName: string,
  actionTypes: {
    REQUEST: string;
    SUCCESS: string;
    FAILED: string;
    RESET: string;
    STORE: string;
  },
) => {
  return createSlice({
    name: actionName,
    initialState: {
      loading: false,
      data: null as [] | null,
      error: null as string | null,
    },
    reducers: {
      [actionTypes.REQUEST]: (state) => {
        state.loading = true;
        state.error = null;
      },
      [actionTypes.SUCCESS]: (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      [actionTypes.FAILED]: (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.data = action.payload;
      },
      [actionTypes.RESET]: (state) => {
        state.loading = false;
        state.error = null;
        state.data = [];
      },
      [actionTypes.STORE]: (state, action: PayloadAction<any>) => {
        state.data = action.payload;
      },
    },
  });
};


import { reducerFactory } from "../../../utils/reducerFactory";
import { configsAction } from "./action";


const configsSlice = reducerFactory("configs", configsAction);

// Exporting Actions 
export const commonAction = {
    ...configsSlice.actions,
}

// Exporting Reducer
export const commonReducer = {
    configs: configsSlice.reducer,
}


export const {
    CONFIGS_REQUEST,
    CONFIGS_RESET
} = commonAction;
