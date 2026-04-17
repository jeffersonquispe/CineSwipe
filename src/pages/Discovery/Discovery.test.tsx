/** @vitest-environment jsdom */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Discovery } from './Discovery';
import { useMovies } from '../../hooks/useMovies';
import { useMovieActions, useMovieHistory } from '../../context/movies/MovieContext';

// Mocking hooks
vi.mock('../../hooks/useMovies');
vi.mock('../../context/movies/MovieContext');

describe('Discovery Component', () => {
  const mockDispatch = vi.fn();
  const mockLoadMore = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useMovieActions as any).mockReturnValue(mockDispatch);
    (useMovieHistory as any).mockReturnValue({ history: [] });
  });

  describe('Initial rendering', () => {
    it('should show loading state when loading is true and no movies', () => {
      (useMovies as any).mockReturnValue({
        movies: [],
        loading: true,
        error: null,
        loadMore: mockLoadMore,
        hasMore: true
      });

      render(<Discovery />);
      expect(screen.getByText(/Cargando Películas/i)).toBeInTheDocument();
    });
  });

  describe('Main interaction', () => {
    it('should render a movie card and handle "like" interaction', () => {
      const mockMovies = [{
        id: '1',
        title: 'Inception',
        release_date: '2010-07-16',
        vote_average: 8.8,
        poster_path: '/path.jpg'
      }];
      
      (useMovies as any).mockReturnValue({
        movies: mockMovies,
        loading: false,
        error: null,
        loadMore: mockLoadMore,
        hasMore: true
      });

      render(<Discovery />);
      const likeButton = screen.getByLabelText(/^Like$/i);
      fireEvent.click(likeButton);

      expect(screen.getByText('Inception')).toBeInTheDocument();
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
