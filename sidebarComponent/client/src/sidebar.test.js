import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow, mount } from 'enzyme';
import App from './components/App.jsx';
import ItemsContainer from './components/ItemsContainer.jsx';

import Song from './components/Song.jsx';
import InteractionContainer from './components/InteractionContainer.jsx';
import { wrap } from 'module';

configure({ adapter: new Adapter() });

describe('Related Tracks', () => {
  let relatedSongs = [
    {
      id: 1,
      song_id: 'Song_00001',
      song_name: 'All I Got',
      artist_name: 'Said the Sky',
      date_posted: '05/12/2017',
      tag: '# Electronic',
      like_count: 20,
      play_count: 100,
      repost_count: 10,
      comment_count: 10,
      song_art_url:
        'https://i1.sndcdn.com/artworks-000376950786-x9c78f-t500x500.jpg'
    },
    {
      id: 2,
      song_id: 'Song_00002',
      song_name: 'Flicker',
      artist_name: 'Porter Robinson',
      date_posted: '08/12/2010',
      tag: '# Electronic',
      like_count: 2,
      play_count: 200,
      repost_count: 10,
      comment_count: 10,
      song_art_url:
        'https://i1.sndcdn.com/artworks-87d2dfb3-404e-46c4-a9c1-ca749b012f52-0-t500x500.jpg'
    },
    {
      id: 3,
      song_id: 'Song_00003',
      song_name: 'Say My Name',
      artist_name: 'ODESZA',
      date_posted: '01/22/2017',
      tag: '# Electronic',
      like_count: 3,
      play_count: 12,
      repost_count: 10,
      comment_count: 10,
      song_art_url: 'https://i1.sndcdn.com/artworks-ILVTUNh2LAia-0-t500x500.jpg'
    },
    {
      id: 4,
      song_id: 'Song_00004',
      song_name: 'Indian Summer',
      artist_name: 'Jai Wolf',
      date_posted: '01/07/2015',
      tag: '# Electronic',
      like_count: 3,
      play_count: 300,
      repost_count: 10,
      comment_count: 10,
      song_art_url:
        'https://i1.sndcdn.com/artworks-000119695222-hl7mpp-t500x500.jpg'
    }
  ];
  const wrapper = mount(<App currentSong="Song_00001" />);
  const itemsWrapper = mount(
    <ItemsContainer type="relatedTracks" tracks={relatedSongs} />
  );

  it('renders three <ItemsContainer /> components', () => {
    expect(wrapper.find(ItemsContainer).length).toBe(3);
  });

  it('renders three <Song /> components', () => {
    console.log(itemsWrapper.debug());
    expect(itemsWrapper.find(Song).length).toBe(3);
  });

  it('renders two <InteractionContainer/> components', () => {
    expect(wrapper.find(InteractionContainer).length).toBe(2);
  });
});

//look up how to manage componentDidMount with tests
