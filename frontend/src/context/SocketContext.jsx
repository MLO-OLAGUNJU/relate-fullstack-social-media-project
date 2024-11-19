import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import io from "socket.io-client";
import userAtom from "../atoms/userAtom";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const socketContextProvider = ({ children }) => {
  const currentUser = useRecoilValue(userAtom);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      query: { userId: currentUser?._id },
    });

    setSocket(socket);

    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => socket && socket.close();
  }, [currentUser?._id]);
  console.log(onlineUsers, "Online users");
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
