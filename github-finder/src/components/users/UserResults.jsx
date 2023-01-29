import {useEffect, useState} from "react";

function UserResults() {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async ()=> {
        const response = await fetch(`${process.env.REACT_APP_GITHUB_API_LINK}/users`);
        const data = await response.json()
        console.log(data)
        setUsers(data)
        setIsLoading(false)
    }
  if(isLoading){
    return(
        <h1>Loading...</h1>
    )
  }else{
    return (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
            {users.map((user)=> {
                return(<h3>{user.login}</h3>)
        })}
        </div>
      )
  }
};

export default UserResults;