## <span style="color:deepskyblue">Accessing User Bookshelves</span>
---
### Default Bookshelf Names:

* `"reading"`
* `"read"`
* `"want_to_read"`

</br>

### Get Books in Bookshelves

Returns a list of books that belong in a given user's bookshelf. If no bookshelf is specified, then books from all of the user's bookshelves are returned. Use `all` for the `bookshelf` parameter to request for all bookshelves.
* **Endpoint:** /bookshelves/get/:username/:bookshelf

* **Request Method:** GET

* **URL Params:**

    **Required:**

    | Name       | Type   | Description                                      |
    | ---------- | ------ | ------------------------------------------------ |
    | `username` | String | The username of the user who owns the bookshelf. |
    | `bookshelf` | String | The name of the bookshelf to get the books from. |

* **Returned Data Format:** JSON

* **Sample Success Response:**

    * **Sample Request:** `/bookshelves/get/elliot/want_to_read` </br>

    * **Code:** 200 </br>
    **Content:**

    ```JSON
    [
        {
            "name": "want_to_read",
            "books": [
                {
                    "isbn": "2222222222",
                    "title": "Hunger Games",
                    "authors": ["Suzanne Collins"],
                    "genres": ["Young Adult", "Dystopian"]
                }
            ]
        }
    ]
    ```

    * **Sample Request:** `/bookshelves/get/nicholas/all` </br>

    * **Code:** 200 </br>
    **Content:**

    ```JSON
    [
        {
            "name": "read",
            "books": []
        },
        {
            "name": "reading",
            "books": []
        },
        {
            "name": "want_to_read",
            "books": [
                {
                    "isbn": "1111111111",
                    "title": "title1",
                    "authors": [
                        "Terrence Tao"
                    ],
                    "genres": [
                        "Horror"
                    ]
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

    Given bookshelf name doesn't exist for the given user

    * **Code:** 400 </br>
    **Content:**

    ```JSON
    {"error": "Invalid bookshelf name"}
    ```

    Username doesn't match any existing user
    * **Code:** 401 </br>
    **Content:**

    ```JSON
    {"error": "Invalid username parameter"}
    ```
    </br>

### Add a Book To a Bookshelf

Adds a book to the specified bookshelf for a user.
* **Endpoint:** /bookshelves/add

* **Request Method:** POST

* **BODY Params:**

    **Required:**

    | Name        | Type    | Description                                      |
    | ----------- | ------- | ------------------------------------------------ |
    | `username`  | String  | The username of the user who owns the bookshelf. |
    | `bookshelf` | String  | The name of the bookshelf to add a book to.      |
    | `isbn`      | String  | The isbn of the book to add to the bookshelf.    |

* **Returned Data Format:** Plain Text

* **Success Response:**

    * **Code:** 200 </br>
    **Content:** `"Book successfully added to the bookshelf"`

* **Error Response:**

    Missing any of the required body parameters

    * **Code:** 400 </br>
    **Content:** `"Missing one or more required body parameters"`

    An invalid bookshelf name is provided

    * **Code:** 400 </br>
    **Content:** `"Invalid bookshelf name"`

    No book exists with the provided isbn

    * **Code:** 400 </br>
    **Content:** `"Book does not exist"`

    Username doesn't match any existing user

    * **Code:** 401 </br>
    **Content:** `"Invalid username"`

    </br>

### Remove a Book From a Bookshelf

Removes a book from a specified bookshelf for a user. 
* **Endpoint:** /bookshelves/remove

* **Request Method:** POST

* **BODY Params:**

    **Required:**
    
    | Name        | Type    | Description                                         |
    | ----------- | ------- | --------------------------------------------------- |
    | `username`  | String  | The username of the user who owns the bookshelf.    |
    | `bookshelf` | String  | The name of the bookshelf to remove a book from.    |
    | `isbn`      | String  | The isbn of the book to remove from the bookshelf.  |

* **Returned Data Format:** Plain Text

* **Success Response:**

    * **Code:** 200 </br>
    **Content:** `"Book successfully removed from the bookshelf"`

* **Error Response:**

    Missing any of the required body parameters

    * **Code:** 400 </br>
    **Content:** `"Missing one or more required body parameters"`

    An invalid bookshelf name is provided

    * **Code:** 400 </br>
    **Content:** `"Invalid bookshelf name"`

    No book with the provided isbn exists in the specified bookshelf

    * **Code:** 400 </br>
    **Content:** `"Book does not exist in <bookshelf_name>"`

    Username doesn't match any existing user

    * **Code:** 401 </br>
    **Content:** `"Invalid username"`

    </br>

### Get Which Bookshelves Contain a Target Book for a User

Returns a list of names of bookshelves for a user that contain a specific book. If none of the bookshelves for a user contain the target book, an empty array is returned.
* **Endpoint:** /bookshelves/book/:username/:isbn

* **Request Method:** GET

* **URL Params:**

    **Required:**
    
    | Name        | Type    | Description                                         |
    | ----------- | ------- | --------------------------------------------------- |
    | `username`  | String  | The username of the user who owns the bookshelves.  |
    | `isbn`      | String  | The isbn of the book to search for in bookshelves.  |

* **Returned Data Format:** JSON

* **Sample Success Response:**

    * **Sample Request:** `/bookshelves/book/elliot/1111111111`

    * **Code:** 200 </br>
    **Content:** 

    ```JSON
    ["reading", "read"]
    ```

* **Error Response:**

    No book exists with the provided isbn

    * **Code:** 400 </br>
    **Content:**

    ```JSON
    {"error": "Book does not exist"}
    ```

    Username doesn't match any existing user

    * **Code:** 401 </br>
     **Content:**

    ```JSON
    {"error": "Invalid username parameter"}
    ```
* **Notes:**

    * 6/8/22: All ISBN's are now strings, not numbers. This change has been made to prevent the loss of the first digit if it is a 0.

    </br>