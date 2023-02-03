import axios from "axios"
const GITHUB_API_LINK = process.env.REACT_APP_GITHUB_API_LINK;

const github = axios({
    baseURL: GITHUB_API_LINK
})

// Get user search results
export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q: text
    });
    const response = await fetch(`${GITHUB_API_LINK}/search/users?${params}`);
    const {items} = await response.json();
    return items;
}


// get a single user
export const getUser = async (user) => {
    const response = await fetch(`${GITHUB_API_LINK}/users/${user}`);
    if(response.status === "404"){
        window.location = "/notfound"
    }else{
        const data = await response.json()
        return data
    }
}


// get the users repositories
export const getUserRepos = async (user) => {
    const params = new URLSearchParams({
        sort: "created",
        per_page: 10
    })
    const response = await fetch(`${GITHUB_API_LINK}/users/${user}/repos?${params}`)
    if(response.status === "404"){
        window.location = "/notfound"
    }else{
        const data = await response.json();
        return data;
    }
}