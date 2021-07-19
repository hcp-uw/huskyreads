# Husky Reads Server API Documentation
The Husky Reads API provides information on cataloged books. It also maintains relationships that users have with books in the form of bookshelves. Users can add and remove books from their bookshelves.

## Authenticating User's Login Credentials
---
Verifies that a user exists and that the provided password matches the stored one.
* **Endpoint:** /login

* **Request Method:** POST

* **Body Params:**

    **Required:**
    
    `username=[String]`

    `password=[String]`

* **Returned Data Format:** Plain Text

* **Success Response:**

    * **Code:** 200 </br>
    **Content:** `"Login Successful"`

* **Error Response:**

    Missing one or more body parameters

    * **Code:** 400 </br>
    **Content:** `"Missing username or password"`

    Username either doesn't exist or password doesn't match stored password for the given username

    * **Code:** 401 </br>
    **Content:** `"Invalid login credentials"`

    </br>

## Get Book Data Based on Search Parameters
---
Returns a list of books that match given search parameters. The default list length is at max 10 books but can be increased up to 40 books with the `resultLength` url parameter.
* **Endpoint:** /books

* **Request Method:** POST

* **Body Params:**

    **Optional:**
    
    `username=[String]`

    `password=[String]`

* **Returned Data Format:** Plain Text

* **Success Response:**

    * **Code:** 200 </br>
    **Content:** `"Login Successful"`

* **Error Response:**

    Missing one or more body parameters

    * **Code:** 400 </br>
    **Content:** `"Missing username or password"`

    Username either doesn't exist or password doesn't match stored password for the given username

    * **Code:** 401 </br>
    **Content:** `"Invalid login credentials"`

    </br>