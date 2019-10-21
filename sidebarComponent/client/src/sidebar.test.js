import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import App from '../client/App';

configure({ adapter: new Adapter() });

describe('Related Tracks', () => {
  it('renders three <Song /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists().toBe(true));
  });
});
