import axios from "axios"
const GITHUB_API_LINK = process.env.REACT_APP_GITHUB_API_LINK;

const github = axios.create({
    baseURL: GITHUB_API_LINK
})

// Get user search results
export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q: text
    });
    const response = await github.get(`/search/users?${params}`)
    return response.data.items;
}


// get a single user
export const getUserAndRepos = async(username) => {
    const params = new URLSearchParams({
        sort: "created",
        per_page: 10
    })
    const [user, repos] = await Promise.all([
        github.get(`/users/${username}`),
        github.get(`/users/${username}/repos?${params}`)
    ])
    return {user: user.data, repos: repos.data}
}