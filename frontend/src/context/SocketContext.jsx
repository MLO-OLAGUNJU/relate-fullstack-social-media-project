import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import io from "socket.io-client";
import userAtom from "../atoms/userAtom";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const socketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      query: { userId: currentUser?._id },
    });

    setSocket(socket);

    return () => socket && socket.close();
  }, [currentUser?._id]);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
