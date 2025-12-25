import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Factory function to create a reusable Redux Toolkit slice
// Accepts a slice name and a set of predefined action types
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
    // Slice name (used internally by Redux Toolkit)
    name: actionName,

    // Initial state shared across all generated reducers
    initialState: {
      loading: false,              // Indicates API request status
      data: null as [] | null,      // Stores API response data
      error: null as string | null, // Stores error message if API fails
    },

    // Reducers mapped dynamically using action type keys
    reducers: {
      // Triggered when API request starts
      [actionTypes.REQUEST]: (state) => {
        state.loading = true;
        state.error = null;
      },

      // Triggered when API request succeeds
      [actionTypes.SUCCESS]: (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },

      // Triggered when API request fails
      [actionTypes.FAILED]: (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.data = action.payload;
      },

      // Resets the reducer state to initial values
      // Commonly used on unmount or logout
      [actionTypes.RESET]: (state) => {
        state.loading = false;
        state.error = null;
        state.data = [];
      },

      // Stores data without affecting loading/error state
      // Useful for local or cached updates
      [actionTypes.STORE]: (state, action: PayloadAction<any>) => {
        state.data = action.payload;
      },
    },
  });
};




// Import reducer factory utility
import { reducerFactory } from "../../../utils/reducerFactory";

// Import action types generated using ActionTypesFactory
import { nameAction } from "./action";

// Create a slice for the "configs" module using the factory
const nameSlice = reducerFactory("configs", nameAction);

// Export all generated actions in a common object
// Makes it easier to reuse across sagas, components, or thunks
export const commonAction = {
  ...nameSlice.actions,
};

// Export reducer in a structured format
// Helpful when combining multiple reducers dynamically
export const commonReducer = {
  name: nameSlice.reducer,
};

// Destructure and export specific actions for direct usage
export const {
  NAME_REQUEST,
  NAME_RESET,
} = commonAction;
