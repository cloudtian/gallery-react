import React, { Component } from 'react';
import {findDOMNode} from 'react-dom';
import './App.css';
import imgData from './data/imgData';
import ImgFigure from './components/imgFigure/index';

// 获取区间内的一个随机数
function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

class App extends Component {

  constructor (props) {
    super(props);

    this.constant = {
      centerPos: {
        left: 0,
        right: 0
      },

      // 水平方向取值范围
      hPosRange: {
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },

      // 垂直方向取值范围
      vPosRange: {
        x: [0, 0],
        topY: [0, 0]
      }
    };

    this.state = {
      imgsArrangeArr: [
        // {
        //   pos: {
        //     left: 0,
        //     top: 0
        //   }
        // }
      ]  
    };
  }

  // 组件加载后为每张图片计算其位置的范围
  componentDidMount () {

    // 首先拿到舞台大小
    let stageDom = findDOMNode(this.refs.stage);
    let stageW = stageDom.scrollWidth;
    let stageH = stageDom.scrollHeight;
    let halfStageW = Math.ceil(stageW / 2);
    let halfStageH = Math.ceil(stageH / 2);

    // 拿到imgFigure的大小
    let imgFigureDom = findDOMNode(this.refs.imgFigure0);
    let imgW = imgFigureDom.scrollWidth;
    let imgH = imgFigureDom.scrollHeight;
    let halfImgW = Math.ceil(imgW / 2);
    let halfImgH = Math.ceil(imgH / 2);

    // 计算中心图片的位置点
    this.constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    // 计算左侧，右侧区域图片排布位置的取值范围
    this.constant.hPosRange.leftSecX[0] = -halfImgW;
    this.constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.constant.hPosRange.y[0] = -halfImgH;
    this.constant.hPosRange.y[0] = halfStageH - halfImgH * 3;

    // 计算上侧区域图片排布位置的取值范围
    this.constant.vPosRange.topY[0] = -halfImgH;
    this.constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.constant.vPosRange.x[0] = halfStageW - imgW;
    this.constant.vPosRange.x[0] = halfStageW;

    this.rearrange(0);
  }

  /**
   * 重新布局所有图片
   * @param {Number} centerIndex 指定居中排布哪个图片 
   */
  rearrange (centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr;
    let constant = this.constant;
    let centerPos = constant.centerPos;
    let hPosRange = constant.hPosRange;
    let vPosRange = constant.vPosRange;
    let hPosRangeLeftSecX = hPosRange.leftSecX;
    let hPosRangeRightSecX = hPosRange.rightSecX;
    let hPosRangeY = hPosRange.y;
    let vPosRangeTopY = vPosRange.topY;
    let vPosRangeX = vPosRange.x;

    let imgsArrangeTopArr = [];
    let topImgNum = Math.ceil(Math.random() * 2); // 取一个或者不取
    let topImgSpliceIndex = 0;

    let imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

    // 首先居中 centerIndex的图片
    imgsArrangeCenterArr[0].pos = centerPos;

    // 取出要布局上侧的图片的状态信息
    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

    // 布局位于上侧的图片
    imgsArrangeTopArr.forEach((value, index) => {
      imgsArrangeTopArr[index].pos = {
        top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
        left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
      }
    });

    // 布局左右侧的图片
    for (let i = 0, j = imgsArrangeArr.length, k = j/2; i < j; i++) {
      let hPosRangeLORX = i < k ? hPosRangeLeftSecX : hPosRangeRightSecX;

      imgsArrangeArr[i].pos = {
        top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
        left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
      };
    }

    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0 , imgsArrangeTopArr[0]);
    }

    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

    this.setState({
      imgsArrangeArr: imgsArrangeArr
    });
  }

  render() {
    
    let controllerUnits = [];
    let imgFigures = [];

    imgData.forEach((value, index) => {
      
      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          left: 0,
          top: 0
        };
      }

      imgFigures.push(
       <ImgFigure data={value}
        ref={'imgFigure' + index} 
        arrange={this.state.imgsArrangeArr[index]}/>
      );
    });

    return (
      <section className="stage" ref="stage">
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
