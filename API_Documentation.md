# Husky Reads Server API Documentation
The Husky Reads API provides information on cataloged books. It also maintains relationships that users have with books in the form of bookshelves. Users can add and remove books from their bookshelves.

## <span style="color:deepskyblue">User Authentication</span>
---

### Authenticating User's Login Credentials

Verifies that a user exists and that the provided password matches the stored one.
* **Endpoint:** /login

* **Request Method:** POST

* **Body Params:**

    **Required:**
    
    | Name       | Type   | Description                               |
    | ---------- | ------ | ----------------------------------------- |
    | `username` | String | The username of the user to authenticate. |
    | `password` | String | The password of the user to authenticate. | 

* **Returned Data Format:** Plain Text

* **Success Response:**

    * **Code:** 200 </br>
    **Content:** `"Login Successful"`

* **Error Response:**

    Missing one or more body parameters

    * **Code:** 400 </br>
    **Content:** `"Missing username or password"`

    Username either doesn't exist or the password doesn't match the stored password for the given username

    * **Code:** 401 </br>
    **Content:** `"Invalid user credentials"`

    </br>

### Creating a new user

Adds a new user with the given username and password. If the provided username already exists, an error will be thrown.
* **Endpoint:** /signup

* **Request Method:** POST

* **Body Params:**

    **Required:**
    
    | Name       | Type   | Description                         |
    | ---------- | ------ | ----------------------------------- |
    | `username` | String | The username of the user to create. |
    | `password` | String | The password of the user to create. |

* **Returned Data Format:** Plain Text

* **Success Response:**

    * **Code:** 200 </br>
    **Content:** `"Signup Successful"`

* **Error Response:**

    Missing one or more body parameters

    * **Code:** 400 </br>
    **Content:** `"Missing username or password"`

    Username is taken by another user already

    * **Code:** 401 </br>
    **Content:** `"Username already taken"`

    </br>

## <span style="color:deepskyblue">Accessing User Bookshelves</span>
---

### Valid Bookshelf Names:

* `"reading"`
* `"read"`
* `"want_to_read"`

</br>

### Get Books in Bookshelves

Returns a list of books that belong in a given user's bookshelf. If no bookshelf is specified, then books from all of the user's bookshelves are returned.
* **Endpoint:** /bookshelves/get/:username/:bookshelf

* **Request Method:** GET

* **URL Params:**

    **Required:**

    | Name       | Type   | Description                                      |
    | ---------- | ------ | ------------------------------------------------ |
    | `username` | String | The username of the user who owns the bookshelf. |

    **Optional:**

    | Name        | Type   | Description                                      | Default Value |
    | ----------- | ------ | ------------------------------------------------ | ------------- |
    | `bookshelf` | String | The name of the bookshelf to get the books from. | "all"         |

* **Returned Data Format:** JSON

* **Success Response:**

    * **Code:** 200 </br>
    **Content:** 

    ```JSON
    [
        {
            "name": "Want to read",
            "books": [
                {   
                    "title": "Hunger Games",
                    "author": "Suzanne Collins",
                    "genre": "Young Adult",
                    "result": 20,
                }
            ]
        }
    ]
    ```

* **Error Response:**

    Missing username URL parameter

    * **Code:** 400 </br>
    **Content:** 

    ```JSON 
    {"error": "Missing username parameter"}
    ```

    Username doesn't match any existing user

    * **Code:** 401 </br>
    **Content:** 

    ```JSON 
    {"error": "Invalid username parameter"}
    ```

    Given bookshelf name doesn't exist for the given user

    * **Code:** 400 </br>
    **Content:** 

    ```JSON 
    {"error": "Invalid bookshelf name"}
    ```

    </br>

### Add a Book To a Bookshelf

Adds a book to the specified bookshelf for a user. 
* **Endpoint:** /bookshelves/add

* **Request Method:** POST

* **BODY Params:**

    **Required:**
    
    | Name        | Type   | Description                                      |
    | ----------- | ------ | ------------------------------------------------ |
    | `username`  | String | The username of the user who owns the bookshelf. |
    | `bookshelf` | String | The name of the bookshelf to add a book to.      |
    | `title`     | String | The title of the book to add to the bookshelf.   |

* **Returned Data Format:** Plain Text

* **Success Response:**

    * **Code:** 200 </br>
    **Content:** `"Book successfully added to the bookshelf"`

* **Error Response:**

    Missing any of the required body parameters

    * **Code:** 400 </br>
    **Content:** `"Missing one or more required body parameters"`

    Username doesn't match any existing user

    * **Code:** 401 </br>
    **Content:** `"Invalid username"`

    An invalid bookshelf name is provided

    * **Code:** 400 </br>
    **Content:** `"Invalid bookshelf name"`

    No book exists with the provided title

    * **Code:** 400 </br>
    **Content:** `"Book does not exist"`

    </br>

### Remove a Book From a Bookshelf

Removes a book from a specified bookshelf for a user. 
* **Endpoint:** /bookshelves/remove

* **Request Method:** POST

* **BODY Params:**

    **Required:**
    
    | Name        | Type   | Description                                         |
    | ----------- | ------ | --------------------------------------------------- |
    | `username`  | String | The username of the user who owns the bookshelf.    |
    | `bookshelf` | String | The name of the bookshelf to remove a book from.    |
    | `title`     | String | The title of the book to remove from the bookshelf. |

* **Returned Data Format:** Plain Text

* **Success Response:**

    * **Code:** 200 </br>
    **Content:** `"Book successfully removed from the bookshelf"`

* **Error Response:**

    Missing any of the required body parameters

    * **Code:** 400 </br>
    **Content:** `"Missing one or more required body parameters"`

    Username doesn't match any existing user

    * **Code:** 401 </br>
    **Content:** `"Invalid username"`

    An invalid bookshelf name is provided

    * **Code:** 400 </br>
    **Content:** `"Invalid bookshelf name"`

    No book with the provided title exists in the specified bookshelf

    * **Code:** 400 </br>
    **Content:** `"Book does not exist"`

    </br>

## <span style="color:deepskyblue">Retrieving Book Data</span>
---

### Get Book Data Based on Search Parameters

Returns a list of books that match given search parameters and the number of books that have not yet been served to the user. The more parameters given, the narrower the search will be.
* **Endpoint:** /books

* **Request Method:** POST

* **Body Params:**

    **Optional:**
    
    | Name           | Type     | Description                                           | Default Value |
    | -------------- | -------- | ----------------------------------------------------- | ------------- |
    | `title`        | String   | The title of the book to search for.                  | N/A           |
    | `author`       | String   | The author of the book to search for.                 | N/A           |
    | `genre`        | String[] | One or more of the genres of the book to search for.  | N/A           |
    | `resultLength` | integer  | The number of search results that should be returned. The maximum value allowed is 40. | 10 |
    | `offset`       | integer  | The number of search results to skip before populating the list. This allows for accessing books later in the search results when making multiple requests with the same search parameters. | 0 |

* **Returned Data Format:** JSON

* **Success Response:**

    * **Code:** 200 </br>
    **Content:**

    ```JSON
    {
        "remainingBooksInSearch": 24,
        "books": [
            {   
                "title": "Hunger Games",
                "author": "Suzanne Collins",
                "genre": "Young Adult"
            }
        ]
    }
    ```

* **Error Response:**

    N/A

    </br>

## <span style="color:deepskyblue">Server Errors</span>
---
All server errors will return the following content:

  * **Code:** 500 </br>
    **Content:** `"An error has occured on the server"`