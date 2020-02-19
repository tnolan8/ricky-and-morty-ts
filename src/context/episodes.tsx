import React from 'react';
import {
  EpisodeListReducer,
  initialState,
  EpisodeListAction,
  EpisodeListState
} from '../reducers/episodeList'

type EpisodeListContextProps = {
  state: EpisodeListState,
  dispatch: React.Dispatch<EpisodeListAction>
}

const EpisodesContext = React.createContext<EpisodeListContextProps>({
  state: initialState,
  dispatch: () => initialState
})

export function EpisodesProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = React.useReducer(EpisodeListReducer, initialState);
  return <EpisodesContext.Provider value={{state, dispatch}} {...props} />
}

export default function useEpisodes() {
  const context = React.useContext(EpisodesContext)
  if(!context){
    throw new Error('useEpisodes must be used within an EpisodeProvider')
  }
  return context;
}