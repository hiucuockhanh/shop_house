import axios from 'axios';
import {getAllProduct, getProductById} from '../../service/urls';
import {useQuery} from '@tanstack/react-query';

const getProduct = async (productId: number) => {
  const response = await axios.get(getProductById(productId));
  return response.data;
};

const getProducts = async () => {
  const response = await axios.get(getAllProduct);
  return response.data;
};

const useProductById = (productId: number) => {
  const {isLoading, data} = useQuery(
    ['product_id'],
    () => getProduct(productId),
    {
      retry: 3,
    },
  );
  return {isLoading, data};
};

const useProducts = () => {
  const {isLoading, data} = useQuery(['product_list'], getProducts, {
    retry: 2,
  });
  return {isLoading, data};
};

export {useProductById, useProducts};
