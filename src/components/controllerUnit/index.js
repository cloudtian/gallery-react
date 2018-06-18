import React from 'react';
import './index.css';

// 控制组件
class ControllerUnit extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (e) {

        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }
        e.stopPropagation();
        e.preventDefault();
    }

    render () {

        let className = 'controller-unit';
        className += this.props.arrange.isCenter ? ' is-center' : '';
        className += this.props.arrange.isInverse ? ' is-inverse' : '';

        return (
            <span className={className} onClick={this.handleClick}>
            </span>
        );
    }
}

export default ControllerUnit;