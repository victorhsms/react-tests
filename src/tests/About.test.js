import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  it('Testa se a página contém as informações sobre a Pokedex', () => {
    render(<About />);

    const describe = screen.getByText(
      /this application simulates a pokédex/i,
    );

    expect(describe).toBeDefined();
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const titlePokedex = screen.getByRole('heading', { name: /about pokédex/i });

    expect(titlePokedex).toBeDefined();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);

    const describe1 = screen.getByText(
      /this application simulates a pokédex/i,
    );
    const describe2 = screen.getByText(
      /one can filter pokémons by type, and see more details for each one of them/i,
    );

    expect(describe1 && describe2).toBeInTheDocument();
  });

  it('Teste se a página contém uma imagem de uma Pokedex', () => {
    render(<About />);

    const imagem = screen.getByRole('img', { name: /pokédex/i });
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imagem.src).toBe(URL);
  });
});
