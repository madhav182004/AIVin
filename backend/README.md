# **Backend API Documentation**  

## Endpoint: `/users/register` 
#### **Description**  
Allows new users to register by providing their email and password.  

#### **HTTP Method**  
**POST**  

#### **Request Format**  
| Field    | Type   | Required | Validation                    | Description              |
|----------|--------|----------|-------------------------------|--------------------------|
| email    | String | Yes      | Must be a valid email address | The user's email address. Must be unique. |
| password | String | Yes      | Minimum 6 characters          | The user's password.     |  

#### **Example Request**  
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```  

#### **Example Response**  
```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "64c1ef6b2f1b1c001f5a2e2f",
    "email": "john.doe@example.com"
  }
}
```  

---

## Endpoint: `/users/login` 
#### **Description**  
Allows users to log in by providing their email and password.  

#### **HTTP Method**  
**POST**  

#### **Request Format**  
| Field    | Type   | Required | Validation                                | Description              |
|----------|--------|----------|------------------------------------------|--------------------------|
| email    | String | Yes      | Must be a valid email address            | The user's email address. |
| password | String | Yes      | Minimum 6 characters                     | The user's password.     |  

#### **Example Request**  
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```  

#### **Example Response**  
```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "64c1ef6b2f1b1c001f5a2e2f",
    "email": "john.doe@example.com"
  }
}
```  

---

## Endpoint: `/users/profile`  
#### **Description**  
Retrieves the profile of the currently authenticated user.  

#### **HTTP Method**  
**GET**  

#### **Authentication**  
Requires a valid JWT in the `Authorization` header.  

---

## Endpoint: `/projects/create`  
#### **Description**  
Allows an authenticated user to create a new project.  

#### **HTTP Method**  
**POST**  

#### **Authentication**  
Requires a valid JWT in the `Authorization` header.  

#### **Request Format**  
| Field | Type   | Required | Validation         | Description              |
|-------|--------|----------|--------------------|--------------------------|
| name  | String | Yes      | Must be a string   | Name of the project. Must be unique. |  

#### **Example Request**  
```json
{
  "name": "Project Alpha"
}
```  

#### **Example Response**  
```json
{
  "_id": "64c1ef6b2f1b1c001f5a2e2f",
  "name": "Project Alpha",
  "users": ["64c1ef6b2f1b1c001f5a2e2f"]
}
```  

---

## Endpoint: `/projects/all` 
#### **Description**  
Retrieves all projects belonging to the authenticated user.  

#### **HTTP Method**  
**GET**  

#### **Authentication**  
Requires a valid JWT in the `Authorization` header.  

#### **Example Response**  
```json
{
  "projects": [
    {
      "_id": "64c1ef6b2f1b1c001f5a2e2f",
      "name": "Project Alpha",
      "users": ["64c1ef6b2f1b1c001f5a2e2f"]
    },
    {
      "_id": "64c1ef6b2f1b1c001f5a2e30",
      "name": "Project Beta",
      "users": ["64c1ef6b2f1b1c001f5a2e2f"]
    }
  ]
}
```  

---

## Endpoint: `/projects/add-user`
#### **Description**  
Allows an authenticated user to add other users to a specific project.  

#### **HTTP Method**  
**PUT**  

#### **Authentication**  
Requires a valid JWT in the `Authorization` header.  

#### **Request Format**  
| Field     | Type   | Required | Validation             | Description                        |
|-----------|--------|----------|------------------------|------------------------------------|
| projectId | String | Yes      | Must be a valid string | ID of the project to add users to. |
| users     | Array  | Yes      | Array of strings       | List of user IDs to be added.      |  

#### **Example Request**  
```json
{
  "projectId": "64c1ef6b2f1b1c001f5a2e2f",
  "users": ["64c1ef6b2f1b1c001f5a2e3a", "64c1ef6b2f1b1c001f5a2e3b"]
}
```  

#### **Example Response**  
```json
{
  "project": {
    "_id": "64c1ef6b2f1b1c001f5a2e2f",
    "name": "Project Alpha",
    "users": ["64c1ef6b2f1b1c001f5a2e2f", "64c1ef6b2f1b1c001f5a2e3a", "64c1ef6b2f1b1c001f5a2e3b"]
  }
}
```  

---

## Endpoint: `/projects/get-project/:projectId`
#### **Description**  
Retrieves details of a specific project by its ID.  

#### **HTTP Method**  
**GET**  

#### **Authentication**  
Requires a valid JWT in the `Authorization` header.  

#### **Path Parameters**  
| Parameter  | Type   | Required | Validation             | Description            |
|------------|--------|----------|------------------------|------------------------|
| projectId  | String | Yes      | Must be a valid string | ID of the project.     |  

#### **Example Response**  
```json
{
  "project": {
    "_id": "64c1ef6b2f1b1c001f5a2e2f",
    "name": "Project Alpha",
    "users": ["64c1ef6b2f1b1c001f5a2e2f", "64c1ef6b2f1b1c001f5a2e3a"]
  }
}
```  

--- 

## Endpoint: `/projects/update-file-tree`

### Description
Allows an authenticated user to update the file tree of a specific project.

### HTTP Method
**PUT**

### Authentication
Requires a valid JWT in the Authorization header.

### Request Format
| Field      | Type   | Required | Validation             | Description                        |
|------------|--------|----------|------------------------|------------------------------------|
| `projectId`| String | Yes      | Must be a valid string | ID of the project to update.       |
| `fileTree` | Object | Yes      | Must be a valid object | The updated file tree structure.   |

### Example Request
```json
{
  "projectId": "64c1ef6b2f1b1c001f5a2e2f",
  "fileTree": {
    "root": {
      "name": "src",
      "type": "folder",
      "children": [
        {
          "name": "index.js",
          "type": "file"
        }
      ]
    }
  }
}
```

### Example Response
```json
{
  "project": {
    "_id": "64c1ef6b2f1b1c001f5a2e2f",
    "name": "Project Alpha",
    "fileTree": {
      "root": {
        "name": "src",
        "type": "folder",
        "children": [
          {
            "name": "index.js",
            "type": "file"
          }
        ]
      }
    }
  }
}
```

---
## Endpoint: `/ai/get-result`

### Description
Retrieves the result of an AI operation.

### HTTP Method
**GET**

### Authentication
Requires a valid JWT in the Authorization header.

### Example Response
```json
{
  "result": "<ai_generated_result>"
}
```

---
