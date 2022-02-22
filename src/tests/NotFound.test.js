import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);

    const title = screen.getByRole('heading', {
      name: /page requested not found/i,
    });

    expect(title).toBeDefined();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);

    const image = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(image.src).toBe(URL);
  });
});
