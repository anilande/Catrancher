import React from 'react';
import { mount, shallow, render } from 'enzyme';
import {expect} from 'chai';

import Alert from '../../src/components/Alert';

let wrapper;

describe('<Alert/>', function () {
    before(() => {
        wrapper = mount(<Alert title="test" content="testing" hideAlert={() => {}}/>);
    });

    after(() => {
        delete wrapper;
    });

    it('should have a image', function () {
        expect(wrapper.find('.alert-content')).to.have.length(1);
        expect(wrapper.find('.alert')).to.have.length(1);
        expect(wrapper.find('h2')).to.have.length(1);
    });

    it('should have an initial state', function () {
        expect(wrapper.props().title).to.be.defined;
        expect(wrapper.props().content).to.be.defined;
        expect(wrapper.props().hideAlert).to.be.defined;
    });
});
