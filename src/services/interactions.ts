import { supabase } from './supabase';
import { TMDBMovie } from '../types/tmdb.types';

export const interactionsService = {
  /**
   * Registra un swipe (like o dislike) en Supabase.
   */
  async saveInteraction(movie: TMDBMovie, type: 'like' | 'dislike') {
    const { data, error } = await supabase
      .from('movie_interactions')
      .insert([
        {
          movie_id: movie.id.toString(),
          movie_title: movie.title || movie.original_title,
          interaction_type: type,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average
        }
      ]);

    if (error) {
      console.error('Error saving interaction to Supabase:', error.message);
      throw error;
    }

    return data;
  },

  /**
   * Obtiene el conteo total de interacciones registradas.
   */
  async getStats() {
    const { count, error } = await supabase
      .from('movie_interactions')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count;
  }
};
