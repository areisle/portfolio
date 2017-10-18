import React, { Component } from 'react';
import {getProject} from './api.js';
import { Link } from 'react-router-dom';

class Overview extends Component {
  render() {
    let {name, category, tags, slug} = this.props.details;
    let icons = tags.tools.map(tool => <li key={tool}><Icon name={tool}></Icon></li>);
    return (
      <li className="project" category={category} tools={tags.tools}>
        <Link to={`/project/${slug}`}>
          <h2 className="title">{name}</h2>
          <ul className="icons-container">{icons}</ul>
        </Link>
      </li>
    );
  }
}

//full project
class Project extends Component {
  constructor(props) {
    super(props);
    let {name, slug, tags, category} = this.props.details;
    this.state = {
      name: name,
      slug: slug,
      tools: tags.tools,
      categories: category
    }
    this.update = this.update.bind(this);
    this.update();
  }
  update() {
    getProject(this.props.slug).then(data => {
      this.setState({
        name: data.name,
        slug: data.slug,
        tools: data.tags.tools,
        categories: data.category
      });
    });
  }
  componentDidUpdate() {
    this.update();
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