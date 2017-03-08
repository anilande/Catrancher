import React, {Component} from 'react';
import ReactDom from 'react-dom';

class Cat extends Component {
    constructor () {
        super(...arguments);

        this.state = {selected: false};

        this.onCatSelected = this.onCatSelected.bind(this);
    }

    componentWillReceiveProps() {
        this.state = {selected: false};
    }

    onCatSelected(e) {
        if (typeof this.props.setCat !== 'function') return;

        const cat = e.currentTarget.getAttribute('data').split('');

        if (this.state.selected) {
            this.setState({selected: false});
            setTimeout(() => { this.props.unSetCat(this.props.index) }, 0);
        }
        else {
            this.setState({selected: true});
            setTimeout(() => { this.props.setCat(cat, this.props.index) }, 0);
        }
    }

    render () {
        const
            cat = this.props.cat.join(''),
            selectedClass = this.state.selected ? "selected" : "";

        return (
            <li className={("list-item " + selectedClass)} onClick={this.onCatSelected} data={cat}>
                <img className="img" title={cat} src={("http://quantcats.herokuapp.com/static/cats/" + cat + ".png")}/>
            </li>
        );
    }
}

export default (Cat);
