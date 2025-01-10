import React, { useEffect, useState } from "react";
import collaborationService from "../services/collaborationService";
import "../styles/cursor.css";

const CollaborativeCursors = () => {
  const [cursors, setCursors] = useState([]);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setCursors(collaborationService.getCursors());
    }, 50); // Update cursors 20 times per second

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <>
      {cursors.map((cursor) => (
        <div
          key={cursor.userId}
          className="remote-cursor"
          style={{
            transform: `translate(${cursor.x}px, ${cursor.y}px)`,
            color: cursor.color,
          }}
        >
          <div className="cursor-dot" />
          <span className="cursor-label">
            {cursor.user?.name || "Anonymous"}
          </span>
        </div>
      ))}
    </>
  );
};

export default CollaborativeCursors;
