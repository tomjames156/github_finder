import {createContext, useReducer} from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        isLoading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState);

    // Get initial users {testing}
    const searchUsers = async (text) => {
        const params = new URLSearchParams({
            q: text
        });
        setLoading();
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            }
        });
        const { items } = await response.json();
        dispatch({
            type: 'GET_USERS',
            payload: items
        });
    };

    const setLoading = () => {
        dispatch({
            type: 'SET_LOADING'
        })
    }
    // Clear users from state
    const clearUsers = () => {
        dispatch({
            type: 'CLEAR'
        })
    }

    return (<GithubContext.Provider value={{
        users: state.users,
        isLoading: state.isLoading,
        searchUsers,
        clearUsers,
    }}>
        {children}
    </GithubContext.Provider>)
}

export default GithubContext;