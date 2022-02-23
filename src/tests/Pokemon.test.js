import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>), history,
    });
  };

  const pokemonNames = pokemons.map((pokemon) => pokemon.name);
  const pokemonTypes = pokemons.map((pokemon) => pokemon.type);
  const pokemonWeight = pokemons.map((pokemon) => pokemon.averageWeight);
  const pokemonImage = pokemons.map((pokemon) => pokemon.image);
  const pokemonId = pokemons.map((pokemon) => pokemon.id);

  describe('Teste se é renderizado um card com as informações do pokémon.', () => {
    it('O nome correto do Pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const pokemon = screen.getByText(pokemonNames[0]);

      expect(pokemon).toBeDefined();
    });

    it('O tipo correto do pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const pokemon = screen.getByTestId('pokemon-type');

      expect(pokemon).toBeDefined();
      // ref: https://github.com/testing-library/jest-dom#tohavetextcontent
      expect(pokemon).toHaveTextContent(pokemonTypes[0]);
    });

    it('O peso médio do pokémon deve ser exibido corretamente', () => {
      renderWithRouter(<App />);
      const { value, measurementUnit } = pokemonWeight[0];

      const pokemon = screen.getByText(`Average weight: ${value} ${measurementUnit}`);

      expect(pokemon).toBeDefined();
    });

    it('A imagem do Pokémon deve ser exibida', () => {
      renderWithRouter(<App />);
      const pokemon = screen.getByRole('img', { name: `${pokemonNames[0]} sprite` });

      expect(pokemon).toBeDefined();
      expect(pokemon.src).toBe(pokemonImage[0]);
    });
  });

  describe('Teste os Links no card do Pokemon', () => {
    it('Teste se o Pokémon indicado contém um link para exibir detalhes', () => {
      renderWithRouter(<App />);
      const linkDetails = screen.getByRole('link', { name: /more details/i });

      expect(linkDetails.href).toBe(`http://localhost/pokemons/${pokemonId[0]}`);
    });

    it('Teste se clicar nos detalhes do Pokémon, vai para os detalhes dele', () => {
      renderWithRouter(<App />);
      const linkDetails = screen.getByRole('link', { name: /more details/i });
      userEvent.click(linkDetails);

      const titleDetails = screen.getByRole('heading', { name: /pikachu details/i });
      expect(titleDetails).toBeDefined();
    });

    it('Teste se a URL exibida no navegador muda para /pokemon/<id>', () => {
      const { history } = renderWithRouter(<App />);
      const linkDetails = screen.getByRole('link', { name: /more details/i });
      userEvent.click(linkDetails);

      const { location: { pathname } } = history;
      expect(pathname).toBe(`/pokemons/${pokemonId[0]}`);
    });
  });

  describe('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    it('O ícone deve ser uma imagem contendo o caminho /star-icon.svg', () => {
      renderWithRouter(<App />);

      const linkDetails = screen.getByRole('link', { name: /more details/i });
      userEvent.click(linkDetails);

      const checkFavorite = screen
        .getByRole('checkbox', { name: /pokémon favoritado\?/i });
      userEvent.click(checkFavorite);

      const returnHome = screen.getByRole('link', { name: /home/i });
      userEvent.click(returnHome);

      const starIcon = screen.getByAltText(/pikachu is marked as favorite/i);

      expect(starIcon.src).toBe('http://localhost/star-icon.svg');
    });
    it('A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite', () => {
      renderWithRouter(<App />);

      const starIcon = screen.getByAltText(/pikachu is marked as favorite/i);

      expect(starIcon.alt).toBe(`${pokemonNames[0]} is marked as favorite`);
    });
  });
});
