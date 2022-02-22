import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>), history,
    });
  };

  it('Teste o que é exibido na tela se a pessoa não tiver pokémons favoritos', () => {
    renderWithRouter(<App />);
    const linkFav = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(linkFav);

    const notFavs = screen.getByText(/no favorite pokemon found/i);

    expect(notFavs).toBeDefined();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const checkFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkFavorite);

    const linkFav = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFav);

    const pokemon = screen.getByText(/pikachu/i);
    expect(pokemon).toBeDefined();
  });
});
