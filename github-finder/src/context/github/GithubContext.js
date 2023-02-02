import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_API_LINK = process.env.REACT_APP_GITHUB_API_LINK;

export const GithubProvider = ({children}) => {
    const intialState = {
        users: [],
        user: {},
        repos: [],
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
    const getUser = async (user) =>{
        setIsLoading()
        const response = await fetch(`${GITHUB_API_LINK}/users/${user}`)
        if(response.status === "404"){
            window.location = "/notfound"
        }else{
            const data = await response.json()
        
            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        }
    }

    // Get user repos
    const getUserRepos = async (user) => {
        setIsLoading();
        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        });

        const response = await fetch(`${GITHUB_API_LINK}/users/${user}/repos?${params}`);
        if(response.status === "404"){
            window.location = "/notfound"
        }else{
            const repos = await response.json()

            dispatch({
                type: "GET_REPOS",
                payload: repos
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
            repos: state.repos,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos}}>
            {children}
        </GithubContext.Provider>
    )
};

export default GithubContext;