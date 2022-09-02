import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '@/app/store';
import PageNotFound from '@/pages/404';

test('renders 404 Page', () => {
  const store = makeStore();
  const { getByText } = render(
    <Provider store={store}>
      <PageNotFound />
    </Provider>
  );

  expect(getByText(/404: Page not found/i)).toBeInTheDocument();
  expect(render).toMatchSnapshot();
});