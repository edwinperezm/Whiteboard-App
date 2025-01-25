import React from "react";
import { observer } from "mobx-react-lite";
import { useCollaboration } from "../../hooks/useCollaboration";
import { User } from "../../core/types";

interface CursorProps {
  user: User;
}

const Cursor: React.FC<CursorProps> = ({ user }) => (
  <div
    className="remote-cursor"
    style={{
      transform: `translate(${user.cursor?.x ?? 0}px, ${user.cursor?.y ?? 0}px)`,
      backgroundColor: user.color,
    }}
  >
    <div className="cursor-name">{user.name}</div>
  </div>
);

export const CollaborativeCursors: React.FC = observer(() => {
  const { users } = useCollaboration();

  return (
    <div className="collaborative-cursors">
      {users.map((user) => user.cursor && <Cursor key={user.id} user={user} />)}
    </div>
  );
});
