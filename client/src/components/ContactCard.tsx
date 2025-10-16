import React from 'react'
import type { Contact } from '../types'

type ContactCardProps = {
    contact: Contact;
    onEdit: (contact: Contact) => void;
    onDelete: (id: number) => void;
}

const ContactCard = ({ contact, onEdit, onDelete }: ContactCardProps) => {
    const handleDelete = () => {
        if (contact.id && window.confirm('Are you sure you want to delete this contact?')) {
            onDelete(contact.id);
        }
    };

    return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {contact.firstName} {contact.lastName}
          </h3>
          {contact.email && (
            <p className="text-sm text-gray-600">
              <strong>Email:</strong> {contact.email}
            </p>
          )}
          {contact.phone && (
            <p className="text-sm text-gray-600">
              <strong>Phone:</strong> {contact.phone}
            </p>
          )}
          {contact.address && (
            <p className="text-sm text-gray-600">
              <strong>Address:</strong> {contact.address}
            </p>
          )}
          {contact.group && (
            <p className="text-xs text-blue-600 mt-2">
              Group: {contact.group.name}
            </p>
          )}
        </div>
        {contact.profilePicUrl && (
          <img
            src={contact.profilePicUrl}
            alt={`${contact.firstName} ${contact.lastName}`}
            className="w-16 h-16 rounded-full object-cover ml-4"
          />
        )}
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(contact)}
          className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard