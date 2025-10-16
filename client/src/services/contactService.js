import axios from 'axios';

// const API_URL = '/api/contacts/';

const API_URL = 'http://localhost:8080/api/contacts';

export const contactService = {
  // Get all contacts with pagination
  getAllContacts: (page = 0, size = 10, sortBy = 'firstName') => 
    axios.get(`${API_URL}?page=${page}&size=${size}&sortBy=${sortBy}`),
  
  // Search contacts
  searchContacts: (query, page = 0, size = 10) => 
    axios.get(`${API_URL}/search?query=${query}&page=${page}&size=${size}`),
  
  // Get contact by ID
  getContactById: (id) => 
    axios.get(`${API_URL}/${id}`),
  
  // Create contact
  createContact: (contact) => 
    axios.post(API_URL, contact),
  
  // Update contact
  updateContact: (id, contact) => 
    axios.put(`${API_URL}/${id}`, contact),
  
  // Delete contact
  deleteContact: (id) => 
    axios.delete(`${API_URL}/${id}`),
  
  // Export to CSV
  exportCSV: () => 
    axios.get(`${API_URL}/export`, { responseType: 'blob' }),
  
  // Import from CSV
  importCSV: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${API_URL}/import`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};