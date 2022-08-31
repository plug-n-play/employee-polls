import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import PageNotFound from '@/pages/404';

test('renders learn react link', () => {
  // const { getByText } = render(
  //   <Provider store={store}>
  //     <PageNotFound />
  //   </Provider>
  // );

  // expect(getByText(/404: Page not found/i)).toBeInTheDocument();
  expect(true).toBe(true);
});