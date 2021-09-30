import { Contact, ContactItem, DeleteContactBtn } from './ContactsItem.styled';
import PropTypes from 'prop-types';

const ContactsItem = ({ id, name, number, onDeleteButton }) => {
  return (
    <Contact id={id}>
      <ContactItem>{name}:</ContactItem>
      <ContactItem>{number}</ContactItem>
      <DeleteContactBtn type="button" onClick={() => onDeleteButton(id, name)}>
        Delete
      </DeleteContactBtn>
    </Contact>
  );
};

export default ContactsItem;

ContactsItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  onDeleteButton: PropTypes.func,
};
