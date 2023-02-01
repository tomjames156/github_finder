import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import GithubContext from "../../context/github/GithubContext";

function UserItem({ user: { login, avatar_url} }) {
    const {user, getUser} = useContext(GithubContext);
  return (
    <div className="card shadow-md compact side bg-base-100">
        <div className="flex-row items-center space-x-4 card-body">
            <div>
                <div className="avatar">
                    <div className="rounded-full shadow w-14 h-14">
                        <img src={avatar_url} alt="profile_image"/>
                    </div>
                </div>
            </div>
            <div>
                <div className="card-title">{login}</div>
                <Link className="text-base-content text-opacity-40" to={`/user/${login}`}>Visit Profile</Link>
            </div>
        </div>
    </div>
  )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired
}

export default UserItem