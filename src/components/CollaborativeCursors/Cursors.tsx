import React from 'react';
import { useCollaboration } from '../../hooks/useCollaboration';

export const Cursors = () => {
  const { cursors } = useCollaboration();
  
  return (
    <>
      {cursors.map(cursor => (
        <div 
          key={cursor.userId}
          className="cursor"
          style={{
            transform: `translate(${cursor.x}px, ${cursor.y}px)`,
            backgroundColor: cursor.color
          }}
        />
      ))}
    </>
  );
};
