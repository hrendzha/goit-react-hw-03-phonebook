import { Component } from 'react';
import { v4 as generateId } from 'uuid';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import Container from './components/Container';

class App extends Component {
    state = {
        contacts: [],
        filter: '',
    };

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

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextState);
        return false;
    }

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
