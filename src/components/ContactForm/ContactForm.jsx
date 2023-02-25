
import React, { Component } from "react";
import './ContactForm.css';


class ContactForm extends Component{
  state = {
  name: '',
  number: '',
  }

  
  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value})};

  
  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ number: '', name: '', })
  };


  render() {
     const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="form">
<div className="group">
        <label className="label">
        Name
          <input
        onChange={this.handleInputChange}
         value={name}
        name="name"
        className="input"
        type="text"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
        </label>
        </div>

<div className="group">
        <label className="label">
          Number
            <input
      onChange={this.handleInputChange}
      value={number}
      name="number"
      type="tel"
      pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
      title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
      required
      />
        </label>
  </div>
        <button type="submit" className="btn_add">Add contact</button>
      </form>
      
     
    )
  }
};
 

export default ContactForm;