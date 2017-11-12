import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProject } from './api.js';

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
      <li className="project" 
        category={category} 
        tools={tags.tools}
        style={{backgroundImage: `url('https://s3.ca-central-1.amazonaws.com/areisle-portfolio/${slug}.jpg')`}} >
        <Link to={`/portfolio/${slug}`} onClick={this.props.setScroll}>
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
    let { slug } = this.props.details;
    this.state = {
      project: [],
      open: false
    };
    getProject(slug).then(data => {
      this.setState({
        project: data,
      });
    });
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      'open': !this.state.open
    });
    
  }
  render () {
    let {name, tags, category, slug} = this.props.details;
    let icons = tags.tools.map(tool => <li key={tool}><Icon name={tool}></Icon></li>);
    let categories = category.map(tool => (<li key={tool}>{tool}</li>));
    
    return (
      <div className="project single" ref={(el) => this.project = el}>
        <nav className={`project-nav ${this.state.open ? 'expanded':''}`}>
          <button onClick={this.handleClick}>
            <div className="menu-icon">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </button>
          <ul>
            <li><a onClick={this.handleClick} href="#overview">Overview</a></li>
            <li><a onClick={this.handleClick} href="#hightlights">Highlights</a></li>
            <li><a onClick={this.handleClick} href="#gallery">Gallery</a></li>
            <li><a onClick={this.handleClick} href="#critique">Critique</a></li>
          </ul>
        </nav>
        <section className="project-overview" id="overview">
          <h2 className="project-title">{name}</h2>
          <div className="other" 
            style={{backgroundImage: `url('https://s3.ca-central-1.amazonaws.com/areisle-portfolio/${slug}.jpg')`}}>
            <p dangerouslySetInnerHTML={{__html: this.state.project.description}}></p>
            <ul className="project-tools">{icons}</ul>
            
            <ul className="project-demos">
              <li><ul className="project-categories">Category: {categories}</ul></li>
              <li><p>Collaborators: None</p></li>
              <li><p>Project Length: Ongoing</p></li>
              <li><p>Status: InProgress</p></li>
            </ul>
            <ul className="project-external-links">
              <li><a className="button" target="_blank" rel="noopener noreferrer" href="https://github.com/areisle">view on github</a></li>
              <li><a className="button" target="_blank" rel="noopener noreferrer" href="https://github.com/areisle">view live</a></li>
            </ul>
          </div>
        </section>
        <section className="project-highlights" id="hightlights">
          <h2>Hightlights</h2>
          <article>
            <h3>Server-Side</h3> {/*make this into diagram later */}
            <p>this was my first real forray into server side programming.</p>
            <p>database layer: I decided to use mysql for the database since I was already somewhat familiar with it through using wordpress</p>
            <p>Appplication layer: For this I used express to create a simple API that serves up projects</p>
            <p>Presentation layer: React</p>
          </article>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda delectus sint consequatur deserunt, eius corporis dolore 
            vero distinctio possimus laborum facilis cumque ipsam consequuntur illum aperiam cupiditate, veritatis, rem provident.Lorem 
            ipsum dolor sit amet consectetur, adipisicing elit. Commodi facere, ex error dolore libero sed dolorum rem itaque placeat et 
            voluptatum nihil asperiores sunt iusto, eum culpa voluptatem beatae expedita.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda delectus sint consequatur deserunt, eius corporis dolore 
            vero distinctio possimus laborum facilis cumque ipsam consequuntur illum aperiam cupiditate, veritatis, rem provident.Lorem 
            ipsum dolor sit amet consectetur, adipisicing elit. Commodi facere, ex error dolore libero sed dolorum rem itaque placeat et 
            voluptatum nihil asperiores sunt iusto, eum culpa voluptatem beatae expedita.</p>
        </section>
        <section className="project-gallery" id="gallery">
          <h2>Gallery</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda delectus sint consequatur deserunt, 
            eius corporis dolore vero distinctio possimus laborum facilis cumque ipsam consequuntur illum aperiam cupiditate, veritatis, 
            rem provident.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi facere, 
            ex error dolore libero sed dolorum rem itaque placeat et voluptatum nihil asperiores sunt iusto, 
            eum culpa voluptatem beatae expedita.</p>
        </section>
        <section className="project-critique" id="critique">
          <h2>Critique</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda delectus sint consequatur deserunt, eius corporis dolore 
            vero distinctio possimus laborum facilis cumque ipsam consequuntur illum aperiam cupiditate, veritatis, rem provident.Lorem 
            ipsum dolor sit amet consectetur, adipisicing elit. Commodi facere, ex error dolore libero sed dolorum rem itaque placeat et 
            voluptatum nihil asperiores sunt iusto, eum culpa voluptatem beatae expedita.</p>
        </section>

        <Link className="prev" to={`/portfolio/${this.props.prev}`}></Link>
        <Link className="next" to={`/portfolio/${this.props.next}`}></Link>
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