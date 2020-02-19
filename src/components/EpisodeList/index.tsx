import React from 'react';
import { IEpisode } from '../../types'

interface EpisodeListProps {
  episodes: Array<IEpisode>,
  toggleFavAction: Function,
  favourites: Array<IEpisode>
}

export default function EpisodeList(props: EpisodeListProps) {
  const { episodes, toggleFavAction, favourites } = props
  return episodes.map(episode => {
    return (
      <section key={episode.id} className='episode-box'>
        <img
          src={episode.image.medium}
          alt={`Rick and Morty ${episode.name}`}
        />
        <div>{episode.name}</div>
        <section style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            Season: {episode.season} Number: {episode.number}
          </div>
          <button type='button' onClick={() => toggleFavAction(episode)}>
            {favourites.find(fav => fav.id === episode.id) ? 'Unfav' : 'Fav'}
          </button>
        </section>
      </section>
    );
  })
}

// export class EpisodeList extends Component<EpisodeListProps, void> {
//   render() {
//     return this.props.episodes.map(episode => {
//       return (
//         <section key={episode.id} className="episode-box">
//           <img
//             src={episode.image.medium}
//             alt={`Rick and Morty ${episode.name}`}
//           />
//           <div>{episode.name}</div>
//           <section style={{ display: 'flex', justifyContent: 'space-between' }}>
//             <div>
//               Season: {episode.season} Number: {episode.number}
//             </div>
//             <button
//               type="button"
//               onClick={() => this.props.toggleFavAction(episode)}
//             >
//               {this.props.favourites.find(fav => fav.id === episode.id)
//                 ? 'Unfav'
//                 : 'Fav'}
//             </button>
//           </section>
//         </section>
//       );
//     });
//   }
// }