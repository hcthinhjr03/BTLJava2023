import { del, get, patch, post } from "../utils/request"

export const getProductList = async (options) => {
  const result = await post("product/index", options);
  return result;
}
export const getProductListByCategory = async (options) => {
  const result = await post("product/index", options);
  return result;
}
export const createProduct = async (options) => {
  const result = await post(`product/addProduct`, options);
  return result;
}

export const deleteProduct = async (id) => {
  const result = await del(`product/deleteById/${id}`);
  return result;
}

export const updateProduct = async (options) => {
  const result = await patch(`product/editProduct`, options);
  return result;
}
export const getHasVoucher = async (userId) => {
  const result = await get(`product/hasvoucher/getbyuser/${userId}`);
  return result;
}

export const getHasVoucherWithVoucher = async (userId, voucherId) => {
  const result = await get(`has_vouchers?user_id=${userId}&voucher_id=${voucherId}`);
  return result;
}

export const createHasVoucher = async (options) => {
  const result = await post(`product/hasvoucher`, options);
  return result;
}

export const getVoucherById = async (id) => {
  const result = await get(`vouchers?id=${id}`);
  return result;
}

export const getVoucher = async () => {
  const result = await get(`product/voucher/getallvoucher`);
  return result;
}



// export const deleteHasVoucher = async (id) => {
//   const result = await del(`has_vouchers/${id}`);
//   return result;
// }

export const createOrder = async (options) => {
  const result = await post(`product/createOrder`, options);
  return result;
}

export const getAllOrder = async () => {
  const result = await get(`product/getOrderAdmin`);
  return result;
}

export const deleteOrder = async (orderId) => {
  const result = await del(`product/deleteOrderById/${orderId}`);
  return result;
}

export const approveOrder = async (options) => {
  const result = await patch(`product/processOrder`, options);
  return result;
}

export const deleteHasVoucher = async (id) => {
  const result = await del(`product/hasvoucher/deletebyid/${id}`);
  return result;
}