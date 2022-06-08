import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store';
import TopMenu from './components/TopMenu';

test('renders learn react link', async () => {
  render(<Provider store={store}><TopMenu /></Provider>);
  const linkElement = await screen.findByRole('button', {name: "Login"})
  expect(linkElement).toBeInTheDocument();
});
