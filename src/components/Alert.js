import React, {Component} from 'react';

class Alert extends Component {
    constructor () {
        super(...arguments);
    }

    render () {
        return (
            <div className="alert" onClick={this.props.hideAlert}>
                <div className="alert-content">
                    <h2>{this.props.title}</h2>
                    {this.props.content}
                </div>
            </div>
        );
    }
}

export default (Alert);
