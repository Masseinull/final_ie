import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import UsersReducer from "./reducers/UsersReducer";

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, UsersReducer);

const store = configureStore({
  reducer: {
    user_r: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;
