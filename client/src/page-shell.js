import React, { Component } from 'react';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastScroll: 0,
      scrollingUp: true
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  handleScroll(e) {
    if (e.target.scrollTop > this.state.lastScroll) {
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

  render () {
    return (
      <main className={`main`} onScroll={this.handleScroll}>
        {this.props.children}
      </main>
    );
  }
}

const MainShell = (Page, myprops) => {
  return (props =>
    <Main {...myprops}>
      <Page {...props} {...myprops}/>
    </Main>
  );
};
export default MainShell;
