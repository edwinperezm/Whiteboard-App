import React from 'react';
import { UserPresence } from '../Collaboration/UserPresence';

export const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="logo">Whiteboard</div>
      <div className="actions">
        <button className="share-btn">Share</button>
        <UserPresence />
      </div>
    </div>
  );
};
