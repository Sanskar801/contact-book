import React, { useEffect, useState } from 'react'
import type { Contact } from '../types'

type ContactFormProps = {
    contact?: Contact;
    onSave: (contact: Contact) => void;
    onCancel: () => void;
}

export default function ContactForm({ contact, onSave, onCancel }: ContactFormProps) {
    const [formData, setFormData] = useState<Contact>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        profilePicUrl: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (contact) {
            setFormData(contact);
        }
    }, [contact]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError('');

        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            setError('First name and last name are required');
            return;
        }

        try {
            setLoading(true);
            await onSave(formData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save contact');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-h-96 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">
                    {contact ? 'Edit Contact' : 'Add New Contact'}
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name *"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="url"
                        name="profilePicUrl"
                        placeholder="Profile Picture URL"
                        value={formData.profilePicUrl}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
