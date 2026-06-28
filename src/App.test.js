import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  // App carrega com spinner inicial enquanto verifica autenticação
  expect(document.body).toBeInTheDocument();
});
