import React from "react";
import { observer } from "mobx-react-lite";
import { FileMenu } from "../FileManagement/FileMenu";
import { UserPresence } from "../Collaboration/UserPresence";
import { ActionBar } from "../ToolBar/ActionBar";

export const TopBar: React.FC = observer(() => {
  return (
    <div className="top-bar">
      <div className="left-section">
        <div className="logo">Whiteboard</div>
        <FileMenu />
      </div>
      <ActionBar />
      <div className="right-section">
        <UserPresence />
      </div>
    </div>
  );
});
