import ContactsItem from "../ContactsItem/ContactsItem";
import { List } from "./ContactList.styled";
import PropTypes from "prop-types";

const ContactsList = ({ contacts, onDeleteButton }) => {
  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <ContactsItem
          key={id}
          id={id}
          name={name}
          number={number}
          onDeleteButton={onDeleteButton}
        />
      ))}
    </List>
  );
};

export default ContactsList;

ContactsList.propTypes = {
  contonDeleteButtonacts: PropTypes.func,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};
