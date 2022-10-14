import { useContext} from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

function UserResults() {
  const {users, isLoading} = useContext(GithubContext);

  if(!isLoading){
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => {return <UserItem key={user.id} user={user}/>})}
      </div>
    )
  }else{
    return (<Spinner/>)
  }
}

export default UserResults;
// Links should be used for internal navigation and anchors for external
// dont try to console.log a promise data