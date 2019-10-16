import { shallow } from 'enzyme';
import Song from './components/Song.jsx';
import App from './components/App.jsx';
import React from 'react';

describe('Related Tracks', () => {
  it('renders three <Song /> components', () => {
    const wrapper = shallow(<Song />);
    expect(wrapper.exists().toBe(true));
  });
});
