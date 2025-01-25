import React from "react";
import { observer } from "mobx-react-lite";
import { useCollaboration } from "../../hooks/useCollaboration";
import { User } from "../../core/types";

export const UserPresence: React.FC = observer(() => {
  const { users } = useCollaboration();

  return (
    <div className="user-presence">
      {users.map((user: User) => (
        <div
          key={user.id}
          className="user-avatar"
          style={{ backgroundColor: user.color }}
          title={user.name}
        >
          {user.name[0].toUpperCase()}
        </div>
      ))}
    </div>
  );
});
