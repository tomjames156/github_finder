const githubReducer = (state, action) => {
    switch(action.type){
        case "GET_USERS":
            return{
                ...state,
                users: action.payload,
                isLoading: false
            }
        case "SET_LOADING":
            return{
                ...state,
                isLoading: true
            }
        case "CLEAR_SEARCH_RESULTS":{
            return{
                ...state,
                users: [],
            }
        }
        case "GET_USER_AND_REPOS":{
            return{
                ...state,
                repos: action.payload.repos,
                user: action.payload.user,
                isLoading: false
            }
        }
        default:
            return state
    }
};

export default githubReducer;