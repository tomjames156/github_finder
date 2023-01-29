import {useEffect} from "react";

function UserResults() {
    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async ()=> {
        const response = await fetch(`${process.env.REACT_APP_GITHUB_API_LINK}/users`, {
            headers: {
                Authorization: `token github_${process.env.REACT_APP_TOKEN}`
            }
        });
        const data = await response.json()
        console.log(data)
    }
  return (
    <div>user results</div>
  )
};

export default UserResults;