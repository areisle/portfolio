import React, { Component } from 'react';
import './styles/normalize.css';
import './styles/index.css';
import { Project } from './project.js';
import { getProjectOutlines } from './api.js';
import { NavLink, Switch, Route, withRouter } from 'react-router-dom';
import {ContactForm} from './contact-form.js';
import {About} from './about.js';
//import ReactResizeDetector from 'react-resize-detector';
import {ProjectsContainer} from './projects-container.js';
import MainShell from './page-shell.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
function AboutContact(props) {
  return (
    <div>
      <About {...props}/>
      <ContactForm {...props}/>
    </div>
  );
}
function Main(props) {
  return (
    <header className="main">
      <h1>Abbey Reisle</h1>
      <p>web developer/designer</p>
    </header>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      layout: 'small',
      currentProject: {},
    };
    
    getProjectOutlines().then(data => {
      this.setState({
        projects: data,
      });
    });
    
    this.updateLayout = this.updateLayout.bind(this);
  }
  componentDidMount() {
    //add resize event listener
    this.updateLayout();
    window.addEventListener('resize', this.updateLayout);
  }
  
  updateLayout() {
    this.setState({
      layout: (window.innerWidth >= 1200) ? 'wide': 'small'
    });
  }
  
  render () {
    let projects = this.state.projects;
    let length = projects.length;
    let routes = projects.map((project, index) => {
      let [prev, next] = [(index + length - 1)%length, (index + 1)%length];
      return (
        <Route key={`${project.slug}`} exact path={`/portfolio/${project.slug}`} 
          render={() => <main className="main"><Project details={project} slug={project.slug} next={projects[next].slug} prev={projects[prev].slug}></Project></main>}/>
      );
    });
    return (
      <div className={`app-wrapper view view-${this.state.layout} ${(this.props.location.pathname === '/') ? 'home':''}`} >
        <div className="header-nav">
          <NavLink key="home" to={'/'} activeClassName="hide" className="main-title">
            <header>
              <h1>Abbey Reisle</h1>
              <p>web developer/designer</p>
            </header>
          </NavLink>
          <nav className="main-nav">
            <ul>
              <li><NavLink key="portfolio" to={'/portfolio'}><span>Portfolio</span></NavLink></li>
              <li><NavLink key="about" to={'/about-contact'}><span>About</span></NavLink></li>
            </ul>
          </nav>
        </div>
        <TransitionGroup>
          
          <CSSTransition key={this.props.location.key}
            classNames='fade'
            timeout={{enter: 1000, exit: 1000}}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
          >
            <Switch location={this.props.location}>
              <Route exact path='/' component={Main}/>
              <Route exact path='/about-contact' component={MainShell(AboutContact)}/>
              <Route exact path='/portfolio' component={MainShell(ProjectsContainer, {'projects': this.state.projects})}/>
              {routes}  
            </Switch>
          </CSSTransition>
        </TransitionGroup> 
      </div>
    );
  }
}
export default withRouter(App);

