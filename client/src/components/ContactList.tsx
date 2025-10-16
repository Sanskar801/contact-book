import React from 'react'
import ContactCard from './ContactCard';
import type { Contact } from '../types';

type ContactListProps = {
    contacts: Contact[];
    onEdit: (contact: Contact) => void;
    onDelete: (id: number) => void;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const ContactList = ({ contacts, onEdit, onDelete, currentPage, totalPages, onPageChange }: ContactListProps) => {

    if (contacts.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500 text-lg">No contacts found</p>
            </div>
        );
    };

    return (
    <div>
      <div className="grid gap-4 mb-6">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50 hover:bg-gray-400 transition-colors"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-800">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50 hover:bg-gray-400 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContactList