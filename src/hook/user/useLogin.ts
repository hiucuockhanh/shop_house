import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
import { createNewUser, loginUser } from "../../service/urls";

const login = async (params: {email: string; password: string}) => {
  const url = loginUser;
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(params),
  });
  console.log('Params: ', params);
  console.log(JSON.stringify(result));
  return result;
};

const newAccount = async (params: {
  name: string;
  email: string;
  password: string;
  avatar: string;
}) => {
  const url = createNewUser;
  const result = await axios.create({
    url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: params,
  });
  console.log('Sign up: ', JSON.stringify(params));
  return result;
};

const useCreateAccount = (onCreateSuccess: () => void) => {
  const {mutateAsync, isLoading, isError, isSuccess, data} = useMutation(
    ['authentication', 'register', 'customer'],
    {
      mutationFn: newAccount,
      onError: () => {
        console.log('Login fail!!!');
      },
      onSuccess: () => {
        console.log('Login success');
        onCreateSuccess();
      },
      retry: false,
    },
  );
  return {
    mutateAsync,
    isLoading,
    isError,
    isSuccess,
    data,
  };
};

const useCustomerLogin = (onLoginSuccess: () => void) => {
  const {mutate, isLoading, isError, isSuccess, data} = useMutation(
    ['authentication', 'login', 'customer'],
    {
      mutationFn: login,
      onError: () => {
        console.log('Login fail!!!');
      },
      onSuccess: () => {
        console.log('Login success');
        onLoginSuccess();
      },
      retry: false,
    },
  );

  return {
    mutate,
    isLoading,
    isError,
    isSuccess,
    data,
  };
};

export {login, useCustomerLogin, useCreateAccount};
