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
        <Link to={`/portfolio/${slug}`}>
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
        <nav className="project-nav">
          <ul>
            <li><a href="#overview">Overview</a></li>
            <li><a href="#hightlights">Highlights</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#critique">Critique</a></li>
          </ul>
        </nav>
        <section className="project-overview" id="overview">
          <h2 className="project-title">{this.state.name}</h2>
          <ul className="project-tools">{tools}</ul>
          <ul className="project-categories">{categories}</ul>
          <ul className="project-external-links">
            <li><a href="https://github.com/areisle">view on github</a></li>
            <li><a href="#">view live</a></li>
          </ul>
        </section>
        <section className="project-highlights" id="hightlights">
          <h2>Hightlights</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda delectus sint consequatur deserunt, eius corporis dolore vero distinctio possimus laborum facilis cumque ipsam consequuntur illum aperiam cupiditate, veritatis, rem provident.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi facere, ex error dolore libero sed dolorum rem itaque placeat et voluptatum nihil asperiores sunt iusto, eum culpa voluptatem beatae expedita.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda delectus sint consequatur deserunt, eius corporis dolore vero distinctio possimus laborum facilis cumque ipsam consequuntur illum aperiam cupiditate, veritatis, rem provident.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi facere, ex error dolore libero sed dolorum rem itaque placeat et voluptatum nihil asperiores sunt iusto, eum culpa voluptatem beatae expedita.</p>
        </section>
        <section className="project-gallery" id="gallery">
          <h2>Gallery</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda delectus sint consequatur deserunt, eius corporis dolore vero distinctio possimus laborum facilis cumque ipsam consequuntur illum aperiam cupiditate, veritatis, rem provident.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi facere, ex error dolore libero sed dolorum rem itaque placeat et voluptatum nihil asperiores sunt iusto, eum culpa voluptatem beatae expedita.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda delectus sint consequatur deserunt, eius corporis dolore vero distinctio possimus laborum facilis cumque ipsam consequuntur illum aperiam cupiditate, veritatis, rem provident.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi facere, ex error dolore libero sed dolorum rem itaque placeat et voluptatum nihil asperiores sunt iusto, eum culpa voluptatem beatae expedita.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda delectus sint consequatur deserunt, eius corporis dolore vero distinctio possimus laborum facilis cumque ipsam consequuntur illum aperiam cupiditate, veritatis, rem provident.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi facere, ex error dolore libero sed dolorum rem itaque placeat et voluptatum nihil asperiores sunt iusto, eum culpa voluptatem beatae expedita.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda delectus sint consequatur deserunt, eius corporis dolore vero distinctio possimus laborum facilis cumque ipsam consequuntur illum aperiam cupiditate, veritatis, rem provident.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi facere, ex error dolore libero sed dolorum rem itaque placeat et voluptatum nihil asperiores sunt iusto, eum culpa voluptatem beatae expedita.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda delectus sint consequatur deserunt, eius corporis dolore vero distinctio possimus laborum facilis cumque ipsam consequuntur illum aperiam cupiditate, veritatis, rem provident.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi facere, ex error dolore libero sed dolorum rem itaque placeat et voluptatum nihil asperiores sunt iusto, eum culpa voluptatem beatae expedita.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda delectus sint consequatur deserunt, eius corporis dolore vero distinctio possimus laborum facilis cumque ipsam consequuntur illum aperiam cupiditate, veritatis, rem provident.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi facere, ex error dolore libero sed dolorum rem itaque placeat et voluptatum nihil asperiores sunt iusto, eum culpa voluptatem beatae expedita.</p>

        </section>
        <section className="project-critique" id="critique">
          <h2>Critique</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda delectus sint consequatur deserunt, eius corporis dolore vero distinctio possimus laborum facilis cumque ipsam consequuntur illum aperiam cupiditate, veritatis, rem provident.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi facere, ex error dolore libero sed dolorum rem itaque placeat et voluptatum nihil asperiores sunt iusto, eum culpa voluptatem beatae expedita.</p>
        </section>

        <Link className="prev button" to={`/portfolio/${this.props.prev}`}></Link>
        <Link className="next button" to={`/portfolio/${this.props.next}`}></Link>
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