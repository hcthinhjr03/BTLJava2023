import { del, get, patch, post } from "../utils/request"

export const getProductList = async () => {
    const result = await get("products");
    return result;
}

export const getProductListByCategory = async (category) => {
  const result = await get(`products?category=${category}`);
  return result;
}

export const getHasVoucher = async (userId) => {
  const result = await get(`has_vouchers?user_id=${userId}`);
  return result;
}

export const getHasVoucherWithVoucher = async (userId, voucherId) => {
  const result = await get(`has_vouchers?user_id=${userId}&voucher_id=${voucherId}`);
  return result;
}

export const createHasVoucher = async (options) => {
  const result = await post(`has_vouchers`, options);
  return result;
}

export const getVoucherById = async (id) => {
  const result = await get(`vouchers?id=${id}`);
  return result;
}

export const getVoucher = async () => {
  const result = await get(`vouchers`);
  return result;
}

export const createProduct = async (options) => {
  const result = await post(`products`, options);
  return result;
}

export const deleteProduct = async (id) => {
  const result = await del(`products/${id}`);
  return result;
}

export const updateProduct = async (id, options) => {
  const result = await patch(`products/${id}`, options);
  return result;
}

export const deleteHasVoucher = async (id) => {
  const result = await del(`has_vouchers/${id}`);
  return result;
}