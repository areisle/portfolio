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

function MainOld(props) {
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
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    //add resize event listener
    this.updateLayout();
    window.addEventListener('resize', this.updateLayout);
    this.app = document.querySelector('.app-wrapper');
  }
  
  updateLayout() {
    this.setState({
      layout: (window.innerWidth >= 1200) ? 'wide': 'small'
    });
  }
  handleScroll(up) {
    if (!up) {
      this.app.classList.add('hide-on-scroll');
    } else {
      this.app.classList.remove('hide-on-scroll');
    }
    
    
  }
  render () {
    let projects = this.state.projects;
    let length = projects.length;
    let routes = projects.map((project, index) => {
      let [prev, next] = [(index + length - 1)%length, (index + 1)%length];
      return (
        <Route key={`${project.slug}`} exact path={`/portfolio/${project.slug}`}
          component={MainShell(Project, 
            {'onScroll': this.handleScroll, 
              'details': project, 
              'next': projects[next].slug, 
              'prev': projects[prev].slug})
          }/>
      );
    });
    return (
      <div className={`app-wrapper view view-${this.state.layout} ${(this.props.location.pathname === '/') ? 'home':''}`} >
        <div className="header-nav">
          <NavLink key="home" to={'/'} activeClassName="hide" className={`main-title`}>
            <header>
              <h1>Abbey Reisle</h1>
              <p>web developer/designer</p>
            </header>
          </NavLink>
          <nav className={`main-nav`}>
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
          >
            <Switch location={this.props.location}>
              <Route exact path='/' component={MainOld}/>
              <Route exact path='/about-contact' component={MainShell(AboutContact, {'onScroll': this.handleScroll})}/>
              <Route exact path='/portfolio' component={MainShell(ProjectsContainer, {'onScroll': this.handleScroll, 'projects': this.state.projects})}/>
              {routes}  
            </Switch>
          </CSSTransition>
        </TransitionGroup> 
      </div>
    );
  }
}
export default withRouter(App);
