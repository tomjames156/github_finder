const githubReducer = (state, action) => {
    switch(action.type){
        case 'GET_USERS':
            return {...state, 
                users: action.payload,
                isLoading: false
            }     
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: true,
            } 
        case 'CLEAR':
            return{
                ...state,
                users: []
            }      
        default:
            return action;
    }
}

export default githubReducer;