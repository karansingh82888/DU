import {
    AnyAction,
    combineReducers,
    configureStore,
    ThunkAction,
    ThunkDispatch
  } from '@reduxjs/toolkit';
  import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
  
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    PURGE,
    REGISTER,
    REHYDRATE
  } from 'redux-persist';
  import authReducer from './Auth'
  import dashboardReducer from './Dashboard'

  const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    timeout: undefined,
    whitelist: ['authReducer']
  };
  
  const reducerList = {
    authReducer,
    dashboardReducer
  };
  const rootReducer = combineReducers(reducerList);
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  /* Types */
  export type AppDispatch = typeof store.dispatch;
  export type ReduxState = ReturnType<typeof rootReducer>;
  export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
  export type TypedThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    ReduxState,
    unknown,
    AnyAction
  >;
  export const useTypedDispatch = () => useDispatch<TypedDispatch>();
  export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;
  