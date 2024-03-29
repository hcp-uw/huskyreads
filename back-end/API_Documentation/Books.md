## <span style="color:deepskyblue">Retrieving Book Data</span>
---
### Get List of Basic Book Data Based on Search Parameters

Returns a list of books that match given search parameters and the number of books that have not yet been served to the user. The more parameters given, the narrower the search will be. If no books match the search criteria, an empty array is returned.
* **Endpoint:** /books/search

* **Request Method:** GET

* **URL Params:**

    **Optional:**

    | Name           | Type     | Description                                           | Default Value |
    | -------------- | -------- | ----------------------------------------------------- | ------------- |
    | `title`        | String   | The title of the book to search for.                  | N/A           |
    | `author`       | String   | The author of the book to search for.                 | N/A           |
    | `genre`        | String[] | One or more of the genres of the book to search for.  | N/A           |
    | `offset`       | integer  | The number of search results to skip before populating the list. This allows for accessing books later in the search results when making multiple requests with the same search parameters. | 0 |
    | `resultLength` | integer  | The number of search results that should be returned. The maximum value allowed is 40. | 10 |

* **Returned Data Format:** JSON

* **Sample Request: `/books/search?title=Hunger+Games&author=&genre={}&offset=&resultLength=1`**

* **Success Response:**

    * **Code:** 200 </br>
    **Content:**

    ```JSON
    {
        "remainingBooksInSearch": 24,
        "books": [
            {
                "title": "Hunger Games",
                "authors": ["Suzanne Collins"],
                "isbn": "2222222222"
            }
        ]
    }
    ```

* **Error Response:**

    N/A (If an issue occurs due to user, endpoint will return nothing)

* **Notes:**
  * 10/6/2022: If a book does not have author information associated with it, the `authors` key will have a value of `[]`.

    </br>

### Get Detailed Information for a Single Book

Returns a detailed description for a single book. The information returned consists of title, authors, genres, date published, description and cover image.
* **Endpoint:** /books/detail/:isbn

* **Request Method:** GET

* **URL Params:**

    **Required:**

    | Name   | Type    | Description                                     |
    | -------| ------- | ----------------------------------------------- |
    | `isbn` | String  | The isbn number of the book to get details for. |

* **Returned Data Format:** JSON

* **Sample Request: `/books/detail/2222222222`**

* **Success Response:**

    * **Code:** 200 </br>
    **Content:**

    ```JSON
    {
        "title": "Hunger Games",
        "authors": ["Suzanne Collins"],
        "genres": ["Young Adult", "Dystopian"],
        "datePublished": "2012-12-20",
        "description": "Katniss Everdeen fights the distopian government"
    }
    ```

* **Error Response:**

    ISBN doesn't match any existing book

    * **Code:** 400 </br>
    **Content:** `{"error": "Invalid isbn"}`

* **Notes:**

    * 2/14/22: Ratings and Reviews still under implementation

    * 6/8/22: All ISBN's are now strings, not numbers. This change has been made to prevent the loss of the first digit if it is a 0.
    
    * 6/8/22: Date published dates vary in format

    * 10/6/2022: If a book does not have author or genre information associated with it, the respective `authors` and/or `genres` key(s) will have a value of `[]`.

    </br>
