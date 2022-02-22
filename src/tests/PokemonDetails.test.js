import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>), history,
    });
  };

  beforeEach(() => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
  });

  describe('Teste se as informações do Pokémon selecionado são mostradas na tela', () => {
    it('A página deve conter um texto <name> Details', () => {
      const title = screen.getByRole('heading', {
        name: /pikachu details/i,
      });

      expect(title).toBeDefined();
    });

    it('Não deve existir o link de navegação para os detalhes', () => {
      const moreDetails = screen.queryByRole('link', { name: /more details/i });

      // ref: https://stackoverflow.com/questions/52783144/how-do-you-test-for-the-non-existence-of-an-element-using-jest-and-react-testing
      expect(moreDetails).toBeNull();
    });

    it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
      const sumary = screen.getByRole('heading', {
        name: /summary/i,
      });

      expect(sumary).toBeDefined();
    });

    it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon', () => {
      const details = screen.getByText(
        /this intelligent pokémon roasts hard berries with electricity/i,
      );

      expect(details).toBeDefined();
    });
  });

  describe('Teste se existe na página uma seção com os mapas com as localizações', () => {
    it('Na seção de detalhes deverá existir um heading h2', () => {
      const details = screen.getByRole('heading', {
        name: /game locations of pikachu/i,
      });

      expect(details).toBeDefined();
    });

    it('Todas as localizações do Pokémon devem ser mostradas', () => {
      const locales = screen.getAllByRole('img', { name: /pikachu location/i });

      expect(locales).toHaveLength(2);
    });

    it('Devem ser exibidos, o nome da localização e uma imagem do mapa', () => {
      const locales = screen.getAllByRole('img', { name: /pikachu location/i });
      const descriptionLocale1 = screen.getByText(/kanto viridian forest/i);
      const descriptionLocale2 = screen.getByText(/kanto power plant/i);

      expect(descriptionLocale1 && descriptionLocale2).toBeDefined();
      expect(locales).toHaveLength(2);
    });

    it('A imagem da localização deve ter um atributo src com a URL do local', () => {
      const locales = screen.getAllByRole('img', { name: /pikachu location/i });
      const urlLocale1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
      const urlLocale2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

      expect(locales[0].src).toBe(urlLocale1);
      expect(locales[1].src).toBe(urlLocale2);
    });

    it('A imagem da localização deve ter um atributo alt <name> location', () => {
      const locales = screen.getAllByRole('img', { name: /pikachu location/i });
      const alt = 'Pikachu location';

      expect(locales[0].alt && locales[1].alt).toBe(alt);
    });
  });

  describe('Teste se o usuário pode favoritar um pokémon pela página de detalhes', () => {
    it('A página deve exibir um checkbox que permite favoritar o Pokémon;', () => {
      const checkFavorites = screen.getByRole('checkbox', {
        name: /pokémon favoritado\?/i,
      });

      expect(checkFavorites).toBeDefined();
    });

    it('Cliques alternados no checkbox devem adicionar e remover dos favoritos', () => {
      const checkFavorites = screen.getByRole('checkbox', {
        name: /pokémon favoritado\?/i,
      });
      userEvent.click(checkFavorites);

      const starIcon = screen.getByAltText(/pikachu is marked as favorite/i);

      expect(starIcon).toBeDefined();

      userEvent.click(checkFavorites);

      expect(starIcon).not.toBeInTheDocument();
    });
  });
});
