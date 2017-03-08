import React from 'react';
import { mount, shallow, render } from 'enzyme';
import {expect} from 'chai';

import Cat from '../../src/components/Cat';

let wrapper;

describe('<Cat/>', function () {
    before(() => {
        wrapper = mount(<Cat cat={cat} setCat={() => {}}/>);
    });

    after(() => {
        delete wrapper;
    });

    it('should have a image', function () {
        const cat = ["1","t","t","g"];

        expect(wrapper.find('li')).to.have.length(1);
        expect(wrapper.find('img')).to.have.length(1);
    });
    it('onClick the background should gray out', function () {
        const cat = ["1","t","t","g"];

        wrapper.simulate('click');
        expect(wrapper.find('.selected')).to.have.length(1);

        wrapper.simulate('click');
        expect(wrapper.find('.selected')).to.have.length(0);
    });
});