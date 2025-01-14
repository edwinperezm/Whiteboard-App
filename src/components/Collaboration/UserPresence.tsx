import React from 'react';
import { useCollaboration } from '../../hooks/useCollaboration';

export const UserPresence = () => {
  const { users } = useCollaboration();
  
  return (
    <div className="user-presence">
      {users.map(user => (
        <div key={user.id} className="user-avatar" style={{backgroundColor: user.color}}>
          {user.name[0]}
        </div>
      ))}
    </div>
  );
};
