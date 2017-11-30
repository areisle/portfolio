import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { UpArrows } from './icons.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastScroll: 0,
      scrollingUp: true
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }
  handleScroll(e) {
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
    this.props.onScroll(this.state.scrollingUp);
  }
  scrollToTop() {
    const main = ReactDOM.findDOMNode(this.refs.main);
    main.scrollTo(0,0);
    this.setState({
      scrollingUp: true,
      lastScroll: 0
    });
    this.props.onScroll(true);
  }
  render () {
    return (
      <main className={`main`} onScroll={this.handleScroll} ref={this.props.inputRef}>
        <button className="scroll-to-top" onClick={this.scrollToTop}><UpArrows/></button>
        {this.props.children}
      </main>
    );
  }
}

const MainShell = (Page, myprops) => {
  return (props =>
    <Main {...myprops} inputRef={"test"}>
      <Page {...props} {...myprops}/>
    </Main>
  );
};
export default MainShell;
