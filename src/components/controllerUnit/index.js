import React from 'react';
import './index.css';

// 控制组件
class ControllerUnit extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (e) {

        e.stopPropagation();
        e.preventDefault();
    }

    render () {
        return (
            <span className="controller-unit" onClick={this.handleClick}>
            </span>
        );
    }
}

export default ControllerUnit;