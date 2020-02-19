import React from 'react';
// import { Store } from './Store';
import { IEpisode } from './types';
import useEpisodes from './context/episodes';

/** Property 'EpisodeList' does not exist on type 
 * 'typeof import("/Users/tomnolan/jsapps/no-redux-ts/src/components/EpisodeList/index") */
// const EpisodeListLazy = React.lazy(() => import('./components/EpisodeList')
//   .then(({ EpisodeList }) => ({ default: EpisodeList})),
// );

/**Type 'Promise<typeof import("/Users/tomnolan/jsapps/no-redux-ts/src/components/EpisodeList/index")>' is not assignable to type 
 * 'Promise<{ default: ComponentType<any>; }>'.
  Type 'typeof import("/Users/tomnolan/jsapps/no-redux-ts/src/components/EpisodeList/index")' 
  is not assignable to type '{ default: ComponentType<any>; }'.
    Types of property 'default' are incompatible.
      Type '(props: EpisodeListProps) => Element[]' is not assignable to type 'ComponentType<any>'.
        Type '(props: EpisodeListProps) => Element[]' is not assignable to type 'FunctionComponent<any>'.
          Type 'Element[]' is missing the following properties from type 'ReactElement<any, string |
           ((props: any) => ReactElement<any, string | ... | (new (props: any) => Component<any, any, any>)> | null) 
           | (new (props: any) => Component<any, any, any>)>': type, props, key */
// const EpisodeListLazy = React.lazy(() => import('./components/EpisodeList'));

export default function App() {
  const { state, dispatch } = useEpisodes();

  const fetchDataAction = async () => {
    const data = await fetch(
      'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes',
    );
    const dataJSON = await data.json();
    if (dispatch) {
      return dispatch({
        type: 'FETCH_EPISODES',
        payload: dataJSON._embedded.episodes,
      });
    }
  };

  const toggleFavAction = (episode: IEpisode) => {
    const episodeInFavourites = state.favourites.includes(episode);
    if (episodeInFavourites) {
      return dispatch({
        type: 'DEL_FAV',
        payload: episode,
      });
    }
    return dispatch({
      type: 'ADD_FAV',
      payload: episode,
    });
  };

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });
  return (
    <React.Fragment>
      {console.log(state)}
      <header className="header">
        <div>
          <h1>Rick and Morty</h1>
          <p>Pick your favourite episodes</p>
        </div>
        <div>Favourite(s) {state.favourites.length}</div>
      </header>
      <section className="episode-layout">
        {state.episodes.map(episode => {
          return (
            <section key={episode.id} className="episode-box">
              <img
                src={episode.image.medium}
                alt={`Rick and Morty ${episode.name}`}
              />
              <div>{episode.name}</div>
              <section
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div>
                  Season: {episode.season} Number: {episode.number}
                </div>
                <button type="button" onClick={() => toggleFavAction(episode)}>
                  {state.favourites.find(fav => fav.id === episode.id)
                    ? 'Unfav'
                    : 'Fav'}
                </button>
              </section>
            </section>
          );
        })}
      </section>
    </React.Fragment>
  );
}