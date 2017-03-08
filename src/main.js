import React, {Component} from 'react';
import ReactDom from 'react-dom';

import Cat from './components/Cat';
import Alert from './components/Alert';
import {data, pass, fail} from './data/data';

const API_PATH_CAT = "/api/cats";
const API_PATH_CLOUDER = "/api/clowder";
const AJAX = false;

class Catrancher extends Component {

    constructor () {
        super(...arguments);

        this.data = pass.cats;

        this.attr_count = this.data[0].length;

        this.selectCatList = [];
        this.clowders = [];

        this.state = {
            cats     : this.data,
            clowders : this.clowders,
            popup    : ''
        };
        this.hideAlert = this.hideAlert.bind(this);
        this.setCat = this.setCat.bind(this);
        this.unSetCat = this.unSetCat.bind(this);
        this.updateClouder = this.updateClouder.bind(this);
        this.checkClouder = this.checkClouder.bind(this);
    }

    componentDidMount() {
        if (!AJAX) return;

        var self = this;

        fetch(API_PATH_CAT)
            .then(function(response) {
                return response.json();
            })
            .then(function(myBlob) {
                self.data = myBlob.cats;
                self.setState({
                    cats : self.data,
                });
            });
    }

    hideAlert() {
        this.setState({ popup: '' });
    }

    clouderExists() {
        const self = this;
        let state = true;

        this.clowders.map((clowder) => {
            if (!state) return;

            clowder.forEach((success_cat) => {
                self.selectCatList.forEach((selected_cat) => {
                    if (success_cat.index != selected_cat.index) {
                        state = false;
                    }
                });
            });            
        });

        if (!state) {
            this.setState({
                popup: (<Alert hideAlert={this.hideAlert} title="Sorry" content="this clouder already exist. please match diffrent cats" />)
            });
        }

        return state;
    }

    checkClouder(cats, attr_count) {
        if (AJAX) {
            const
                self = this,
                url = API_PATH_CLOUDER + '/' + cats[0].cat.join('') + '/' + cats[1].cat.join('') + '/' + cats[2].cat.join('');

            fetch(url)
                .then(function(response) {
                    return response.json();
                })
                .then(function(myBlob) {
                    if (myBlob.valid && !self.clouderExists()) {
                        self.setState({
                            popup: (<Alert hideAlert={self.hideAlert} title="Congratulations" content="Those cats go along" />)
                        });
                        self.updateClouder(false);
                    }
                    else {
                        self.setState({
                            popup: (<Alert hideAlert={self.hideAlert} title="Sorry" content="Those cats dont go along" />)
                        });
                        self.updateClouder(true);
                    }
                });
        }
        else {
            for (let i = 0; i < attr_count; i++) {
                if (!this.checkAttr(cats[0].cat[i], cats[1].cat[i], cats[2].cat[i])) {
                    this.setState({
                        popup: (<Alert hideAlert={this.hideAlert} title="Sorry" content="Those cats dont go along" />)
                    });
                    return false;
                }
            }

            this.setState({
                popup: (<Alert hideAlert={this.hideAlert} title="Congratulations" content="Those cats go along" />)
            });

            return true;
        }
        
    }

    checkAttr(a, b, c) {
        return (a === b && b === c) || (a != b && b != c && a != c);
    }

    updateClouder(state) {
        if (state) {
            this.selectCatList = [];
            this.setState({
                clowders: this.clowders,
                clear: true
            });
        }
        else {
            this.clowders.push(this.selectCatList);

            this.selectCatList = [];

            this.setState({
                cats: this.data,
                clowders : this.clowders,
                clear: true
            });
        }
    }

    setCat(cat, index) {
        this.selectCatList.push({cat, index});

        if (this.selectCatList.length === 3){
            if(!AJAX) {
                this.updateClouder(!this.checkClouder(this.selectCatList, this.attr_count) || !this.clouderExists());
            }
            else {
                this.checkClouder(this.selectCatList, this.attr_count);
            }
        }
    }

    unSetCat(index) {
        this.selectCatList.map((cat, pos) => {
            if (cat.index == index) {
                this.selectCatList.splice(pos, 1);
            }
        });
    }

    render () {
        var self = this;

        return (
            <div>
                <h1>The Catrancher</h1>
                <h3>{((new Date()).toDateString())}</h3>
                <div>
                    <span className="floatl layout">
                        <ul className="list-wrapper">
                            { this.state.cats.map(function(cat, index) {
                               return <Cat key={index} index={index} cat={cat} setCat={self.setCat} unSetCat={self.unSetCat} clear={self.state.clear}/>;
                            })}
                        </ul>
                    </span>
                    <span className="floatr layout">
                        { this.state.clowders.map(function(cats, index) {
                            let clouder = [];

                            cats.map((cat) => {
                                clouder.push(<Cat key={cats.index} cat={cat.cat}/>);
                            });
                            return (
                                <ul  className="list-wrapper" key={index} data={index}>
                                    {clouder}
                                </ul>
                            );
                        })}
                    </span>
                </div>
                {this.state.popup}
            </div>
        );
    }
}

// ReactDom.render(<Catrancher />, document.getElementById('appContainer'));

export default (Catrancher);
