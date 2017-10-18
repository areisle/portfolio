import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './styles/contact-form.css';
import {isEmail, isEmpty, isAlpha, isAlphanumeric} from 'validator';
import {sendEmail} from './api.js';
class ContactForm extends Component {
  constructor() {
    super();
    this.state = {
      firstname: {content:'', errors: false, empty: true, valid: false, pristine: true},
      lastname: {content:'', errors: false, empty: true, valid: false, pristine: true},
      company: {content:'', errors: false, empty: true, valid: true, pristine: true},
      email: {content:'', errors: false, empty: true, valid: false, pristine: true},
      message: {content:'', errors: false, empty: true, valid: false, pristine: true},
      valid: false,
      fireRedirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validateItem = this.validateItem.bind(this);
    this.validate = this.validate.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const input = this.state[target.name];
    const content = target.type === 'checkbox' ? target.checked : target.value;
    input.errors = !this.validateItem(target.name, content);
    input.valid = !input.errors;
    input.content = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: input
    });
    this.setState({
      valid: this.validate()
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log('submitted');
    sendEmail(document.getElementById('contact-form')).then(response => this.setState({ fireRedirect: true }));
  }
  validate() {
    const fields = ['firstname', 'lastname', 'company', 'email', 'message'];
    let valid = true;
    fields.forEach(field => {
      if (!this.state[field].valid) 
        valid = false;
    });
    return valid;
  }
  handleBlur(event) {
    const target = event.target;
    const input = this.state[target.name];
    input.empty = (input.content === '');
    input.pristine = false;
    input.errors = !this.validateItem(target.name, input.content);
    this.setState({
      [target.name]: input
    });
    //if filled, add class
    //if errors, add errors
  }
  validateItem(item, value) {
    return (
      (item === 'email') ? isEmail(value):
      (item === 'firstname' || item === 'lastname') ? isAlpha(value):
      (item === 'company') ? (isEmpty(value) || isAlphanumeric(value)):
      (item === 'message') ? !isEmpty(value): false
    );
  }
  render() {
    const { firstname, lastname, message, company, email, fireRedirect } = this.state;
    //const { from } = this.props.location.state || '/';
    ///console.log(this.props.location.state);
    return (
      <div>
        <form className="contact-form" id="contact-form" onSubmit={this.handleSubmit} method="post">
          <h2>Contact</h2>
          <input type="hidden" name="subject" value="message from contact form"/>
         <div className="row">
            <Input name="First Name" slug="firstname" value={firstname}  required={true} change={this.handleChange} blur={this.handleBlur} error="First Name Must be at least 2 Characters and contain only letters"></Input>
            <Input name="Last Name" slug="lastname" value={lastname}  required={true} change={this.handleChange} blur={this.handleBlur} error="Last Name Must be at least 2 Characters and contain only letters"></Input>
          </div>
          <div className="row">
           <Input name="Company" slug="company" value={company} change={this.handleChange} blur={this.handleBlur} error="Company Name may only contain letters and numbers"></Input>
          </div>
          <div className="row">
            <Input name="Email" slug="email" value={email}  required={true} change={this.handleChange} blur={this.handleBlur} error="Must Be a Valid Email Address"></Input>
          </div>
          <div className="row">
            <Textarea type="textarea" name="Message" slug="message" value={message}  required={true} change={this.handleChange} blur={this.handleBlur} error="Message is required"></Textarea>
          </div>
          <div className="row">
            <input className={``} 
                   type="submit" 
                   id="submit" 
                   name="submit" 
                   value="send"
                   disabled={this.valid}/>
          </div>
        </form>
        {fireRedirect && (
          <Redirect to={ '/project/band'}/>
        )}
      </div>					
    );
  }
}
function Textarea(props) {
  return (
    <span className={`input input--haruki ${props.required ? "required": "optional"} ${(props.value.empty && !props.value.errors) ? "":"input--filled"} ${props.value.errors ? "input--errors":""}`}>
      <textarea className={`input__field input__field--haruki `} 
             type="text" id={props.slug} 
             name={props.slug} 
             value={props.value.content} 
             onChange={props.change}
             onBlur={props.blur}></textarea>
      <label className="input__label input__label--haruki" htmlFor={props.slug}>
        <span className="input__label-content input__label-content--haruki">{props.name}</span>
      </label>
      <Error show={props.value.errors && !props.value.pristine} message={props.error}></Error>
    </span>
  );
}
function Input(props) {
  return (
    <span className={`input input--haruki ${props.required ? "required": "optional"} ${(props.value.empty && !props.value.errors) ? "":"input--filled"} ${props.value.errors ? "input--errors":""}`}>
      <input className={`input__field input__field--haruki `} 
             type="text" id={props.slug} 
             name={props.slug} 
             value={props.value.content} 
             onChange={props.change}
             onBlur={props.blur}/>
      <label className="input__label input__label--haruki" htmlFor={props.slug}>
        <span className="input__label-content input__label-content--haruki">{props.name}</span>
      </label>
      <Error show={props.value.errors && !props.value.pristine} message={props.error}></Error>
    </span>
  );
}

function Error(props) {
  if (props.show) {
    return (<p className="error-message">{props.message}</p>)
  }
  return null;
}
export {ContactForm};
