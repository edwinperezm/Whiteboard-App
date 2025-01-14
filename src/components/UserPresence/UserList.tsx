import React from 'react';
import { useCollaboration } from '../../hooks/useCollaboration';

export const UserList = () => {
  const { users } = useCollaboration();

  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id} className="user-item">
          <div 
            className="user-avatar"
            style={{ backgroundColor: user.color }}
          >
            {user.name[0]}
          </div>
          <span className="user-name">{user.name}</span>
        </div>
      ))}
    </div>
  );
};
