import { configureStore, combineReducers  } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import { persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({
   user : userReducer,
});
//Now we will use this useReducer for creating our persist reducer

const persistConfig = {
  key : 'roo',
  storage,
  version : 1,
};

const persistedReducer = persistReducer( persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware : (getDefaultMiddleware) =>
     getDefaultMiddleware({ serializablecheck :false}),
  
});

export const persistor = persistStore(store);