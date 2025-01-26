import { render } from '@testing-library/react';
import { CardShimmer } from './CCardShimmer';

describe('CardShimmer', () => {
  test('renders default number of shimmer placeholders (12)', () => {
    const { getAllByRole } = render(<CardShimmer />);
    // By default, should render 12 placeholders
    const placeholders = getAllByRole('presentation');  // Using role="presentation" for shimmer div
    expect(placeholders).toHaveLength(12);
  });

  test('renders specified number of shimmer placeholders based on count prop', () => {
    const { getAllByRole } = render(<CardShimmer count={5} />);
    // Should render 5 placeholders
    const placeholders = getAllByRole('presentation');
    expect(placeholders).toHaveLength(5);
  });
});
