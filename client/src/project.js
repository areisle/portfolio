import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProject } from './api.js';
import { Slick } from './gallery.js';
import { Demos } from './project-demos.js';
import { RightArrow, LeftArrow, DiagonalArrow, Icon } from './icons.js';
/**
 * Component to display the overview of a project 
 * that will be seen on the portfolio page
 * @extends Component
 */
class Overview extends Component {
  render() {
    let {name, category, tags, slug, background} = this.props.details;
    let icons = tags.tools.map(tool => <li key={tool}><Icon name={tool}
    ></Icon></li>);
    let style = background ? {backgroundImage: `url('https://s3.ca-central-1.amazonaws.com/areisle-portfolio/${slug}.jpg')`}: {};
    return (
      <li className="project" 
        category={category} 
        tools={tags.tools}
        style={style} >
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
      project: {description: 'test'},
      open: false,
      hasGallery: false
    };
    getProject(slug).then(data => {
      let hasGallery = (data.gallery !== null);
      this.setState({
        project: data,
        hasGallery: hasGallery
      });
    });
    this.scrollTo = this.scrollTo.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  scrollTo(ref) {
    this[ref].scrollIntoView({
      alignToTop: true,
      behavior: 'smooth'
    });
  }
  handleScroll(e) {
    console.log(this.overview.offsetTop);
    
  }
  render () {
    let {name, tags, category, slug, background} = this.props.details;
    let project = this.state.project;
    let icons = tags.tools.map(tool => <li key={tool}><Icon name={tool}></Icon></li>);
    let categories = category.map(tool => (<li key={tool}>{tool}</li>));
    let sections = ['overview'];
    if (project.highlights) sections.push('highlights');    
    if (project.gallery) sections.push('gallery');
    if (project.critique) sections.push('critique');    
    let style = background ? {backgroundImage: `url('https://s3.ca-central-1.amazonaws.com/areisle-portfolio/${slug}.jpg')`}: {};
    
    return (
      <div 
        className="project single" 
        ref={(el) => this.project = el}
        onScroll={this.handleScroll}
        id="project"
      >
        <ProjectNav scroll={this.scrollTo} sections={sections} livelink={project.livelink} github={project.github}/>
        <section ref={el => this.overview = el} className="project-overview" id="overview">
          <h2 className="project-title">{name}</h2>
          <div className="other" 
            style={style}>
            <p dangerouslySetInnerHTML={{__html: this.state.project.description}}></p>
            <ul className="project-tools">{icons}</ul>
            <Demos categories={categories} status="InProgress"/>
            <ul className="project-external-links">
              <li><a className="button" target="_blank" rel="noopener noreferrer" href={project.github}>view on github <DiagonalArrow/></a></li>
              <li><a className="button" target="_blank" rel="noopener noreferrer" href={project.livelink}>view live <DiagonalArrow/></a></li>
            </ul>
          </div>
        </section>
        <Highlights
          inputRef={el => this.highlights = el} 
          content={this.state.project.highlights} 
          show={(sections.includes('highlights'))}
        />
        <Gallery 
          inputRef={el => this.gallery = el}                     
          photos={project.gallery} 
          show={(sections.includes('gallery'))}
        />
        <Critique
          inputRef={el => this.critique = el}                   
          content={this.state.project.critique} 
          show={(sections.includes('critique'))}
        />
        <Link className="prev" to={`/portfolio/${this.props.prev}`}><LeftArrow/></Link>
        <Link className="next" to={`/portfolio/${this.props.next}`}><RightArrow/></Link>
        
      </div>
    );
  }
}

const HOCSect = (Page, params) => {
  // do something with params
  if (params.asHTML) {
    return (props => {
      if (!props.show) return true;
      return (
        <section ref={props.inputRef} className={`project-${params.name}`} id={params.name}>
          <h2>{params.title}</h2>
          <article dangerouslySetInnerHTML={{__html: props.content}}/>
        </section>);
    });
  } else {
    return (props => {
      if (!props.show) return true;
      return (
        <section ref={props.inputRef} className={`project-${params.name}`} id={params.name}>
          <h2>{params.title}</h2>
          <Page {...props}/>
        </section>);
    });    
  }
};
const Highlights = HOCSect('article', 
  {'asHTML': true,
    'title': 'Highlights',
    'name': 'highlights'
  }
);
const Critique = HOCSect('article', 
  {'asHTML': true,
    'title': 'Critique',
    'name': 'critique'
  }
);
const Gallery = HOCSect(Slick, 
  {
    'title': 'Gallery',
    'name': 'gallery'
  }
);

/**
 * Component to display an icon
 * @extends Component
 */
class MenuIcon extends Component {
  //leave as this for now, but possibly add link or button wrapper later
  render () {
    return (
      <button onClick={this.props.onClick}>
        <div className="menu-icon">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </button>
    );
  }
}

/**
 * Component to display an icon
 * @extends Component
 */
class ProjectNav extends Component {
  //leave as this for now, but possibly add link or button wrapper later
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.toggleOpen = this.toggleOpen.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
  }
  
  scrollTo(e, ref) {
    e.preventDefault();
    this.props.scroll(ref);
    this.toggleOpen();
  }

  toggleOpen() {
    this.setState({
      'open': !this.state.open
    });
  }

  render () {
    let items = this.props.sections.map( section => (<li key={section}><a href={`#${section}`} onClick={(e) => this.scrollTo(e, section)}>{section}</a></li>));
    let github = (this.props.github !== "none") ? <li className="external-link"><a className="button" target="_blank" rel="noopener noreferrer" href={this.props.github}>github<DiagonalArrow/></a></li> : "";
    let livelink = (this.props.livelink !== "none") ? <li className="external-link"><a className="button" target="_blank" rel="noopener noreferrer" href={this.props.livelink}>live<DiagonalArrow/></a></li> : "";
    return (
      <nav className={`project-nav ${this.state.open ? 'expanded':''}`}>
        <MenuIcon onClick={this.toggleOpen}/>
        <ul>
          {items}
          {livelink}
          {github}
        </ul>
      </nav>
    );
  }
}
export {Project, Overview};