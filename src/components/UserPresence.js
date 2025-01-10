import React, { useEffect, useState } from "react";
import { Person } from "@mui/icons-material";
import collaborationService from "../services/collaborationService";

const UserPresence = () => {
  const [users, setUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(false);

  useEffect(() => {
    const handleUsersUpdate = (event) => {
      setUsers(event.detail);
    };

    window.addEventListener("users-updated", handleUsersUpdate);
    return () => window.removeEventListener("users-updated", handleUsersUpdate);
  }, []);

  return (
    <div className="user-presence">
      <button
        className="users-button"
        onClick={() => setShowUserList(!showUserList)}
      >
        <Person />
        <span className="user-count">{users.length}</span>
      </button>

      {showUserList && (
        <div className="users-dropdown">
          <h4>Online Users</h4>
          <div className="users-list">
            {users.map((user) => (
              <div key={user.id} className="user-item">
                <div
                  className="user-avatar"
                  style={{ backgroundColor: user.color }}
                >
                  {user.name.charAt(0)}
                </div>
                <span className="user-name">{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPresence;
