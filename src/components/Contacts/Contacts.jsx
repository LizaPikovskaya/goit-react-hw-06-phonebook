import {  Wrapper } from 'components/Phonebook/Phonebook.styled';
import { List } from './Contacts.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from 'redux/contactsSlice';

export const Contacts = () => {
  const data = useSelector(state => state.contacts);
  console.log(data);
  const filterValue = useSelector(state=> state.filter);
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


// Contacts.propTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ),
//   onDeleteUser: PropTypes.func,
// };
