import { Wrapper, Filterlabel, FilterInput } from "./ContactsFilter.styled";
import PropTypes from "prop-types";

export const ContactsFilter = ({ value, onChange }) => {
  return (
    <Wrapper>
      <Filterlabel>
        Find
        <FilterInput
          type="text"
          name="message"
          value={value}
          onChange={onChange}
        />
      </Filterlabel>
    </Wrapper>
  );
};

ContactsFilter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
