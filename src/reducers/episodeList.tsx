import { IEpisode } from '../types';

export type EpisodeListAction = 
  | { type: 'FETCH_EPISODES', payload: Array<IEpisode> }
  | { type: 'ADD_FAV', payload: IEpisode }
  | { type: 'DEL_FAV', payload: IEpisode }

export interface EpisodeListState {
  episodes: Array<IEpisode>,
  favourites: Array<IEpisode>
}

export const initialState: EpisodeListState = {
  episodes: [],
  favourites: []
}

export function EpisodeListReducer(state: EpisodeListState, action: EpisodeListAction) : EpisodeListState {
  switch(action.type) {
    case 'FETCH_EPISODES':
      return { ...state, episodes: action.payload}
    case 'ADD_FAV':
      return {
        ...state,
        favourites: [...state.favourites, action.payload]
      }
    case 'DEL_FAV':
      return {
        ...state,
        favourites: state.favourites.filter(fav => fav.id !== action.payload.id)
      }
    default:
      return state
  }
}