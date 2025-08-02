# QuickDesk - Help Desk System

## 🚀 Live Application

**Frontend (User Interface):** https://nyixhned.manus.space  
**Backend (API):** https://j6h5i7c03eox.manus.space

## 📋 Overview

QuickDesk is a comprehensive help desk ticketing system built with Flask (backend) and React (frontend). It provides a complete solution for managing support tickets with role-based access control, real-time updates, and a modern responsive interface.

## ✨ Features

### 🎯 Core Functionality
- **User Authentication**: Secure JWT-based login/registration system
- **Ticket Management**: Create, view, update, and track support tickets
- **Comment Threading**: Real-time comment system for ticket discussions
- **Role-Based Access**: Three user roles (User, Agent, Admin) with different permissions
- **Category Management**: Organize tickets by customizable categories
- **Priority System**: Four priority levels (Low, Medium, High, Urgent)
- **Status Tracking**: Track tickets through Open → In Progress → Resolved → Closed

### 👥 User Roles

#### End User
- Register/login to the system
- Create and view their own tickets
- Add comments to their tickets
- Track ticket status and updates

#### Support Agent
- View and manage all tickets
- Assign tickets to themselves
- Update ticket status and priority
- Add internal notes and public comments
- Filter tickets by status, category, and assignment

#### Admin
- All agent capabilities
- Manage user accounts and roles
- Create and manage ticket categories
- Access admin panel for system management
- View system-wide statistics

### 🎨 User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Dark/Light Mode**: Automatic theme detection
- **Intuitive Navigation**: Clean sidebar navigation with role-based menu items
- **Real-time Updates**: Dynamic content updates without page refresh

## 🔧 Technical Stack

### Backend (Flask)
- **Framework**: Flask with SQLAlchemy ORM
- **Database**: SQLite (easily configurable for PostgreSQL/MySQL)
- **Authentication**: JWT tokens with Flask-JWT-Extended
- **API**: RESTful API with JSON responses
- **Security**: Password hashing, CORS support, input validation

### Frontend (React)
- **Framework**: React 18 with Vite build tool
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Icons**: Lucide React icons
- **Routing**: React Router for client-side navigation
- **State Management**: React Context for authentication state
- **HTTP Client**: Fetch API with custom wrapper

## 🚀 Getting Started

### Demo Credentials
```
Username: admin
Password: admin123
Role: Administrator
```

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user info

#### Tickets
- `GET /api/tickets` - List tickets (with filtering)
- `POST /api/tickets` - Create new ticket
- `GET /api/tickets/{id}` - Get ticket details
- `PUT /api/tickets/{id}` - Update ticket
- `GET /api/tickets/stats` - Get ticket statistics

#### Comments
- `GET /api/tickets/{id}/comments` - Get ticket comments
- `POST /api/tickets/{id}/comments` - Add comment

#### Categories
- `GET /api/categories` - List categories
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/{id}` - Update category (admin only)

#### Users (Admin only)
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `PUT /api/users/{id}` - Update user
- `GET /api/users/agents` - List agents

## 📱 Usage Guide

### For End Users
1. **Register/Login**: Create an account or login with existing credentials
2. **Create Ticket**: Click "New Ticket" and fill in the details
3. **Track Progress**: View your tickets on the dashboard
4. **Communicate**: Add comments to provide additional information

### For Support Agents
1. **View Tickets**: Access all tickets from the Tickets page
2. **Filter & Sort**: Use filters to find specific tickets
3. **Assign Tickets**: Assign tickets to yourself or other agents
4. **Update Status**: Move tickets through the workflow stages
5. **Add Comments**: Communicate with users and add internal notes

### For Administrators
1. **User Management**: Create and manage user accounts in Admin Panel
2. **Category Management**: Set up ticket categories for organization
3. **System Overview**: Monitor ticket statistics and system health
4. **Role Assignment**: Assign appropriate roles to users

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt password hashing
- **Role-Based Access**: Endpoint protection based on user roles
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for secure cross-origin requests

## 📊 Dashboard Features

### Statistics Cards
- Total tickets in the system
- Open tickets requiring attention
- Tickets currently in progress
- Recently resolved tickets
- Unassigned tickets (for agents/admins)

### Recent Activity
- Latest ticket updates
- Quick access to active tickets
- Status and priority indicators

## 🎨 Design Features

- **Professional Interface**: Clean, modern design suitable for business use
- **Responsive Layout**: Optimized for all screen sizes
- **Accessibility**: Keyboard navigation and screen reader support
- **Color-Coded Status**: Visual indicators for ticket status and priority
- **Intuitive Icons**: Clear iconography for better user experience

## 🔧 Customization

The system is designed to be easily customizable:

- **Categories**: Add custom ticket categories
- **Priorities**: Modify priority levels as needed
- **Statuses**: Customize workflow statuses
- **Branding**: Update colors, logos, and styling
- **Email Templates**: Configure notification templates

## 📈 Scalability

QuickDesk is built with scalability in mind:

- **Database**: Easily migrate from SQLite to PostgreSQL/MySQL
- **Caching**: Redis integration ready for session management
- **Load Balancing**: Stateless design supports horizontal scaling
- **API-First**: Separate frontend/backend allows for multiple clients

## 🛠️ Development

### Local Development Setup
1. Clone the repositories
2. Install dependencies: `pip install -r requirements.txt` (backend), `pnpm install` (frontend)
3. Configure environment variables
4. Run development servers: `python src/main.py` (backend), `pnpm run dev` (frontend)

### Project Structure
```
quickdesk-backend/
├── src/
│   ├── models/          # Database models
│   ├── routes/          # API endpoints
│   ├── database/        # Database configuration
│   └── main.py         # Application entry point

quickdesk-frontend/
├── src/
│   ├── components/      # React components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── App.jsx         # Main application component
```

## 🎯 Future Enhancements

Potential improvements for future versions:

- **Email Notifications**: Automated email alerts for ticket updates
- **File Attachments**: Support for file uploads on tickets
- **Advanced Reporting**: Detailed analytics and reporting features
- **Knowledge Base**: Self-service documentation system
- **Live Chat**: Real-time chat support integration
- **Mobile App**: Native mobile applications
- **API Rate Limiting**: Enhanced security and performance controls
- **Audit Logging**: Comprehensive activity tracking

## 📞 Support

For technical support or questions about QuickDesk:

- Review the documentation above
- Check the demo application at https://nyixhned.manus.space
- Test with demo credentials: admin / admin123

## 📄 License

This project is built as a demonstration of a modern help desk system using current web technologies and best practices.

