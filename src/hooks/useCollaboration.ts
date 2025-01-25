import { useState, useEffect } from "react";
import SocketService from "../services/SocketService";
import { User } from "../core/types";

export const useCollaboration = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    SocketService.connect();
    SocketService.socket.on("user-joined", (user: User) => {
      setUsers((prev) => [...prev, user]);
    });

    return () => {
      SocketService.socket.off("user-joined");
    };
  }, []);

  return { users };
};
