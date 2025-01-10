import React from "react";

const TopNavBar = () => {
  return (
    <div className="top-nav">
      <div className="file-info">
        <span className="file-name">Whiteboard</span>
      </div>
      <div className="nav-actions">
        <button className="share-btn">Share</button>
        <div className="user-avatar">U</div>
      </div>
    </div>
  );
};

export default TopNavBar;
