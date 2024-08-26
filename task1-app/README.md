
# Task1- APP 
This project includes two pages, /users and /products, each featuring reusable components. The project uses Axios for API calls, Context API for state management, and follows specific design guidelines.

## Project Overview:
**Pages:** 

- **/users**: Displays a list of users with filtering and pagination options.
- **/products**: Displays a list of products with filtering and pagination options.
- API: DummyJSON API

Check the API documentation for details on parameters for filters and pagination.
## Filters:

**Page Size**: Default value is 5. Options include 5, 10, 20, 50. Changing the value sends a request to the API and updates the pagination.
**Search Icon**: On click, a text input appears for client-side filtering (no API request). E.g., entering "19" filters rows containing "19".
**Other Filters**: Sends a request to the API based on the selected value. Only one filter can be applied at a time. Reset other filters when a new filter value is typed.
**Pagination**: Updates based on the selected page and sends a request to the API to fetch the relevant data.
**Font Family**: Neutra Text.

## Getting Started
Clone the Repository:

```bash
Copy code
git clone git@github.com:Akash521/Assignment-Tasks.git

```
Navigate to the Project Directory:
```bash
cd Assignment-Tasks/task1-app
```
Install Dependencies:
```bash
npm install
```
Run the Application:
```bash
npm start
Open http://localhost:3000 in your browser.
```
## Implementation Details
**Pages**
- /users:
Filters: Supports pagination, search, and additional filters based on user attributes.
Table: Displays user information with options to filter, search, and paginate.
- /products:
Filters: Includes filters for Title, Brand, and Category, and tabs for ALL and Laptops.
Table: Displays product information with options to filter, search, and paginate.
State Management
Context API: Used to manage global state across the application. Provides state management for filtering and pagination.
