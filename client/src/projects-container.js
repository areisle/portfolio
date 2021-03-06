import React, { Component } from 'react';

import { Overview } from './project.js';
import { getProjectOutlines } from './api.js';
import ReactResizeDetector from 'react-resize-detector';

//list of projects
class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      columns: 1
    };
    
    this.updateLayout = this.updateLayout.bind(this);
  }
  
  updateLayout(width) {
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
  componentDidMount() {
    getProjectOutlines().then(data => {
      // this.setState({
      //   projects: data,
      // });
    });
  }
  render () {
    let projects = this.props.projects.map(project => {
      return (<Overview key={project.slug} details={project}></Overview>);
    });
    return (
      <ul className={`projects-container columns-${this.state.columns}`} >
        {projects}
        <ReactResizeDetector handleWidth={true} onResize={this.updateLayout}></ReactResizeDetector>
      </ul>
    );
  }
}

export {ProjectsContainer};