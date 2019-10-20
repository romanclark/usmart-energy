import React from 'react'
import "./marker.css"
class Marker extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        // calls the function that was given to it via Map.js
        this.props.handleClick(this.props.marker)
    };

    render() {
        return (
            <div onClick={this.handleClick}>
                {this.props.selected ? <div className="text">{this.props.text}</div> : <div></div> }
                <div className={this.props.selected ? "pin selected" : "pin"}/>
                <div className={this.props.selected ? "pulse selected" : "pulse"} />
            </div>
        );
    }
}
export default Marker;