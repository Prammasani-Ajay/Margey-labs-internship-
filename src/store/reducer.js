const initialState = {
    user:null,
    loading: false,
    error: null,
    users: [],
    candidates :[],
    schedules:[]
};

// Reducer function to handle user actions
export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_USERS_REQUEST':
        case 'POST_USER_REQUEST':
        case 'PUT_USER_REQUEST':
        case 'DELETE_USER_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                loading: false,
                users: action.payload,
            };
        case 'POST_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                users: [...state.users, action.payload],
            };
        case 'PUT_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                users: state.users.map(user => 
                    user.id === action.payload.id ? action.payload : user
                ),
            };
        case 'DELETE_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                users: state.users.filter(user => user.id !== action.payload.id),
            };
        case 'API_CALL_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'FETCH_USERS_SUCCESS':
            return {
                ...state,
                loading: false,
                users: action.payload,
            };
        case 'LOGIN_SUCCESS':
            return {  
                ...state,  
                loading: false,  
                user: action.payload.userObj, // Unconditionally overwrite state.user with the new user  
            }; 
        
        default:
            return state;
    }
}



