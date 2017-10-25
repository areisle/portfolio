import React, { Component } from 'react';
//import {getProject} from './api.js';
import { Link } from 'react-router-dom';
//import ReactResizeDetector from 'react-resize-detector';
/**
 * Component to display the overview of a project 
 * that will be seen on the portfolio page
 * @extends Component
 */
class Overview extends Component {
  render() {
    let {name, category, tags, slug} = this.props.details;
    let icons = tags.tools.map(tool => <li key={tool}><Icon name={tool}></Icon></li>);
    return (
      <li className="project" category={category} tools={tags.tools} >
        <Link to={`/project/${slug}`}>
          <h2 className="title">{name}</h2>
          <ul className="icons-container">{icons}</ul>
        </Link>
      </li>
    );
  }
}

/**
 * display a full project
 * @extends Component
 */
class Project extends Component {
  constructor(props) {
    super(props);
    let {name, slug, tags, category} = this.props.details;
    this.state = {
      name: name,
      slug: slug,
      tools: tags.tools,
      categories: category
    };
  }

  render () {
    let tools = this.state.tools.map(tool => (<li key={tool}>{tool}</li>));
    let categories = this.state.categories.map(tool => (<li key={tool}>{tool}</li>));
    return (
      <div className="project single">
        <div>
          <h2>{this.state.name}</h2>
          <ul>{tools}</ul>
          <ul>{categories}</ul>
        </div>
        <Link className="prev button" to={`/project/${this.props.prev}`}>prev</Link>
        <Link className="next button" to={`/project/${this.props.next}`}>next</Link>
      </div>
    );
    
  }
}

/**
 * Component to display an icon
 * @extends Component
 */
class Icon extends Component {
  //leave as this for now, but possibly add link or button wrapper later
  render () {
    return (
      <div className="icon">
        <img src={require(`./images/icons/${this.props.name}.svg`)} alt={`${this.props.name} icon`}/>
      </div>
    );
  }
}

export {Project, Overview};