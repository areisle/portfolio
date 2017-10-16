import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/normalize.css';
import './styles/index.css';
import {Overview, Project} from './project.js'
import {getProjectNames, getProjectOutlines, getProject} from './api.js';
import { BrowserRouter, Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

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
      console.log(data);
      this.setState({
        projects: data,
      });
    });
  }
  render () {
    let projects = this.props.projects.map(project => {
      return (<Overview details={project}></Overview>);
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
        <Route key={`/${project.slug}`} exact path={`/${project.slug}`} 
                render={() => <Project details={project} slug={project.slug} next={projects[next].slug} prev={projects[prev].slug}></Project>}/>
      );
    })
    return (
      <div className={`app-wrapper`} >
        <header className="header-nav">
          <h1><span className="short">ABBEY REISLE</span><span className="long">Abbey Reisle</span></h1>
          <nav className="main-nav">
            <ul>
              <li><Link key="portfolio" to={'/'}>Portfolio</Link></li>
              <li><Link key="about" to={'/'}>About</Link></li>
            </ul>
          </nav>
        </header>
        <main className={`main view-${this.state.layout}`}>
          <section className="panel panel-1">
          <Switch>
            <Route exact path='/' render={() => <ProjectsContainer projects={this.state.projects}></ProjectsContainer>}/>
            {routes}
          </Switch>
          </section>
          <section className="panel panel-2"></section>
        </main>
      </div>
    );
  }
}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));