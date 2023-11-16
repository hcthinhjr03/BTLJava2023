import { del, get, patch, post } from "../utils/request";

export const getAllUser = async () => {
  const result = await get(`users`);
  return result;
}

export const getUser = async (username, password = "") => {
  let pass = "";
  if(password !== "") {
    pass = `&password=${password}`;
  }
  const result = await get(`users?username=${username}${pass}`);
  return result;
}

export const getUserById = async (id) => {
  const result = await get(`users?id=${id}`);
  return result;
}

export const createUser = async (options) => {
  const result = await post(`users`, options);
  return result;
};

export const updateUser = async (id, options) => {
  const result = await patch(`users/${id}`, options);
  return result;
}

export const updateUserLike = async (userId, options) => {
  const result = await patch(`users/${userId}`, options);
  return result;
}

export const updateUserDislike = async (userId, options) => {
  const result = await patch(`users/${userId}`, options);
  return result;
}

export const updateScoreToAward = async (id, options) => {
  const result = await patch(`users/${id}`, options);
  return result;
}

export const deleteUser = async (id) => {
  const result = await del(`users/${id}`);
  return result;
}

export const getCommentsOfUser = async (userId) => {
  const result = await get(`comments?user_id=${userId}`);
  return result;
}

export const getReactionsOfUser = async (userId) => {
  const result = await get(`reaction_articles?user_id=${userId}`);
  return result;
}

export const getVouchersOfUser = async (userId) => {
  const result = await get(`has_vouchers?user_id=${userId}`);
  return result;
}


