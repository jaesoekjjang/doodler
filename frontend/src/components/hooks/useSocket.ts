import { SocketContext } from './../SocketProvider';
import { useContext } from 'react';

export const useSocket = () => {
  return useContext(SocketContext);
};