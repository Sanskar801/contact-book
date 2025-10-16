# Contact Book Application

A full-stack contact management application built with React, Spring Boot, and modern DevOps practices.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development](#development)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Project Overview

Contact Book is a complete CRUD application demonstrating full-stack development capabilities. It showcases modern web development practices including React state management, Spring Boot REST APIs, containerization with Docker, and CI/CD automation with GitHub Actions.

### Project Goals

- Master full CRUD operations
- Practice React state management and forms
- Build RESTful APIs with Spring Boot
- Containerize applications with Docker
- Deploy with Kubernetes
- Automate with GitHub Actions

## ✨ Features

- **Contact Management**: Create, read, update, and delete contacts
- **Search & Filter**: Search contacts by name, email, or phone number
- **Grouping**: Organize contacts into groups (Family, Work, Friends)
- **Profile Pictures**: Upload and manage contact profile pictures
- **Import/Export**: Bulk import/export contacts as CSV files
- **Pagination**: Handle large contact lists efficiently
- **Sorting**: Sort contacts by name or date added
- **Responsive Design**: Mobile-friendly user interface

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls

### Backend
- **Spring Boot** - Java framework
- **JPA/Hibernate** - ORM for database operations
- **PostgreSQL** - Relational database

### DevOps
- **Docker** - Container platform
- **Kubernetes** - Orchestration platform
- **GitHub Actions** - CI/CD automation

## 📁 Project Structure

```
contact-book/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactList.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   ├── ContactCard.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── services/
│   │   │   └── contactService.js
│   │   ├── App.jsx
│   │   └── index.js
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── src/main/java/com/contactbook/
│   │   ├── controller/
│   │   │   └── ContactController.java
│   │   ├── model/
│   │   │   ├── Contact.java
│   │   │   └── Group.java
│   │   ├── repository/
│   │   │   └── ContactRepository.java
│   │   ├── service/
│   │   │   └── ContactService.java
│   │   └── ContactBookApplication.java
│   ├── Dockerfile
│   └── pom.xml
├── kubernetes/
│   ├── postgres-deployment.yml
│   ├── backend-deployment.yml
│   ├── frontend-deployment.yml
│   └── ingress.yml
├── .github/workflows/
│   ├── ci.yml
│   └── cd.yml
├── docker-compose.yml
└── README.md
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Java** (JDK 17 or higher)
- **Maven** (v3.8 or higher)
- **Docker** (v20.10 or higher)
- **Docker Compose** (v1.29 or higher)
- **Git**

Optional (for Kubernetes deployment):
- **kubectl** (v1.24 or higher)
- **Minikube** or a cloud Kubernetes cluster (AWS EKS, GCP GKE, Azure AKS)

## 🚀 Quick Start

### Option 1: Using Docker Compose (Recommended for Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/contact-book.git
   cd contact-book
   ```

2. **Build and run all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api/contacts
   - Database: localhost:5432

4. **Stop the services**
   ```bash
   docker-compose down
   ```

### Option 2: Local Development Setup

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Start PostgreSQL**
   ```bash
   docker run -d \
     --name postgres-db \
     -e POSTGRES_DB=contactbook \
     -e POSTGRES_PASSWORD=postgres \
     -p 5432:5432 \
     postgres:15-alpine
   ```

3. **Build and run Spring Boot**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

## 💻 Development

### Running Tests

**Backend Tests**
```bash
cd backend
mvn test
```

**Frontend Tests**
```bash
cd frontend
npm test
```

### Building for Production

**Backend**
```bash
cd backend
mvn clean package
```

**Frontend**
```bash
cd frontend
npm run build
```

### Code Structure Best Practices

- Keep components small and focused
- Use meaningful variable and function names
- Add error handling for all API calls
- Implement input validation on both frontend and backend
- Write comprehensive comments for complex logic
- Use environment variables for configuration

## 📡 API Documentation

### Base URL
```
http://localhost:8080/api/contacts
```

### Endpoints

#### Get All Contacts
```bash
GET /api/contacts?page=0&size=10&sortBy=firstName
```

#### Search Contacts
```bash
GET /api/contacts/search?query=john&page=0&size=10
```

#### Get Contact by ID
```bash
GET /api/contacts/{id}
```

#### Create Contact
```bash
POST /api/contacts
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "address": "123 Main St",
  "groupId": 1
}
```

#### Update Contact
```bash
PUT /api/contacts/{id}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com"
}
```

#### Delete Contact
```bash
DELETE /api/contacts/{id}
```

#### Export Contacts to CSV
```bash
GET /api/contacts/export
```

#### Import Contacts from CSV
```bash
POST /api/contacts/import
Content-Type: multipart/form-data

file: contacts.csv
```

### Example cURL Requests

```bash
# Create a contact
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }'

# Get all contacts
curl http://localhost:8080/api/contacts

# Search contacts
curl "http://localhost:8080/api/contacts/search?query=john"

# Update contact
curl -X PUT http://localhost:8080/api/contacts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com"
  }'

# Delete contact
curl -X DELETE http://localhost:8080/api/contacts/1
```

## 🚢 Deployment

### Docker Hub Setup

1. **Create Docker Hub account** at https://hub.docker.com

2. **Configure GitHub Secrets**
   - Go to Repository → Settings → Secrets and variables → Actions
   - Add these secrets:
     - `DOCKER_USERNAME`
     - `DOCKER_PASSWORD`

3. **Push images to Docker Hub**
   ```bash
   docker login
   docker push yourusername/contact-book-frontend:latest
   docker push yourusername/contact-book-backend:latest
   ```

### Kubernetes Deployment

1. **Create kubeconfig** for your cluster

2. **Apply Kubernetes manifests**
   ```bash
   kubectl apply -f kubernetes/
   ```

3. **Verify deployment**
   ```bash
   kubectl get pods
   kubectl get services
   ```

### CI/CD Pipeline

This project uses GitHub Actions for automated testing and deployment.

**CI Pipeline** (`ci.yml`):
- Runs on push/PR to main and develop branches
- Tests frontend with Node.js
- Tests backend with Maven
- Builds and pushes Docker images on successful merge

**CD Pipeline** (`cd.yml`):
- Runs on push to main branch
- Deploys to Kubernetes cluster
- Updates deployments and verifies rollout

### AWS EKS Deployment

1. **Create EKS cluster**
   ```bash
   aws eks create-cluster --name contact-book-cluster
   ```

2. **Update kubeconfig**
   ```bash
   aws eks update-kubeconfig --name contact-book-cluster
   ```

3. **Deploy application**
   ```bash
   kubectl apply -f kubernetes/
   ```

## 📝 Implementation Checklist

### Phase 1: Backend
- [ ] Create Spring Boot project
- [ ] Set up PostgreSQL database
- [ ] Create entities (Contact, Group)
- [ ] Implement repositories
- [ ] Build REST controllers
- [ ] Add validation & error handling
- [ ] Test APIs with Postman

### Phase 2: Frontend
- [ ] Create React app
- [ ] Build component structure
- [ ] Implement contact service
- [ ] Create contact list & cards
- [ ] Build contact form
- [ ] Add search functionality
- [ ] Implement pagination

### Phase 3: Docker
- [ ] Create frontend Dockerfile
- [ ] Create backend Dockerfile
- [ ] Write docker-compose.yml
- [ ] Test locally with docker-compose
- [ ] Push images to Docker Hub

### Phase 4: DevOps
- [ ] Set up Kubernetes manifests
- [ ] Test on local Minikube
- [ ] Create GitHub Actions CI
- [ ] Create GitHub Actions CD
- [ ] Deploy to cloud (AWS/GCP/Azure)

## 💡 Pro Tips

- **Start Simple**: Build basic CRUD first, then add features incrementally
- **Test Locally**: Use docker-compose for local development before deploying
- **Version Control**: Commit frequently with meaningful messages
- **Error Handling**: Always add try-catch blocks and user-friendly error messages
- **Documentation**: Keep README updated with setup instructions and changes

## 🔄 Future Features

- **Authentication**: JWT-based login with role-based access control
- **Email Integration**: Send emails directly to contacts
- **Advanced Filters**: Filter by multiple criteria and saved searches
- **Profile Pictures**: Enhanced photo upload and management
- **Social Links**: Add LinkedIn, Twitter, GitHub profiles
- **Analytics**: Contact statistics and insights

## 🐛 Troubleshooting

### Docker Compose Issues

```bash
# Remove all containers and volumes
docker-compose down -v

# Rebuild images from scratch
docker-compose up --build --force-recreate

# View logs
docker-compose logs -f [service-name]
```

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Connect to database
psql -h localhost -U postgres -d contactbook
```

### Frontend Build Issues

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [Spring Boot Guide](https://spring.io/guides/gs/spring-boot/)
- [Docker Documentation](https://docs.docker.com)
- [Kubernetes Documentation](https://kubernetes.io/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Support

For issues and questions, please create an issue on GitHub or contact the maintainers.

---

**Happy coding!** 🚀
