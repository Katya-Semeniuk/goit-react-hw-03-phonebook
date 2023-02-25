
import React, {Component} from "react";
import  ContactForm  from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { nanoid } from 'nanoid';


class App extends Component{
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: ''
  };
  
  addContact = ({ name, number }) => {
    const contactEl = {
      id: nanoid(),
      name,
      number,
    }
    console.log(contactEl)

       if (contactEl) {
      this.setState(({ contacts }) => ({
      contacts: [...contacts, contactEl]
      }))
    }
    else { alert(`${name}is already in contacts`)}
  };

  changeFilter = e => { 
    this.setState({filter: e.currentTarget.value});
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();
    
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter));
   };

  deleteContact = contactId => { 
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact=>contact.id!==contactId),
    }))
  };

   componentDidUpdate(prevState) {
  if (this.state.contacts !== prevState.contacts) {
    console.log('changed contacts')
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
   }
  };

  componentDidMount() { 
    const contactsFromLocalSt = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsFromLocalSt);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts })
    }
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
   
    return (
      <div className="container"
        style={{
        height: '100vh',
          display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChangeFilter={this.changeFilter} />
        <ContactList arrayContact={visibleContacts} onDeleteContact={this.deleteContact} />
    </div>)
  }
}

export default App;