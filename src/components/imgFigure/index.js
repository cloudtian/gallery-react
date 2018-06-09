import React from 'react';
import './index.css';

class ImgFigure extends React.Component {
    render () {
       let imgUrl = require('../../images/' + this.props.data.fileName);
       return (
           <figure className="img-figure">
               <img src={imgUrl} alt={this.props.data.title}/>
               <figcaption className="img-bottom">
                   <h2 className="img-title">{this.props.data.title}</h2>
               </figcaption>
           </figure>
       );
    }
}

export default ImgFigure;