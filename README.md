# IncidentHub

IncidentHub is a full-stack incident management platform designed to help organizations report, assign, track, and resolve incidents through a centralized, collaborative workspace. It combines a modern React frontend with a secure Spring Boot backend to provide real-time communication, efficient workflow management, and role-based access control.

---

## Features

- User authentication with JWT and Google OAuth 2.0
- Create, update, assign, and resolve incidents
- Multiple assignees per incident
- Kanban board for incident tracking
- Priority, category, due date, and progress management
- Real-time comments using WebSockets (STOMP)
- Live notifications
- File attachment support
- Audit logs for tracking changes
- Dashboard with filtering and incident statistics
- Responsive user interface

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- shadcn/ui
- Lucide React

### Backend
- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- MapStruct
- WebSocket (STOMP)
- Flyway
- Redis

### Database
- PostgreSQL

### Authentication
- JWT
- Google OAuth 2.0

---

## Architecture

```
                React + Vite
                      │
          REST API + WebSocket
                      │
              Spring Boot API
      ┌─────────────┼─────────────┐
      │             │             │
 Spring Security   Redis     PostgreSQL
      │
JWT + Google OAuth
```

---

## Project Structure

```
incident-hub
├── backend
│   ├── config
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── mapper
│   ├── repository
│   ├── security
│   └── service
│
├── frontend
│   ├── api
│   ├── components
│   ├── context
│   ├── hooks
│   ├── pages
│   └── utils
│
└── README.md
```

---

## Core Functionality

### Authentication
- Register and log in securely
- Google OAuth integration
- JWT-based authentication
- Protected routes
- Role-based authorization

### Incident Management
- Create new incidents
- Update incident details
- Assign multiple team members
- Track priority, category, and progress
- Set due dates
- Resolve incidents

### Collaboration
- Real-time comments
- Instant notifications
- File attachments
- Audit history for incident changes

### Dashboard
- Kanban-based workflow
- Search and filtering
- Incident overview
- Status and priority tracking

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/harshilarora2005/incident-hub.git
cd incident-hub
```

### Backend

```bash
cd backend

# Configure your database and environment variables

./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend

npm install
npm run dev
```

---

## Environment Variables

### Backend

```properties
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=

JWT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

REDIS_HOST=
REDIS_PORT=
```

### Frontend

```env
VITE_API_URL=http://localhost:8080/api
```

---

## Future Enhancements

- Organization and team management
- Email notifications
- SLA management
- Advanced analytics and reporting
- Role-based administration
- Mobile-friendly improvements

---

## License

This project is licensed under the MIT License.
