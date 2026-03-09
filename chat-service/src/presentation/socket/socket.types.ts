// file to set the type

// importing the required modules
import { Socket } from "socket.io";

export interface AuthenticatedSocket extends Socket {
  userId?: string;
}
