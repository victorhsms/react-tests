import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>), history,
    });
  };

  describe('Teste se o topo da aplicação contém links de navegação.', () => {
    it('Teste se o primeiro link possui o texto "Home"', () => {
      renderWithRouter(<App />);

      const linkHome = screen.getByRole('link', { name: /home/i });
      expect(linkHome).toBeInTheDocument();
    });

    it('Teste se o segundo link possui o texto "About"', () => {
      renderWithRouter(<App />);

      const linkAbout = screen.getByRole('link', { name: /about/i });
      expect(linkAbout).toBeInTheDocument();
    });

    it('Teste se o terceiro link possui o texto "Favorite Pokémons"', () => {
      renderWithRouter(<App />);

      const linkFav = screen.getByRole('link', { name: /favorite pokémons/i });
      expect(linkFav).toBeInTheDocument();
    });
  });

  describe('Teste se, ao clicar em um link, a aplicação é redirecionada', () => {
    it('Redirecionada para "/" ao clicar no link "Home"', () => {
      const { history } = renderWithRouter(<App />);
      const linkHome = screen.getByRole('link', { name: /home/i });

      userEvent.click(linkHome);

      const { location: { pathname } } = history;
      expect(pathname).toBe('/');
    });

    it('Redirecionada para "/about" ao clicar no link "About"', () => {
      const { history } = renderWithRouter(<App />);
      const linkAbout = screen.getByRole('link', { name: /about/i });

      userEvent.click(linkAbout);

      const { location: { pathname } } = history;
      expect(pathname).toBe('/about');
    });

    it('Redirecionada para "/favorites" ao clicar no link "Pokémons Favoritados"', () => {
      const { history } = renderWithRouter(<App />);
      const linkFav = screen.getByRole('link', { name: /favorite pokémons/i });

      userEvent.click(linkFav);

      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });

    it('Redirecionada para "NotFound" ao inserir URL incorreta', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/trybe');

      const notFound = screen.getByRole('heading', { name: /not found/i, level: 2 });
      expect(notFound).toBeInTheDocument();
    });
  });
});
