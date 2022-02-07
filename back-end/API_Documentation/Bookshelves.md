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
                    "authors": ["Suzanne Collins"],
                    "genres": ["Young Adult", "Dystopian"]
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
    
    | Name        | Type    | Description                                      |
    | ----------- | ------- | ------------------------------------------------ |
    | `username`  | String  | The username of the user who owns the bookshelf. |
    | `bookshelf` | String  | The name of the bookshelf to add a book to.      |
    | `isbn`      | Integer | The isbn of the book to add to the bookshelf.    |

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

    No book exists with the provided isbn

    * **Code:** 400 </br>
    **Content:** `"Book does not exist"`

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
    | `isbn`      | Integer | The isbn of the book to remove from the bookshelf.  |

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

    No book with the provided isbn exists in the specified bookshelf

    * **Code:** 400 </br>
    **Content:** `"Book does not exist in <bookshelf_name>"`

    </br>

