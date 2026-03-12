// file to create the handler for the checking the presence of a user

// importing the required modules
import { pubClient } from "../../../infrastructure/redis/redis";

// for adding the user to the redis for online indicator
export const addUserSocket = async (userId: string, socketId: string) => {
  await pubClient.sAdd(`online:${userId}`, socketId);
};

// for removing the user from the redis for offline indicator
export const removeUserSocket = async (userId: string, socketId: string) => {
  await pubClient.sRem(`online:${userId}`, socketId);

  const count = await pubClient.sCard(`online:${userId}`);

  if (count === 0) {
    await pubClient.del(`online:${userId}`);
  }
};

// to check the uer is online or not
export const isUserOnline = async (userId: string) => {
  const count = await pubClient.sCard(`online:${userId}`);

  return count > 0;
};
