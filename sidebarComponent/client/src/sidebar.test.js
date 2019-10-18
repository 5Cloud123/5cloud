import { shallow } from 'enzyme';
import App from './components/App.jsx';
import React from 'react';
import '@babel/polyfill';

describe('Related Tracks', () => {
  it('renders three <Song /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists().toBe(true));
  });
});
