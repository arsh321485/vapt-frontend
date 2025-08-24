# Vulnerability Management System - Flask API

A comprehensive Flask-based REST API for vulnerability management with admin, user, and agent flows.

## Features

- **Admin Flow**: Complete CRUD operations for users, locations, assets, vulnerabilities, reports
- **User Flow**: Vulnerability tracking, fix implementation, exception requests
- **Agent Flow**: Automated report upload and processing
- **Authentication**: JWT-based with role-based access control
- **Real-time Analytics**: Dashboard statistics and performance metrics
- **File Processing**: Support for PDF, CSV, Excel, Nessus XML reports

## Project Structure

```
/workspace/
├── app.py                 # Main Flask application
├── agent_upload.py        # Separate agent upload service
├── requirements.txt       # Python dependencies
├── .env                  # Environment variables
├── routes/               # API route modules
│   ├── auth.py          # Authentication endpoints
│   ├── users.py         # User management
│   ├── locations.py     # Location management
│   ├── assets.py        # Asset management
│   ├── vulnerabilities.py # Vulnerability management
│   ├── reports.py       # Report management
│   ├── analytics.py     # Dashboard & analytics
│   └── [other modules] # Additional functionality
└── uploads/             # File upload directory
```

## API Endpoints

### Authentication & Authorization
```
POST   /api/auth/login              # User login
POST   /api/auth/logout             # User logout  
POST   /api/auth/refresh-token      # Refresh access token
GET    /api/auth/me                 # Get current user info
PUT    /api/auth/profile            # Update user profile
POST   /api/auth/change-password    # Change password
```

### User Management (Admin Only)
```
GET    /api/admin/users                    # Get all users
POST   /api/admin/users                    # Create new user
GET    /api/admin/users/:id                # Get user by ID
PUT    /api/admin/users/:id                # Update user
DELETE /api/admin/users/:id                # Delete user
POST   /api/admin/users/:id/activate       # Activate user
POST   /api/admin/users/:id/deactivate     # Deactivate user
GET    /api/admin/users/:id/permissions    # Get user permissions
PUT    /api/admin/users/:id/permissions    # Update permissions
```

### Location Management
```
GET    /api/admin/locations                # Get all locations
POST   /api/admin/locations                # Create location
GET    /api/admin/locations/:id            # Get location details
PUT    /api/admin/locations/:id            # Update location
DELETE /api/admin/locations/:id            # Delete location
GET    /api/admin/locations/:id/assets     # Get location assets
```

### Asset Management
```
GET    /api/admin/assets                   # Get all assets
GET    /api/admin/assets/:host/vulnerabilities # Get host vulnerabilities
```

### Vulnerability Management
```
GET    /api/admin/vulnerabilities          # Get all vulnerabilities
GET    /api/admin/vulnerabilities/:id      # Get vulnerability details
PUT    /api/admin/vulnerabilities/:id      # Update vulnerability
POST   /api/admin/vulnerabilities/:id/assign # Assign to user
PUT    /api/admin/vulnerabilities/:id/status # Update status
GET    /api/admin/vulnerabilities/:id/history # Get change history
```

### Report Management
```
GET    /api/admin/reports                  # Get all reports
POST   /api/admin/reports/upload           # Upload report
GET    /api/admin/reports/:id              # Get report details
DELETE /api/admin/reports/:id              # Delete report
```

### Analytics & Dashboard
```
GET    /api/admin/analytics/dashboard      # Dashboard statistics
GET    /api/admin/analytics/vulnerabilities # Vulnerability analytics
GET    /api/admin/analytics/performance    # Performance metrics
GET    /api/admin/analytics/compliance     # Compliance reporting
```

### Agent Upload (Separate Service)
```
POST   /api/agent/upload                   # Upload vulnerability report
GET    /health                             # Health check
```

## Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Set Up MongoDB
Make sure MongoDB is running on `mongodb://localhost:27017/`

### 3. Configure Environment
Copy `.env` file and update with your settings:
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 4. Run Main API Server
```bash
python app.py
```
Server will run on `http://localhost:5000`

### 5. Run Agent Upload Service
```bash
python agent_upload.py
```
Agent service will run on `http://localhost:5001`

## API Usage Examples

### Authentication
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "password123"}'

# Use token in subsequent requests
curl -X GET http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Agent Upload
```bash
# Upload vulnerability report
curl -X POST http://localhost:5001/api/agent/upload \
  -F "file=@report.pdf" \
  -F "agent_id=scanner-001" \
  -F "scan_type=vulnerability"
```

### Get Dashboard Statistics
```bash
curl -X GET http://localhost:5000/api/admin/analytics/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## MongoDB Collections

The system uses the following MongoDB collections:

- **users**: User accounts and profiles
- **locations**: Geographic/organizational locations
- **reports**: Uploaded vulnerability scan reports
- **vulnerabilities**: Vulnerability data with nested structure
- **assets**: IT assets (derived from affected hosts)

## User Roles

- **admin**: Full access to all endpoints
- **user**: Limited access to assigned vulnerabilities and assets  
- **developer**: Similar to user with additional development permissions

## Security Features

- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Input validation and sanitization
- File upload security controls
- Request rate limiting (configurable)

## Production Deployment

### Environment Variables
Update `.env` for production:
```
FLASK_ENV=production
FLASK_DEBUG=False
JWT_SECRET_KEY=your-strong-secret-key
MONGODB_URI=mongodb://production-host:27017/
REDIS_URL=redis://production-redis:6379/0
```

### Using Gunicorn
```bash
gunicorn --bind 0.0.0.0:5000 --workers 4 app:app
```

### Docker Deployment
```dockerfile
FROM python:3.9-slim
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

## API Response Format

All API responses follow this structure:
```json
{
  "success": true|false,
  "message": "Description of result",
  "data": {}, 
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "total_pages": 5
  },
  "errors": []
}
```

## Contributing

1. Create feature branch from main
2. Follow PEP 8 coding standards
3. Add comprehensive tests
4. Update documentation
5. Submit pull request

## License

MIT License - See LICENSE file for details