import React from 'react';
import './index.css';

class ImgFigure extends React.Component {
    render () {
       let imgUrl = require('../../images/' + this.props.data.fileName);
       let style = {};

       // 如果props属性中指定了图片的位置，则使用
       if (this.props.arrange.pos) {
           style = this.props.arrange.pos;
       }

       return (
           <figure className="img-figure" style={style}>
               <img src={imgUrl} alt={this.props.data.title}/>
               <figcaption className="img-bottom">
                   <h2 className="img-title">{this.props.data.title}</h2>
               </figcaption>
           </figure>
       );
    }
}

export default ImgFigure;