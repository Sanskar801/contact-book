package com.example.contact_book.service;

import org.springframework.data.domain.Page;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.contact_book.repository.ContactRepository;
import com.example.contact_book.model.Contact;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    // Get all contacts with pagination
    public Page<Contact> getAllContacts(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return contactRepository.findAll(pageable);
    }

    // Search contacts
    public Page<Contact> searchContacts(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return contactRepository.searchContacts(query, pageable);
    }

    // Get by ID
    public Contact getContactById(Long id) {
        return contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));
    }

    // Create contact
    public Contact createContact(Contact contact) {
        if (contactRepository.existsByEmail(contact.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        return contactRepository.save(contact);
    }

    // Update contact
    public Contact updateContact(Long id, Contact contactDetails) {
        Contact contact = getContactById(id);

        contact.setFirstName(contactDetails.getFirstName());
        contact.setLastName(contactDetails.getLastName());
        contact.setEmail(contactDetails.getEmail());
        contact.setPhone(contactDetails.getPhone());
        contact.setAddress(contactDetails.getAddress());
        contact.setGroup(contactDetails.getGroup());
        contact.setProfilePicUrl(contactDetails.getProfilePicUrl());

        return contactRepository.save(contact);
    }

    // Delete contact
    public void deleteContact(Long id) {
        Contact contact = getContactById(id);
        contactRepository.delete(contact);
    }

    // Export to CSV
    public byte[] exportToCSV() {
        List<Contact> contacts = contactRepository.findAll();
        StringBuilder csvContent = new StringBuilder();
        csvContent.append("ID,First Name,Last Name,Email,Phone,Address,Group\n");

        for (Contact contact : contacts) {
            csvContent.append(contact.getId()).append(",")
                    .append(contact.getFirstName()).append(",")
                    .append(contact.getLastName()).append(",")
                    .append(contact.getEmail()).append(",")
                    .append(contact.getPhone()).append(",")
                    .append(contact.getAddress()).append(",")
                    .append(contact.getGroup() != null ? contact.getGroup().getName() : "")
                    .append("\n");
        }

        return csvContent.toString().getBytes();
    }

    // Import from CSV
    public int importFromCSV(MultipartFile file) {
        int count = 0;
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            br.readLine(); // Skip header

            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                Contact contact = new Contact();
                contact.setFirstName(data[1]);
                contact.setLastName(data[2]);
                contact.setEmail(data[3]);
                contact.setPhone(data[4]);
                contact.setAddress(data[5]);

                contactRepository.save(contact);
                count++;
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to import CSV: " + e.getMessage());
        }
        return count;
    }
}
