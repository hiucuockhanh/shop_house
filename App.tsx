import React from 'react';
import Root from './src/app';
import {QueryClientProvider} from '@tanstack/react-query';
import {QueryClient} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Root />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
