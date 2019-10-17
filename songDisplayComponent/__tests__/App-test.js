jest.autoMockOff();

import React from 'react';
import ReactDOM from 'react-dom';
const TestUtils = require('react-dom/test-utils');

const App = require('../client/App');

describe('App', () => {
  it('renders the page', () => {
    const rendered = TestUtils.renderIntoDocument(<App />);
    const images = TestUtils.scryRenderedDOMCompnentsWithTag(rendered, 'img');
    expect(images.length).toEqual(1);
  });
});
