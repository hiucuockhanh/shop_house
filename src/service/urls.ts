export const getAllUser = 'https://api.escuelajs.co/api/v1/users';
export const createNewUser = 'https://api.escuelajs.co/api/v1/users/';
export const loginUser = 'https://api.escuelajs.co/api/v1/auth/login';
export const getAllProduct = 'https://api.escuelajs.co/api/v1/products';
export const getCategory = 'https://api.escuelajs.co/api/v1/categories';
export const getProductByIdCategory = (categoryId: number) =>
  `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`;
export const getProductById = (productId: number) =>
  `https://api.escuelajs.co/api/v1/products/${productId}`;
