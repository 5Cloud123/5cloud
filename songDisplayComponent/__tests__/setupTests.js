import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';
import {shallow} from 'enzyme';
import App from '../client/App';

configure({adapter: new Adapter()});

describe('App Test 1', () => {
  it('Renders without crashing', () => {
    shallow(<App />);
  });
});

/*

Shallow - a unit test for React. A unit test is a test designed to specifically
test only one function

shallow() will test the component we are providing, ignoring children components

To do a full-rendering test that takes into account the entire component tree 
and lifecycle methods, we can test with mount()

*/
