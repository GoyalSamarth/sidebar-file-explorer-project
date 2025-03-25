# Sidebar File Explorer

A fully functional, responsive, and secure web application with user authentication, dynamic content rendering, navigation, and basic API integration.

## Features

- User authentication with hardcoded credentials.
- Sidebar-based navigation.
- File and folder management.
- Batch execution of Python scripts.
- API integration with a JSON-based data store.

---

## Installation Instructions

### **1. Clone the Repository**

```sh
git clone https://github.com/GoyalSamarth/sidebar-file-explorer-project.git
cd sidebar-file-explorer
```

### **2. Install Backend Dependencies**

```sh
cd backend
npm install
```

### **3. Install Frontend Dependencies**

```sh
cd ../frontend
npm install
```

### **4. Environment Variables**

Create a `.env` file in the backend directory and add:

```
PORT=3001
```

Create a `.env.local` file in the frontend directory and add:

```
REACT_APP_API_BASE_URL=http://localhost:3001/api
```



## Local Development

To run both frontend and backend simultaneously, open two separate terminals:

### **Terminal 1: Run Backend**

```sh
cd backend
node server.js
```

### **Terminal 2: Run Frontend**

```sh
cd frontend
npm start
```

The backend runs on `http://localhost:3001`, and the frontend runs on `http://localhost:3000`.

---



## API Documentation (Brief)

### **1. Get Folder Contents**

**Endpoint:**

```http
GET /api/get-contents
```

#### **Response Example (Root Level)**

```json
 {
    "folders": [
        {
            "name": "ProjectA",
            "modified": "2025-03-21",
            "owner": "admin"
        },
        {
            "name": "ProjectB",
            "modified": "2025-03-20",
            "owner": "demo"
        }
    ],
    "files": []
}

```

**Endpoint:**

```http
GET /api/get-contents??folder=ProjectA
```

#### **Response Example (Root Level)**

```json
{
    "folders": [],
    "files": [
        {
            "name": "test1.py",
            "modified": "2025-03-19",
            "owner": "admin",
            "type": "py"
        },
        {
            "name": "test2.py",
            "modified": "2025-03-19",
            "owner": "admin",
            "type": "py"
        },
        {
            "name": "file2.docx",
            "modified": "2025-03-18",
            "owner": "admin",
            "type": "docx"
        }
```


---

### **2. Open a File**

**Endpoint:**

```http
POST /api/open-file
```

**Request Body:**

```json
{
  "filePath": "C:/Graphics/Projects/ProjectA/test1.py"
}
```

**Response:**

```json
{
  "message": "File C:/Graphics/Projects/ProjectA/test1.py opened successfully"
}
```

---

### **3. Batch Run Python Files**

**Endpoint:**

```http
POST /api/batch-run
```

**Request Body:**

```json
{
 	 "project": "ProjectA",
  "files": ["test1.py", "test2.py"]
}

```

**Response Example:**

```json
{
    "results": [
        {
            "file": "test1.py",
            "status": "success",
            "output": "Hello from test1.py"
        },
        {
            "file": "test2.py",
            "status": "success",
            "output": "Hello from test2.py"
        }
    ]
}

```

---

## Common Error Codes

| HTTP Code | Meaning      | Description                        |
| --------- | ------------ | ---------------------------------- |
| 200       | OK           | Request successful.                |
| 400       | Bad Request  | Missing required parameters.       |
| 404       | Not Found    | Requested resource does not exist. |
| 500       | Server Error | Unexpected server failure.         |

---



## Author

**Samarth Goyal**

