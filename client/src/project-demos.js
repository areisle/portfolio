import React, { Component } from 'react';

class Demos extends Component {
  
  render () {
    let {length, status, categories, collaborators} = this.props;
    length = (length) ? (<li><p>Project Length: {length}</p></li>) : "";
    status = (status) ? (<li><p>Status: {status}</p></li>) : "";
    categories = (categories) ? (<li><ul className="project-categories">Category: {categories}</ul></li>) : "";
    collaborators = (collaborators) ? (<li><p>Collaborators: {collaborators}</p></li>) : "";    
    return (   
      <ul className="project-demos">
        {categories}
        {collaborators}
        {length}
        {status}
      </ul>
    );
    
  }
}

export {Demos};