import React from 'react';
import { mount, shallow, render } from 'enzyme';
import {expect} from 'chai';

import Catrancher from '../src/main';

let wrapper;

describe('<Catrancher/>', function () {
    before(() => {
        wrapper = mount(<Catrancher/>);
    });

    after(() => {
        delete wrapper;
    });

    it('must have elements', function () {
        expect(wrapper.find('h1')).to.have.length(1);
        expect(wrapper.find('h3')).to.have.length(1);
        expect(wrapper.find('.layout')).to.have.length(2);

    });
    it('should have an initial state', function () {
        wrapper.simulate('click');
        expect(wrapper.find('.selected')).to.have.length(1);

        expect(wrapper.find('h1')).to.have.length(1);
        expect(wrapper.find('h3')).to.have.length(1);
        expect(wrapper.find('.layout')).to.have.length(2);
        expect(wrapper.find('.alert')).to.have.length(1);
    });
});
