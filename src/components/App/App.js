import React, { Component } from 'react';

import FormContacts from '../FormContacts/FormContacts';
import ContactsList from '../ContactsList/ContactsList';
import FilterContacts from '../FilterContacts/FilterContacts';

import styles from './App.module.css';

const filterContacts = (contacts, filter) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );
};

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    try {
      const localContacts = JSON.parse(localStorage.getItem('contacts'));
      if (localContacts) {
        this.setState({ contacts: localContacts });
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      try {
        localStorage.setItem('contacts', JSON.stringify(contacts));
      } catch (err) {
        console.log(err);
      }
    }
  }

  addNewContact = newContact => {
    this.setState(state => ({ contacts: [...state.contacts, newContact] }));
  };

  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  handleDeleteContact = id => {
    const { contacts } = this.state;
    const filteredContacts = contacts.filter(contact => contact.id !== id);

    this.setState({ contacts: filteredContacts });
  };

  render() {
    const { contacts, filter } = this.state;

    const filtredContacts = filterContacts(contacts, filter);
    return (
      <div className={styles.main_wrapper}>
        <h1>Phonebook</h1>
        <FormContacts addNewContact={this.addNewContact} contacts={contacts} />
        <h2>Contacts</h2>
        <FilterContacts filter={filter} handleFilter={this.handleFilter} />
        <ContactsList
          contacts={filtredContacts}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
