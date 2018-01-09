import React, { Component } from 'react';
import './styles/normalize.css';
import './styles/index.css';
import { Project } from './project.js';
import { getProjectOutlines } from './api.js';
import { NavLink, Switch, Route, withRouter } from 'react-router-dom';
import { ContactForm } from './contact-form.js';
import {About} from './about.js';
//import ReactResizeDetector from 'react-resize-detector';
import {ProjectsContainer} from './projects-container.js';
import withMain from './wrapper.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { MainNav } from './navigation-main.js';
function AboutContact(props) {
  return (
    <div className="contact-page">
      <About {...props}/>
      <ContactForm {...props}/>
    </div>
  );
}

function MainOld(props) {
  return (
    <header className="main">
      <h1 className="name">A<span>bb</span>ey Reisle</h1>
      <p className="title">we<span>b</span> developer/designer</p>
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
  }

  componentDidMount() {
    //add resize event listener
    this.updateLayout();
    window.addEventListener('resize', this.updateLayout);
    this.app = document.querySelector('.app-wrapper');
  }
  
  updateLayout = () => {
    this.setState({
      layout: (window.innerWidth >= 1200) ? 'wide': 'small'
    });
  }

  handleScroll = (up) => {
    if (!up) {
      this.app.classList.add('hide-on-scroll');
    } else {
      this.app.classList.remove('hide-on-scroll');
    }
  }

  animateSlide = (dir) => {
    if (dir === 'left') {
      this.app.classList.add('left');
      this.app.classList.remove('right');
    } else if (dir === 'right') {
      this.app.classList.add('right');
      this.app.classList.remove('left');
    } else {
      this.app.classList.remove('left');
      this.app.classList.remove('right');
    }
  }
  render () {
    let projects = this.state.projects;
    let length = projects.length;
    let slugs = projects.map(project => project.slug);
    let path = this.props.location.pathname.split('/');
    let subcat = path.pop();
    let cat = path.pop();
    let isProject = (cat && subcat) ? "isProject": "";
    return (
      <div className={`app-wrapper view view-${this.state.layout} ${isProject}`}>
        <MainNav handleScroll={this.handleScroll}/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key}
            classNames='fade'
            timeout={{enter: 1000, exit: 1000}}
          >
            <Switch location={this.props.location}>
              <Route exact path='/' component={MainOld}/>
              <Route exact path='/about-contact'
                component={withMain(AboutContact, 
                  { 'onScroll': this.handleScroll, 
                    'setScroll': () => this.handleScroll(true)})
                }
              />
              <Route exact path='/portfolio' 
                component={withMain(ProjectsContainer, 
                  { 'onScroll': this.handleScroll, 
                    'setScroll': () => this.handleScroll(true), 
                    'projects': this.state.projects})
                }
              />
              <Route exact path='/portfolio/:project'
                component={withMain(Project, 
                  {'onScroll': this.handleScroll,
                    'projects': slugs, 
                    'slide': this.animateSlide })
                }
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup> 
      </div>
    );
  }
}

export default withRouter(App);