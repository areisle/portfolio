import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProject } from './api.js';
import { Slick } from './gallery.js';
import { Demos } from './project-demos.js';
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
  }
  scrollTo(ref) {
    this[ref].scrollIntoView({
      alignToTop: true,
      behavior: 'smooth'
    });
  }

  render () {
    let {name, tags, category, slug, background} = this.props.details;
    let project = this.state.project;
    let icons = tags.tools.map(tool => <li key={tool}><Icon name={tool}></Icon></li>);
    let categories = category.map(tool => (<li key={tool}>{tool}</li>));
    let sections = ['overview'];
    (project.highlights) ? sections.push('highlights'): '';    
    (project.gallery) ? sections.push('gallery'): '';
    (project.critique) ? sections.push('critique'): '';    
    let style = background ? {backgroundImage: `url('https://s3.ca-central-1.amazonaws.com/areisle-portfolio/${slug}.jpg')`}: {};
    console.log(project.gallery);
    let Gallery = (project.gallery) ? (
      <section ref="gallery" className="project-gallery" id="gallery">
        <h2>Gallery</h2>
        <Slick photos={project.gallery}/>
      </section>): "";
    return (
      <div className="project single" ref={(el) => this.project = el} id="project">
        <ProjectNav scroll={this.scrollTo} sections={sections}/>
        <section ref={el => this.overview = el} className="project-overview" id="overview">
          <h2 className="project-title">{name}</h2>
          <div className="other" 
            style={style}>
            <p dangerouslySetInnerHTML={{__html: this.state.project.description}}></p>
            <ul className="project-tools">{icons}</ul>
            <Demos categories={categories} status="InProgress"/>
            <ul className="project-external-links">
              <li><a className="button" target="_blank" rel="noopener noreferrer" href={project.github}>view on github</a></li>
              <li><a className="button" target="_blank" rel="noopener noreferrer" href={project.livelink}>view live</a></li>
            </ul>
          </div>
        </section>
        <Highlights dangerouslySetInnerHTML={{__html: this.state.project.highlights}} content={this.state.project.highlights}/>
        <GallerySection photos={project.gallery} show={(sections.includes('gallery'))}/>
        {/* <Section inputRef={el => this.highlights = el} name="highlights" title="Highlights" asHTML={true} content={project.highlights}/> */}
        {/* <Section inputRef={el => this.gallery = el} name="gallery" title="Gallery" asHTML={true} content={<Slick photos={project.gallery}/>}/> */}
        {/* {Gallery} */}
        <section ref="critique" className="project-critique" id="critique">
          <h2>Critique</h2>
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
const SectionOther = (Page, myprops) => {
  //if (!myprops.show) return;
  return (props =>
    <section ref={props.inputRef} className={`project-${myprops.name}`} id={myprops.name}>
      <h2>{myprops.title}</h2>
      <Page {...props} {...myprops}/>
    </section>
  );
};
const HOCSection = (Page, params) => {
  // do something with params
  if (!params.show) return true;
  if (params.asHTML) {
    return (props => 
      <section ref={props.inputRef} className={`project-${params.name}`} id={params.name}>
        <h2>{params.title}</h2>
        <article dangerouslySetInnerHTML={{__html: props.content}}/>
      </section>
    );
  } else {
    return (props => 
      <section ref={props.inputRef} className={`project-${params.name}`} id={params.name}>
        <h2>{params.title}</h2>
        <Page {...props}/>
      </section>
    );
  }
};
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
const GallerySection = HOCSect(Slick, 
  {
    'title': 'Gallery',
    'name': 'gallery'
  }
);
class Section extends Component {
  render () {
    let { name, title, content, asHTML, props } = this.props;
    console.log(content);
    let inner = (asHTML) ? (<article  dangerouslySetInnerHTML={{__html: content}}/>): (<article></article>);
    return (
      <section ref={this.props.inputRef} className={`project-${name}`} id={name}>
        <h2>{title}</h2>
        {inner}
      </section>
    );
  }
}

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
    let items = this.props.sections.map( section => (<li><a onClick={(e) => this.scrollTo(e, section)}>{section}</a></li>));
    return (
      <nav className={`project-nav ${this.state.open ? 'expanded':''}`}>
        <MenuIcon onClick={this.toggleOpen}/>
        <ul>
          {items}
        </ul>
      </nav>
    );
  }
}
export {Project, Overview};