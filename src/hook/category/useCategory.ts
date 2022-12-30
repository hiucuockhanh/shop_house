import axios from 'axios/index';
import {getCategory, getProductByIdCategory} from '../../service/urls';
import {useQuery} from '@tanstack/react-query';

const getCategories = async () => {
  const response = await axios.get(getCategory);
  return response.data;
};

const getProductByCategory = async (categoryId: number) => {
  const response = await axios.get(getProductByIdCategory(categoryId));
  return response.data;
};

const useCategories = () => {
  const {isLoading, data} = useQuery(['categories'], getCategories, {
    retry: 3,
  });
  return {isLoading, data};
};

//TODO Get by Category Id
const useProductByCategory = (categoryId: number) => {
  const {isLoading, data} = useQuery(
    ['product-category'],
    () => getProductByCategory(categoryId),
    {
      retry: 3,
    },
  );
  return {isLoading, data};
};

export {useCategories, useProductByCategory};
