// import Gallery from 'react-photo-gallery';
// import Slickr from 'react-slick';
import React, {Component} from 'react';
import Lightbox from 'react-images';
import ReactResizeDetector from 'react-resize-detector';
import ReactDOM from 'react-dom';

class PhotoSlide extends Component {
  componentDidMount() {
    console.log(this.refs.slide.height, 'slide');
  }
  render() {
    return (
      <li className="slide" ref={`slide`}>
        <img src={this.props.src} onClick={this.props.handleClick} alt="test"/>
      </li>
    );
  }
}
class Slick extends Component {
  constructor(props){             
    super(props);                 
    this.state = { 
      currentImage: 0,
      length: this.props.photos.length
    }; 
    // this.gotoNext = this.gotoNext.bind(this);
    // this.gotoPrevious = this.gotoPrevious.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log(this.refs.test.clientHeight, "test test");
    this.setState({
      currentImage: (this.state.currentImage + 1) % this.state.length
    });
    console.log(this.state);
  }

  componentDidMount() {
    console.log(this.refs.test.offsetHeight);    
    console.log(ReactDOM.findDOMNode(this.refs.test).clientHeight);
  }
  render () {
    let Slides = this.props.photos.map((photo, i) => <PhotoSlide ref={`slide${i}`} key={i} {...photo} onClick={() => this.handleClick()}/>);
    return (
      <div className="aer_slick" onClick={this.handleClick}>
        <ul ref="test" style={{transform: `translateX(-${this.state.currentImage * 100}%)`}}>{Slides}</ul>
      </div>
    );
  }
}
class Sample extends Component {
  constructor(props){             
    super(props);                 
    this.state = { currentImage: 0 }; 
    this.closeLightbox = this.closeLightbox.bind(this); 
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  openLightbox(index, obj) {
    console.log(obj);
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });  
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    }); 
  }
  gotoPrevious() {
    this.setState({
      currentImage: (this.state.currentImage - 1) % PHOTO_SET.length,                                                           
    });  
  }
  gotoNext() {
    this.setState({
      currentImage: (this.state.currentImage + 1) % PHOTO_SET.length,                                            
    }); 
  }
  render() {
    // const settings = {
    //   speed: 500,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   responsive: [ { breakpoint: 400, settings: 'unslick' } ],
    // };
    // let Images = PHOTO_SET.map((image, i) => <div className="slide" key={i} index={i} onClick={() => this.openLightbox(i)}><img src={image.src}/></div>);
    return (
      <div>
        {/* <Gallery photos={PHOTO_SET} onClick={this.openLightbox} /> */}
        {/* <div className="slick-wrapper">
          <Slickr className="slick" {...settings}>
            {Images}
          </Slickr>
        </div> */}
        <Lightbox images={PHOTO_SET}
          backdropClosesModal={true}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
        <Slick photos={PHOTO_SET}/>
      </div>
    );
  }
}
const PHOTO_SET = [
  {
    src: require('./images/Individual-Photo.jpg'),
    width: 4,
    height: 3
  },
  {
    src: require('./images/Home.jpg'),
    width: 1,
    height: 1
  },
  {
    src: require('./images/Project.jpg'),
    width: 1,
    height: 1
  },
  {
    src: require('./images/Services.jpg'),
    width: 1,
    height: 1
  },
  {
    src: require('./images/Portfolio.jpg'),
    width: 1,
    height: 1
  }
];

export { Sample };