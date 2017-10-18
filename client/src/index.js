import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/normalize.css';
import './styles/index.css';
import {Overview, Project} from './project.js'
import {getProjectNames, getProjectOutlines} from './api.js';
import { BrowserRouter, Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import {ContactForm} from './contact-form.js';
import {About} from './about.js';
//list of projects
class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      projects: [],
    }
    getProjectNames().then(data => {
      this.setState({
        names: data,
      });
    });
    getProjectOutlines().then(data => {
      this.setState({
        projects: data,
      });
    });
  }
  render () {
    let projects = this.props.projects.map(project => {
      return (<Overview key={project.slug} details={project}></Overview>);
    });
    return (
        <ul className="projects-container">
          {projects}
        </ul>
    );
  }
}




class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      layout: 'small',
      currentProject: {},
    }
    
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
    if (window.innerWidth >= 1200) {
      this.setState({layout: 'wide'});
    } else {
      this.setState({layout: 'small'});
    }
  }
  
  render () {
    let projects = this.state.projects;
    let length = projects.length;
    let routes = projects.map((project, index) => {
      let [prev, next] = [(index + length - 1)%length, (index + 1)%length];
      return (
        <Route key={`/${project.slug}`} exact path={`/project/${project.slug}`} 
                render={() => <Project details={project} slug={project.slug} next={projects[next].slug} prev={projects[prev].slug}></Project>}/>
      );
    })
    return (
      <div className={`app-wrapper`} >
        <header className="header-nav">
          <h1><span className="short">ABBEY REISLE</span><span className="long">Abbey Reisle</span></h1>
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
               <main className={`main view-${this.state.layout}`}>
                  <section className="panel panel-1">
                   <ProjectsContainer projects={this.state.projects}></ProjectsContainer>
                  </section>
                  <section className="panel panel-2">
                    <About></About>
                    <ContactForm></ContactForm>
                  </section>
               </main>
             );
          }}/>
          <Route exact path='/about-contact' render={() => {
             return (
               <main className={`main view-${this.state.layout}`}>
                  <section className="panel panel-1">
                   <ProjectsContainer projects={this.state.projects}></ProjectsContainer>
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
               <main className={`main view-${this.state.layout}`}>
                  <section className="panel panel-1 active">
                   <ProjectsContainer projects={this.state.projects}></ProjectsContainer>
                 </section>
                 <section className="panel panel-2">
                    <About></About>
                    <ContactForm></ContactForm>
                  </section>
               </main>
             );
          }}/>
          {routes}
       </Switch>
        {/*<!--
          <section className="panel panel-1">
          <Switch>
            <Route exact path='/' render={() => <ProjectsContainer projects={this.state.projects}></ProjectsContainer>}/>
            <Route exact path='/portfolio' render={() => <ProjectsContainer projects={this.state.projects}></ProjectsContainer>}/>
            <Route exact path='/about-contact' render={() => <ProjectsContainer projects={this.state.projects}></ProjectsContainer>}/>
            routes
          </Switch>
          </section>
          <section className="panel panel-2"><ContactForm></ContactForm></section>
-->*/}
      </div>
    );
  }
}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));