import React, {Component} from 'react';

export default class AboutUs extends Component {
constructor(props) {
    super(props)
  }

    render() {
        const element = (
        <div>Whats up dudes we are elctric ave</div>
        )
        return (<div>
        <h3>About us</h3>
        {this.props.displaytext}
        {element}
        </div>)
    }
}