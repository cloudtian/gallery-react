import React, { Component } from 'react';
import './App.css';
import imgData from './data/imgData';
import ImgFigure from './components/imgFigure/index';

class App extends Component {
  render() {
    
    let controllerUnits = [];
    let imgFigures = [];

    imgData.forEach(value => {
      imgFigures.push(<ImgFigure data={value} />);
    });

    return (
      <section className="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

export default App;
