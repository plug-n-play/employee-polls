import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '@/app/store';
import Login from '@/pages/login';

test('renders login page', async () => {
  const store = makeStore();
  const { getByText, getByTestId } = render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  expect(getByText(/Login/i)).toBeInTheDocument();
  expect(render).toMatchSnapshot();

  const usernameEl = getByTestId("username").querySelector('input');
  const passwordEl = getByTestId("password").querySelector('input');

  fireEvent.change(usernameEl, { target: { value: 'tylermcginnis' } });
  fireEvent.change(passwordEl, { target: { value: 'xxxxxxxxxx' } });

  const submitButton = document.querySelector('button');
  fireEvent.click(submitButton);
  expect(getByText(/Login/i)).toBeInTheDocument();
});