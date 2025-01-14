import { useState, useEffect } from 'react';
import SocketService from '../services/SocketService';

export const useCollaboration = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    SocketService.connect();
    SocketService.socket.on('user-joined', user => {
      setUsers(prev => [...prev, user]);
    });
    
    return () => {
      SocketService.socket.off('user-joined');
    };
  }, []);

  return { users };
};
