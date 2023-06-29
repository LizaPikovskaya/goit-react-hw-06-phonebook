import { useState } from 'react';
import { Button, Label, Wrapper } from './Phonebook.styled';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addUser } from 'redux/contactsSlice';


export const Phonebook = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const handleOnChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        throw new Error();
    }
  };
  const handleOnSubmit = event => {
    event.preventDefault();
    if(!name.trim() || !number.trim()) return toast.warn('Please,fill the field.')
    const arrayOfNames = [];
    contacts.forEach(user => {
      arrayOfNames.push(user.name.toLowerCase());
    });
    if (arrayOfNames.includes(name.toLowerCase())) {
      return toast.warn(`${name} is already in contacts.`);
    } else {
      dispatch(addUser(name, number));
    }
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
  return (
    <Wrapper>
      <ToastContainer />

      <form onSubmit={handleOnSubmit}>
        <Label>
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleOnChange}
          />
        </Label>
        <Label>
          <span>Number</span>
          <input
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleOnChange}
          />
        </Label>

        <Button type="submit">Add contact</Button>
      </form>
    </Wrapper>
  );
};

Phonebook.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
  onSubmit: PropTypes.func,
};
