import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ExamplePage } from './ExamplePage';

describe('<ExamplePage />', () => {
  test('it should mount', () => {
    render(<ExamplePage />);

    const examplePage = screen.getByTestId('examplePage');

    expect(examplePage).toBeInTheDocument();
  });
});
