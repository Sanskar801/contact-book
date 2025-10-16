import axios, { type AxiosInstance } from 'axios';
import type { Contact, PaginatedResponse } from '../types';

const API_URL = 'http://localhost:8080/api/contacts';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const contactService = {
  getAllContacts: async (
    page: number = 0,
    size: number = 10,
    sortBy: string = 'firstName'
  ): Promise<PaginatedResponse<Contact>> => {
    const response = await api.get<PaginatedResponse<Contact>>(
      `?page=${page}&size=${size}&sortBy=${sortBy}`
    );
    return response.data;
  },

  searchContacts: async (
    query: string,
    page: number = 0,
    size: number = 10
  ): Promise<PaginatedResponse<Contact>> => {
    const response = await api.get<PaginatedResponse<Contact>>(
      `/search?query=${query}&page=${page}&size=${size}`
    );
    return response.data;
  },

  getContactById: async (id: number): Promise<Contact> => {
    const response = await api.get<Contact>(`/${id}`);
    return response.data;
  },

  createContact: async (contact: Contact): Promise<Contact> => {
    const response = await api.post<Contact>('', contact);
    return response.data;
  },

  updateContact: async (id: number, contact: Contact): Promise<Contact> => {
    const response = await api.put<Contact>(`/${id}`, contact);
    return response.data;
  },

  deleteContact: async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
  },

  exportCSV: async (): Promise<Blob> => {
    const response = await api.get('/export', { responseType: 'blob' });
    return response.data;
  },

  importCSV: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<{ message: string }>('/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.message;
  },
};