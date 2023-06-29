import {  Wrapper } from 'components/Phonebook/Phonebook.styled';
import { List } from './Contacts.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from 'redux/contactsSlice';
import { selectContacts, selectFilter } from 'redux/selectots';

export const Contacts = () => {
  const data = useSelector(selectContacts);
  const filterValue = useSelector(selectFilter);
  const dispatch = useDispatch();
  const filterUser = () => {
    return data.filter(({ name }) =>
      name.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  const visibleUsers = filterUser();
  return (
    <Wrapper>
      <List>
        {visibleUsers.map(({ id, name, number }) => (
          <li key={id}>
            {name}: {number}
            <button type="button" onClick={() => dispatch(deleteUser(id))}>
              Delete
            </button>
          </li>
        ))}
      </List>
    </Wrapper>
  );
};


