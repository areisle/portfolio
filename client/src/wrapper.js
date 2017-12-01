import React, { Component } from 'react';
import { UpArrows } from './icons.js';

function withMain(WrappedComponent, myprops) {
  // ...and returns another component...
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        lastScroll: 0,
        scrollingUp: true
      };
    }
    handleScroll = (e) => {
      if (e.target.scrollTop > this.state.lastScroll && e.target.scrollTop > 10) {
        //scrolling down
        this.setState({
          scrollingUp: false,
          lastScroll: e.target.scrollTop
        });
      } else {
        //scrolling up
        this.setState({
          scrollingUp: true,
          lastScroll: e.target.scrollTop
        });
      }
      myprops.onScroll(this.state.scrollingUp);
    }
    scrollToTop = () => {
      this.refs.main.scrollTo(0,0);
      this.setState({
        scrollingUp: true,
        lastScroll: 0
      });
      myprops.onScroll(true);
    }

    render() {
      return (
        <main 
          className={`main`} 
          onScroll={this.handleScroll} 
          ref="main">
          <button 
            className="scroll-to-top" 
            onClick={this.scrollToTop}>
            <UpArrows/>
          </button>
          <WrappedComponent 
            {...this.props} 
            {...myprops} 
            scrollPosition={this.state.lastScroll}
          />
        </main>
      );
    }
  };
}
export default withMain;