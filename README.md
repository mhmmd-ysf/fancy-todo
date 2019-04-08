# fancy-todo

### User routes:

| Routes        | HTTP           | Header(s) | Body| Respons | Description |
|-------------|-------------|-----|----|----|---|
| /users | POST | none | name: String<br />email: String<br />password:String | Success : Create user success, Error : Internal Server Error | register user | 
| /users/login | POST | none | id:String<br/> password:String | Success : Login success, Error : Internal Server Error | login via email| 
| /users/google-sign-in | POST | none | id:String<br/> password:String | Success : Login success, Error : Internal Server Error | login via googles | 
| /users/:id | GET | none | id:String | Success : Get User Data done, Error: Internal Server Error | Get All Users |

### Todo routes: 
| Routes        | HTTP           | Header(s) | Body |  Respons | Description |
|-------------|-------------|-----|----|----|---|
| /tasks | GET | none | none | Success : Get task data success, Error : Internal Server Error | Get all the task  | 
| /tasks | POST | none | name:String  <br>due_date:Date <br>description:String  <br> | Success : Create task success, Error : Create task failed  | Create a new todo| Create new task 
| /tasks/:id | PUT | none | id:String |  Success : Update task success, Error : Update task failed  | Update a todo base of id | 
| /tasks/:id | DELETE | none | id:String |  Success : Delete task success, Error : Delete task failed  | Delete a todo base of id | 



## Usage
Make sure Node.js is installed in your computer then run these commands:

```javascript
npm install
npm run dev