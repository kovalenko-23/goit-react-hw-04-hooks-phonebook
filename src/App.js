import { Component } from "react";
import shortid from "shortid";
import styled from "@emotion/styled";
import ContactsForm from "./Components/ContactsForm/ContactsForm";
import ContactsList from "./Components/ContactList/ContactsList";
import { ContactsFilter } from "./Components/ContactsFilter/ContactsFilter";
import toast, { Toaster } from 'react-hot-toast';
import { FaBan } from "react-icons/fa";

const Wrapper = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
`;

export class App extends Component {
  state = {
    contacts: [ ],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({contacts: parsedContacts})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
 }

  handleOnSubmitForm = ({ name, number }) => {
    const contactsName = this.state.contacts.map((contact) => contact.name);

    if (contactsName.includes(name)) {
      toast.error(`You already have ${name} in your contacts!`, { icon: <FaBan fill='red'/>});
    } else {
      const newContact = {
        id: shortid.generate(),
        name,
        number,
      };

      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
      
      toast.success(`${name} added to your contacts!`)
    }
  };

  hendleFinder = (event) => {
    this.setState({ filter: event.currentTarget.value });
  };

  deleteContact = (id, name) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
    toast.success(`${name} removed from your contacts`)
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <Wrapper>
        <Toaster/>
        <h1>Phonebook</h1>
        <ContactsForm onSubmit={this.handleOnSubmitForm} />
        <h2>Contacts</h2>
        <ContactsFilter value={this.filter} onChange={this.hendleFinder} />
        <ContactsList
          contacts={visibleContacts}
          onDeleteButton={this.deleteContact}
        />
      </Wrapper>
    );
  }
}

export default App;
