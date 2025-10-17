import axios from "axios";
import type { Contact, PaginatedResponse } from "../types";
import { contactService } from "../services/contactService";

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ContactService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllContacts', () => {
    it('should fetch all contacts with default pagination', async () => {
      const mockResponse: PaginatedResponse<Contact> = {
        content: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '1234567890',
          },
        ],
        totalPages: 1,
        totalElements: 1,
        currentPage: 0,
        pageSize: 10,
      };

      const mockApi = {
        get: jest.fn().mockResolvedValue({ data: mockResponse }),
      };
      (mockedAxios.create as jest.Mock).mockReturnValue(mockApi);

      // Re-import to get mocked version
      const { contactService: service } = await import('../../services/contactService');
      const result = await service.getAllContacts();

      expect(mockApi.get).toHaveBeenCalledWith('?page=0&size=10&sortBy=firstName');
    });

    it('should fetch contacts with custom pagination', async () => {
      const mockResponse: PaginatedResponse<Contact> = {
        content: [],
        totalPages: 5,
        totalElements: 50,
        currentPage: 2,
        pageSize: 10,
      };

      const mockApi = {
        get: jest.fn().mockResolvedValue({ data: mockResponse }),
      };
      (mockedAxios.create as jest.Mock).mockReturnValue(mockApi);

      const { contactService: service } = await import('../../services/contactService');
      await service.getAllContacts(2, 10, 'lastName');

      expect(mockApi.get).toHaveBeenCalledWith('?page=2&size=10&sortBy=lastName');
    });

    it('should handle fetch error gracefully', async () => {
      const mockApi = {
        get: jest.fn().mockRejectedValue(new Error('Network error')),
      };
      (mockedAxios.create as jest.Mock).mockReturnValue(mockApi);

      const { contactService: service } = await import('../../services/contactService');

      await expect(service.getAllContacts()).rejects.toThrow('Network error');
    });
  });

  describe('searchContacts', () => {
    it('should search contacts by query', async () => {
      const mockResponse: PaginatedResponse<Contact> = {
        content: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
          },
        ],
        totalPages: 1,
        totalElements: 1,
        currentPage: 0,
        pageSize: 10,
      };

      const mockApi = {
        get: jest.fn().mockResolvedValue({ data: mockResponse }),
      };
      (mockedAxios.create as jest.Mock).mockReturnValue(mockApi);

      const { contactService: service } = await import('../../services/contactService');
      const result = await service.searchContacts('John', 0, 10);

      expect(mockApi.get).toHaveBeenCalledWith('/search?query=John&page=0&size=10');
      expect(result.content).toHaveLength(1);
      expect(result.content[0].firstName).toBe('John');
    });

    it('should return empty results when no match found', async () => {
      const mockResponse: PaginatedResponse<Contact> = {
        content: [],
        totalPages: 0,
        totalElements: 0,
        currentPage: 0,
        pageSize: 10,
      };

      const mockApi = {
        get: jest.fn().mockResolvedValue({ data: mockResponse }),
      };
      (mockedAxios.create as jest.Mock).mockReturnValue(mockApi);

      const { contactService: service } = await import('../../services/contactService');
      const result = await service.searchContacts('NonExistent');

      expect(result.content).toHaveLength(0);
    });
  });

  describe('getContactById', () => {
    it('should fetch a contact by ID', async () => {
      const mockContact: Contact = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      };

      const mockApi = {
        get: jest.fn().mockResolvedValue({ data: mockContact }),
      };
      (mockedAxios.create as jest.Mock).mockReturnValue(mockApi);

      const { contactService: service } = await import('../../services/contactService');
      const result = await service.getContactById(1);

      expect(mockApi.get).toHaveBeenCalledWith('/1');
      expect(result.id).toBe(1);
      expect(result.firstName).toBe('John');
    });
  });

  describe('createContact', () => {
    it('should create a new contact', async () => {
      const newContact: Contact = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
      };

      const mockResponse: Contact = {
        ...newContact,
        id: 2,
        createdAt: new Date().toISOString(),
      };

      const mockApi = {
        post: jest.fn().mockResolvedValue({ data: mockResponse }),
      };
      (mockedAxios.create as jest.Mock).mockReturnValue(mockApi);

      const { contactService: service } = await import('../../services/contactService');
      const result = await service.createContact(newContact);

      expect(mockApi.post).toHaveBeenCalledWith('', newContact);
      expect(result.id).toBe(2);
    });

    it('should handle duplicate email error', async () => {
      const newContact: Contact = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'duplicate@example.com',
      };

      const mockApi = {
        post: jest.fn().mockRejectedValue(new Error('Email already exists')),
      };
      (mockedAxios.create as jest.Mock).mockReturnValue(mockApi);

      const { contactService: service } = await import('../../services/contactService');

      await expect(service.createContact(newContact)).rejects.toThrow('Email already exists');
    });
  });

  describe('updateContact', () => {
    it('should update an existing contact', async () => {
      const updatedContact: Contact = {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
      };

      const mockApi = {
        put: jest.fn().mockResolvedValue({ data: updatedContact }),
      };
      (mockedAxios.create as jest.Mock).mockReturnValue(mockApi);

      const { contactService: service } = await import('../../services/contactService');
      const result = await service.updateContact(1, updatedContact);

      expect(mockApi.put).toHaveBeenCalledWith('/1', updatedContact);
      expect(result.lastName).toBe('Smith');
    });
  });

  describe('deleteContact', () => {
    it('should delete a contact', async () => {
      const mockApi = {
        delete: jest.fn().mockResolvedValue({ data: null }),
      };
      (mockedAxios.create as jest.Mock).mockReturnValue(mockApi);

      const { contactService: service } = await import('../../services/contactService');
      await service.deleteContact(1);

      expect(mockApi.delete).toHaveBeenCalledWith('/1');
    });
  });

  describe('exportCSV', () => {
    it('should export contacts as CSV', async () => {
      const mockBlob = new Blob(['csv data']);
      const mockApi = {
        get: jest.fn().mockResolvedValue({ data: mockBlob }),
      };
      (mockedAxios.create as jest.Mock).mockReturnValue(mockApi);

      const { contactService: service } = await import('../../services/contactService');
      const result = await service.exportCSV();

      expect(mockApi.get).toHaveBeenCalledWith('/export', { responseType: 'blob' });
      expect(result).toBeInstanceOf(Blob);
    });
  });

  describe('importCSV', () => {
    it('should import contacts from CSV file', async () => {
      const mockFile = new File(['csv data'], 'contacts.csv', { type: 'text/csv' });
      const mockResponse = { message: '5 contacts imported successfully' };

      const mockApi = {
        post: jest.fn().mockResolvedValue({ data: mockResponse }),
      };
      (mockedAxios.create as jest.Mock).mockReturnValue(mockApi);

      const { contactService: service } = await import('../../services/contactService');
      const result = await service.importCSV(mockFile);

      expect(mockApi.post).toHaveBeenCalled();
      expect(result).toBe('5 contacts imported successfully');
    });
  });
});