// import Gallery from 'react-photo-gallery';
// import Slickr from 'react-slick';
import React, {Component} from 'react';
import Lightbox from 'react-images';
import Swipe from 'react-easy-swipe';

class PhotoSlide extends Component {
  render() {
    return (
      <li className="slide" onClick={this.props.onClick}>
        <img ref="img" src={this.props.src}  alt="test"/>
      </li>
    );
  }
}
class Slides extends Component {
  render () {
    let Slides = this.props.photos.map((photo, i) => <PhotoSlide ref={`slide${i}`} key={i} {...photo} onClick={this.props.handleClick}/>);
    return (
      <div
        className="aer_slick"
      >
        <button className="btn-next" onClick={this.props.onClickNext}>next</button>
        <button className="btn-prev" onClick={this.props.onClickPrev}>prev</button>
        <ul style={{transform: `translateX(-${100 * this.props.currentImage}%)`}}>{Slides}</ul>
      </div>
    );
  }
}
class Slick extends Component {
  constructor(props){             
    super(props);                 
    this.state = { currentImage: 0 }; 
    this.closeLightbox = this.closeLightbox.bind(this); 
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  openLightbox() {
    this.setState({
      lightboxIsOpen: true,
    });  
  }
  closeLightbox() {
    this.setState({
      lightboxIsOpen: false,
    }); 
  }
  gotoPrevious() {
    this.setState({
      currentImage: (this.state.currentImage + this.props.photos.length - 1) % this.props.photos.length
    });  
  }
  gotoNext() {
    this.setState({
      currentImage: (this.state.currentImage + 1) % this.props.photos.length,
    }); 
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <Swipe
          onSwipeLeft={this.gotoNext}
          onSwipeRight={this.gotoPrevious}>
          <Lightbox images={this.props.photos}
            backdropClosesModal={true}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
          />
          <Slides photos={this.props.photos}
            currentImage={this.state.currentImage}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            handleClick={this.openLightbox}
          />
        </Swipe>
      </div>
    );
  }
}

export { Slick };