import React, { Component } from 'react';
import './styles/contact-form.css';
class ContactForm extends Component {
  constructor() {
    super();
    this.state = {
      firstname: {content:'', errors: false, empty: true},
      lastname: {content:'', errors: false, empty: true},
      company: {content:'', errors: false, empty: true},
      email: {content:'', errors: false, empty: true},
      message: {content:'', errors: false, empty: true}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const input = this.state[target.name];
    const content = target.type === 'checkbox' ? target.checked : target.value;
    //vaildate content
    input.content = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: input
    });
  }
  handleSubmit() {
    
  }
  handleBlur(event) {
    const target = event.target;
    const input = this.state[target.name];
    input.empty = (input.content === '');
    this.setState({
      [target.name]: input
    });
    //if filled, add class
    //if errors, add errors
  }
  validate() {
    
  }
  render() {
    return (
        <form className="contact-form" action="/my-handling-htmlForm-page" method="post">
          <h2>Contact</h2>
         <div className="row">
          <span className={`input input--haruki ${this.state.firstname.empty ? "":"input--filled"}`}>
            <input className={`input__field input__field--haruki `} 
                   type="text" id="firstname" 
                   name="firstname" 
                   value={this.state.firstname.content} 
                   onChange={this.handleChange}
                   onBlur={this.handleBlur}/>
            <label className="input__label input__label--haruki" htmlFor="firstname">
              <span className="input__label-content input__label-content--haruki">First Name</span>
            </label>
          </span>
          <span className={`input input--haruki ${this.state.lastname.empty ? "":"input--filled"}`}>
            <input className={`input__field input__field--haruki `} 
                   type="text" id="lastname" 
                   name="lastname" 
                   value={this.state.lastname.content} 
                   onChange={this.handleChange}
                   onBlur={this.handleBlur}/>
            <label className="input__label input__label--haruki" htmlFor="lastname">
              <span className="input__label-content input__label-content--haruki">Last Name</span>
            </label>
          </span>
          </div>
          <div className="row">
          <span className={`input input--haruki ${this.state.company.empty ? "":"input--filled"}`}>
            <input className={`input__field input__field--haruki `} 
                   type="text" id="company" 
                   name="company" 
                   value={this.state.company.content} 
                   onChange={this.handleChange}
                   onBlur={this.handleBlur}/>
            <label className="input__label input__label--haruki" htmlFor="company">
              <span className="input__label-content input__label-content--haruki">Company</span>
            </label>
          </span>
          </div>
          <div className="row">
          <span className={`input input--haruki ${this.state.email.empty ? "":"input--filled"}`}>
            <input className={`input__field input__field--haruki `} 
                   type="email" id="email" 
                   name="email" 
                   value={this.state.email.content} 
                   onChange={this.handleChange}
                   onBlur={this.handleBlur}/>
            <label className="input__label input__label--haruki" htmlFor="email">
              <span className="input__label-content input__label-content--haruki">E-mail</span>
            </label>
          </span>
          </div>
          <div className="row">
          <span className={`input input--haruki ${this.state.message.empty ? "":"input--filled"}`}>
            <textarea className={`input__field input__field--haruki `} 
                      id="message" 
                      name="message"
                      value={this.state.message.content}
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}>
            </textarea>
            <label className="input__label input__label--haruki" htmlFor="message">
              <span className="input__label-content input__label-content--haruki">Message</span>
            </label>
          </span>
          <input className={`input__field input__field--haruki`} 
                   type="submit" 
                   id="submit" 
                   name="submit" 
                   value="send" 
                   onClick={this.handleSubmit}/>
          </div>
        </form>						
    );
  }
}
export {ContactForm};
