import { applyMiddleware, createStore } from 'redux';

// Correct import  
import { thunk } from 'redux-thunk';  
import { appReducer } from './reducer';

// Create the Redux store with thunk middleware
const store = createStore(
    appReducer,
    applyMiddleware(thunk)
);

// Export the store
export default store;




