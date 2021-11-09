import { Component } from 'react';
import { v4 as generateId } from 'uuid';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import Container from './components/Container';
import * as storage from './js/localStorage';

class App extends Component {
    state = {
        contacts: [],
        filter: '',
    };

    componentDidMount() {
        const contacts = storage.load(storage.LS_KEYS.contacts);
        contacts && this.setState({ contacts });
    }

    componentDidUpdate(prevProps, prevState) {
        const { contacts } = this.state;
        if (prevState.contacts !== contacts) {
            storage.save(storage.LS_KEYS.contacts, contacts);
        }
    }

    handleFormSubmit = userInfo =>
        this.setState(({ contacts }) => ({
            contacts: [
                ...contacts,
                {
                    id: generateId(),
                    ...userInfo,
                },
            ],
        }));

    handleFilterChange = e => this.setState({ filter: e.target.value });

    getFilteredContacts = () => {
        const { contacts, filter } = this.state;
        const normalizedFilter = filter.toLowerCase();
        return contacts.filter(({ name }) =>
            name.toLowerCase().includes(normalizedFilter),
        );
    };

    handleContactDelete = contactId =>
        this.setState(({ contacts }) => ({
            contacts: contacts.filter(({ id }) => id !== contactId),
        }));

    render() {
        const { contacts, filter } = this.state;

        return (
            <Container>
                <h1>Phonebook</h1>
                <ContactForm
                    onSubmit={this.handleFormSubmit}
                    contacts={[...contacts]}
                />

                <h2>Contacts</h2>
                <Filter value={filter} onChange={this.handleFilterChange} />
                <ContactList
                    contacts={this.getFilteredContacts()}
                    onContactDelete={this.handleContactDelete}
                />
            </Container>
        );
    }
}

export default App;
