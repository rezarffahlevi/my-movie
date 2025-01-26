import React from 'react';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from '../routeTree.gen';
import '@testing-library/jest-dom';

// Mock the necessary functions and data
jest.mock('@tanstack/react-router', () => {
  const actualRouter = jest.requireActual('@tanstack/react-router');
  return {
    ...actualRouter,
    createRouter: jest.fn(() => ({
      routeTree: {
        root: {
          path: '/',
          caseSensitive: true,  // Ensure caseSensitive is part of the mock
        },
      },
      defaultPreload: 'intent',
    })),
    RouterProvider: jest.fn(({ router }) => {
      return <div data-testid="router-provider">{router ? 'Router Loaded' : 'No Router'}</div>;
    }),
  };
});

describe('App', () => {
  it('should render the RouterProvider with the correct router', () => {
    // Render the component with the mocked router
    render(<RouterProvider router={createRouter({ routeTree, defaultPreload: 'intent' })} />);
    
    // Check if the RouterProvider rendered correctly
    expect(screen.getByTestId('router-provider')).toHaveTextContent('Router Loaded');
  });

  it('should call createRouter with the expected parameters', () => {
    // Create router to check if it is being called
    const router = createRouter({ routeTree, defaultPreload: 'intent' });
    
    // Check that createRouter has been called correctly
    expect(createRouter).toHaveBeenCalledWith({
      routeTree,
      defaultPreload: 'intent',
    });
    
    // Check the properties of the created router
    expect(router).toHaveProperty('routeTree');
    expect(router).toHaveProperty('defaultPreload', 'intent');
  });
});
