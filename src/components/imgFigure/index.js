import React from 'react';
import './index.css';

class ImgFigure extends React.Component {
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
       let imgUrl = require('../../images/' + this.props.data.fileName);
       let style = {};

       // 如果props属性中指定了图片的位置，则使用
       if (this.props.arrange.pos) {
           style = Object.assign(style, this.props.arrange.pos);
       }

       //如果图片旋转角度有值且不为0，添加旋转角度
       if (this.props.arrange.rotate) {
           ['MozTransform', 'msTransform', 'WebkitTransform', 'transform'].forEach((item) => {
                style[item] = `rotate(${this.props.arrange.rotate}deg)`;
           });
       }

       if (this.props.arrange.isCenter) {
           style.zIndex = 11;
       }

       let className = 'img-figure';
       className += this.props.arrange.isInverse ? ' is-inverse' : '';

       return (
           <figure className={className} style={style} onClick={this.handleClick}>
               <img src={imgUrl} alt={this.props.data.title}/>
               <figcaption className="img-bottom">
                   <h2 className="img-title">{this.props.data.title}</h2>
                   <div className="img-back" onClick={this.handleClick}>
                    <p>
                        {this.props.data.desc}
                    </p>
                   </div>
               </figcaption>
           </figure>
       );
    }
}

export default ImgFigure;