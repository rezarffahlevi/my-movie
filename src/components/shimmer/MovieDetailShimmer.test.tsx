import { render } from '@testing-library/react';
import { CardShimmer } from './CardShimmer';
import { MovieDetailShimmer } from './MovieDetailShimmer';

jest.mock('./CardShimmer', () => ({
  CardShimmer: jest.fn(() => <div>Mocked CardShimmer</div>),
}));

describe('MovieDetailShimmer', () => {
  test('renders CardShimmer with correct count', () => {
    const { getByText } = render(<MovieDetailShimmer />);
    
    // Check if the mocked CardShimmer component is rendered
    expect(getByText('Mocked CardShimmer')).toBeInTheDocument();
    
    // Ensure CardShimmer is called with correct props (count = 6)
    expect(CardShimmer).toHaveBeenCalledWith({ count: 6 }, {});
  });
});
