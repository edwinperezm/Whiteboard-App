import React from "react";
import { observer } from "mobx-react-lite";
import { UserPresence } from "./UserPresence";
import { useCollaboration } from "../../hooks/useCollaboration";

export const CollaborationPanel: React.FC = observer(() => {
  const { users } = useCollaboration();

  return (
    <div className="collaboration-panel">
      <h3>Collaborators ({users.length})</h3>
      <UserPresence />
      <div className="collaboration-actions">
        <button className="share-button">Share Board</button>
      </div>
    </div>
  );
});
