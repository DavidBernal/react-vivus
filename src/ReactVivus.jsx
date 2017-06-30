import React, { Component, PropTypes } from 'react'
import Vivus from 'vivus'

class ReactVivus extends Component {
    componentDidMount(){
        console.log(document.getElementById(this.props.name))
        console.log(this.props.name);
        new Vivus(this.props.name, {
            duration: this.props.time,
            file: this.props.svg
        }, this.props.callback);
    }

    constructor (props){
        super(props);

        this.state = {
            style: {
                "fill": 'transparent',
                "strokeWidth": 3,
                "strokeLinecap": 'round',
                "strokeMiterlimit": 10,
                "strokeLinejoin": 'round',
                "stroke": this.props.color,
                "width": '200px',
                "height": '200px'
            }
        }
    }

    render(){
        return(
            <div id={this.props.name} style={this.state.style}></div>
        )
    }
}

ReactVivus.defaultProps = {
    time: 200,
    color: 'black',
    callback: null,
    name: new Date().getTime()
}

ReactVivus.propTypes = {
    svg: React.PropTypes.string.isRequired,
    time: React.PropTypes.number,
    color: React.PropTypes.string,
    callback: React.PropTypes.func,
    name: React.PropTypes.string
}

export default ReactVivus;
