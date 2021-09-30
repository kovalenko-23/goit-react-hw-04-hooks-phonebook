import { useEffect, useState } from 'react';
import shortid from 'shortid';
import styled from '@emotion/styled';
import ContactsForm from './Components/ContactsForm/ContactsForm';
import ContactsList from './Components/ContactList/ContactsList';
import { ContactsFilter } from './Components/ContactsFilter/ContactsFilter';
import toast, { Toaster } from 'react-hot-toast';
import { FaBan } from 'react-icons/fa';

const Wrapper = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  margin-left: auto;
  margin-right: auto;
`;

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const handleOnSubmitForm = (name, number) => {
    const contactsName = contacts.map(contact => contact.name);
    if (contactsName.includes(name)) {
      toast.error(`You already have ${name} in your contacts!`, {
        icon: <FaBan fill="red" />,
      });
    } else {
      const newContact = {
        id: shortid.generate(),
        name,
        number,
      };

      setContacts(contacts => [newContact, ...contacts]);
      toast.success(`${name} added to your contacts!`);
    }
  };

  const hendleFinder = event => {
    setFilter(event.currentTarget.value);
  };

  const deleteContact = (id, name) => {
    const filteredContacts = contacts.filter(contact => contact.id !== id);
    setContacts(filteredContacts);
    toast.success(`${name} removed from your contacts`);
  };

  const getVisibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter),
  );

  return (
    <Wrapper>
      <Toaster />
      <h1>Phonebook</h1>
      <ContactsForm onSubmit={handleOnSubmitForm} />
      <h2>Contacts</h2>
      <ContactsFilter value={filter} onChange={hendleFinder} />
      <ContactsList
        contacts={getVisibleContacts}
        onDeleteButton={deleteContact}
      />
    </Wrapper>
  );
}

export default App;
