import React, { useState } from 'react'

type SearchBarProps = {
    onSearch: (query: string) => void;
    onAdd: () => void;
    onExport: () => void;
}

export default function SearchBar({ onSearch, onAdd, onExport }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value);
        onSearch(value);
    }

    return (
        <div className="flex gap-4 mb-6">
            <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={query}
                onChange={handleSearchChange}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={onAdd}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Add Contact
            </button>
            <button
                onClick={onExport}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
                Export CSV
            </button>
        </div>
    );
};