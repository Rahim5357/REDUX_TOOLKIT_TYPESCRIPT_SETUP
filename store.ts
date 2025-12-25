import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducers from "../store/rootReducers";
import rootSaga from "../store/rootSaga";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login", "configs"], // only persist the auth slice
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
// Define the RootState type for your entire Redux store
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;


import { combineReducers } from "redux";
import { authReducer } from "./slice/auth/authSlice";

const rootReducers = combineReducers({
  ...authReducer,
});
export default rootReducers;



import { all } from "redux-saga/effects";
import registrationSaga from "./slice/auth/saga";
export default function* rootSaga() {
  yield all([
    registrationSaga(),
  ]);
}


