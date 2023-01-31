import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_API_LINK = process.env.REACT_APP_GITHUB_API_LINK;

export const GithubProvider = ({children}) => {
    const intialState = {
        users: [],
        user: {},
        isLoading: false
    }

    const [state, dispatch] = useReducer(githubReducer, intialState)


    // Get search results 
    const searchUsers = async (text) =>{
        setIsLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_API_LINK}/search/users?${params}`)
        const {items} = await response.json()
        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }

    // Get a single user
    const getUser = async (text) =>{
        setIsLoading()
        const response = await fetch(`${GITHUB_API_LINK}/users/${text}`)
        if(response.status == "404"){
            window.location = "/notfound"
        }else{
            const data = await response.json()
        
            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        }
    }

    const setIsLoading = () => dispatch({type: "SET_LOADING"})

    const clearUsers = () => {
        dispatch({type: "CLEAR_SEARCH_RESULTS"})

    }

    return(
        <GithubContext.Provider value={{
            users: state.users, 
            isLoading: state.isLoading,
            user: state.user,
            searchUsers,
            clearUsers,
            getUser}}>
            {children}
        </GithubContext.Provider>
    )
};

export default GithubContext;