import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';
import {shallow} from 'enzyme';
import SongDisplay from '../client/SongDisplay';

configure({adapter: new Adapter()});

describe('Initial Load Tests', () => {
  // Create shallow of SongDisplay
  let wrap;
  it('Renders without crashing', () => {
    wrap = shallow(<SongDisplay />);
  });
  it('Has a play button', () => {
    expect(wrap.containsMatchingElement(<div className='play-button'></div>));
  });
  it('Has a container for the song name', () => {
    expect(
      wrap.containsMatchingElement(<div className='song-name-container'></div>)
    );
  });
  it('Has a container for the artist name', () => {
    expect(
      wrap.containsMatchingElement(
        <div className='artist-name-container'></div>
      )
    );
  });
  it('Has a container for the date posted', () => {
    expect(
      wrap.containsMatchingElement(
        <div className='date-posted-container'></div>
      )
    );
  });
  it('Has a container for the song tag', () => {
    expect(
      wrap.containsMatchingElement(<div className='tags-container'></div>)
    );
  });
  it('Has a container for song art', () => {
    expect(wrap.containsMatchingElement(<div className='album-art'></div>));
  });
  it('Has a container for the song playback graph/slider', () => {
    expect(wrap.containsMatchingElement(<div className='song-player'></div>));
  });
});

describe('State Tests', () => {
  // Create shallow of SongDisplay
  const wrap = shallow(<SongDisplay />);
  it('Can set state', () => {
    wrap.setState({testPasses: true});
    expect(wrap.state('testPasses')).toEqual(true);
  });
});

/*

Shallow - a unit test for React. A unit test is a test designed to specifically
test only one function

shallow() will test the component we are providing, ignoring children components

To do a full-rendering test that takes into account the entire component tree 
and lifecycle methods, we can test with mount()

*/
