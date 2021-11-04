import PropTypes from 'prop-types';
import ContactListItem from '../ContactListItem';
import s from './ContactList.module.css';

function ContactList({ contacts, onContactDelete }) {
    return (
        <ul>
            {contacts.map(({ id, name, number }) => (
                <li className={s.listItem} key={id}>
                    <ContactListItem
                        name={name}
                        number={number}
                        onClick={() => onContactDelete(id)}
                    />
                </li>
            ))}
        </ul>
    );
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    onContactDelete: PropTypes.func.isRequired,
};

export default ContactList;
