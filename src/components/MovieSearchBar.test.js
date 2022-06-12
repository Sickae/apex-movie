import { render, screen } from '@testing-library/react';
import { MovieSearchBar } from './MovieSearchBar';

test('search input is disabled when isDisabled prop is set to true',  async () => {
  render(<MovieSearchBar isDisabled={true} />);
  
  expect(await screen.findByLabelText<HTMLInputElement>(/Search movie/i)).toBeDisabled();
});