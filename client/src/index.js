import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/normalize.css';
import './styles/index.css';
import { Project } from './project.js';
import { getProjectOutlines } from './api.js';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import {ContactForm} from './contact-form.js';
import {About} from './about.js';
//import ReactResizeDetector from 'react-resize-detector';
import {ProjectsContainer} from './projects-container.js';


class AboutContact extends Component {
  
}

class Portfolio extends Component {
  
}

class App extends Component {
  constructor() {
    super();
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
        <Route key={`/${project.slug}`} exact path={`/project/${project.slug}`} 
          render={() => <main className={`main view-${this.state.layout}`}><Project details={project} slug={project.slug} next={projects[next].slug} prev={projects[prev].slug}></Project></main>}/>
      );
    });
    return (
      <div className={`app-wrapper view view-${this.state.layout}`} >
        <header className="header-nav">
          <h1><span>Abbey Reisle</span></h1>
          <h2><span>web developer/designer</span></h2>
          <nav className="main-nav">
            <ul>
              <li><Link key="portfolio" to={'/portfolio'}>Portfolio</Link></li>
              <li><Link key="about" to={'/about-contact'}>About</Link></li>
            </ul>
          </nav>
        </header>
        
        <Switch>
          <Route exact path='/' render={() => {
            return (
              <div></div>
            );
          }}/>
          <Route exact path='/about-contact' render={() => {
            return (
              <main className={`main`}>
                <section className="panel panel-1 inactive">
                </section>
                <section className="panel panel-2 active">
                  <About></About>
                  <ContactForm></ContactForm>
                </section>               
              </main>
            );
          }}/>
          <Route exact path='/portfolio' render={() => {
            return (
              <main className={`main`}>
                <section className="panel panel-1 active">
                  <ProjectsContainer projects={this.state.projects}></ProjectsContainer>
                </section>
                <section className="panel panel-2 inactive">
                  <About></About>
                  <ContactForm></ContactForm>
                </section>
              </main>
            );
          }}/>
          {routes}
        </Switch>
      </div>
    );
  }
}

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root'));