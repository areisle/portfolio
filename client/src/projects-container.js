import React, { Component } from 'react';

import { Overview } from './project.js';
import ReactResizeDetector from 'react-resize-detector';

//list of projects
class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      columns: 1
    };
  }
  
  updateLayout = (width) => {
    const oldcolumns = this.state.columns;
    let newcolumns = oldcolumns;
    
    if (width < 400) {
      newcolumns = 1;
    } else if (width <= 600) {
      newcolumns = 2;
    } else if (width <= 800){
      newcolumns = 3;
    } else {
      newcolumns = 4;
    }
    if (newcolumns !== oldcolumns) {
      this.setState({
        columns: newcolumns,
      });
    }
  }
  
  render () {
    let projects = this.props.projects.map(project => {
      return (<Overview key={project.slug} details={project} setScroll={this.props.setScroll}></Overview>);
    });
    return (
      <ul className={`projects-container columns columns-${this.state.columns}`} >
        {projects}
        <ReactResizeDetector handleWidth={true} onResize={this.updateLayout}></ReactResizeDetector>
      </ul>
    );
  }
}

export {ProjectsContainer};