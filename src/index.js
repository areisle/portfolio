import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/normalize.css';
import './styles/index.css';

import {getProjectNames, getProjectOutlines} from './api.js';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

function Test(props) {
  return (<div>testing 1 2 3</div>);
}
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
    let projects = this.state.projects.map(project => {
      let {name, category, tags} = project;
      return (<li key={name} className="project" category={category} tags={tags}>{name}</li>);
    });
    return (
        <ul className="projects-container">
          {projects}
        </ul>
    );
  }
}
class List extends Component {
  constructor (props) {
    super(props);
    //set state with fetch?
    this.state = {
      names: [],
    }
    
    getProjectNames().then(data => {
      this.setState({
        names: data,
      });
    });
      
  }
  render () {
    let listitems = this.state.names.map(name => (<li>{name}</li>));
    return (
      <ul>{listitems}</ul>
    );
  }
}
class App extends Component {
  render () {
    return (
      <section className="projects-container-wrapper">
      <Switch>
         
        <Route exact path='/' component={ProjectsContainer}/>
        
      </Switch>
      </section>
    );
  }
}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));