import React, { useEffect, useState } from 'react'
import type { Contact, PaginatedResponse } from './types';
import { contactService } from './services/contactService';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import SearchBar from './components/SearchBar';

const App = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>(undefined);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchContacts();
  }, [currentPage, searchQuery]);

  const fetchContacts = async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');
      let response: PaginatedResponse<Contact>;

      if (searchQuery) {
        response = await contactService.searchContacts(searchQuery, currentPage);
      } else {
        response = await contactService.getAllContacts(currentPage);
      }

      setContacts(response.content);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (contact: Contact): Promise<void> => {
    try {
      setError('');
      if (selectedContact?.id) {
        await contactService.updateContact(selectedContact.id, contact);
      } else {
        await contactService.createContact(contact);
      }
      await fetchContacts();
      setShowForm(false);
      setSelectedContact(undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save contact');
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      setError('');
      await contactService.deleteContact(id);
      await fetchContacts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete contact');
    }
  };

  const handleExport = async (): Promise<void> => {
    try {
      setError('');
      const blob = await contactService.exportCSV();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'contacts.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export contacts');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Contact Book</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <SearchBar
          onSearch={setSearchQuery}
          onAdd={() => {
            setSelectedContact(undefined);
            setShowForm(true);
          }}
          onExport={handleExport}
        />

        {showForm && (
          <ContactForm
            contact={selectedContact}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setSelectedContact(undefined);
            }}
          />
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading contacts...</p>
          </div>
        ) : (
          <ContactList
            contacts={contacts}
            onEdit={(contact) => {
              setSelectedContact(contact);
              setShowForm(true);
            }}
            onDelete={handleDelete}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default App