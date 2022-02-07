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
                "isbn": 2222222222
            }
        ]
    }
    ```

* **Error Response:**

    N/A

* **Notes:**

    * 7/26/21: Cover data will be added to the returned data for each book before the end of the MVP

    </br>

### Get Detailed Information for a Single Book

Returns a detailed description for a single book. The information returned consists of title, authors, genres, date published, description and cover image.
* **Endpoint:** /books/detail/:isbn

* **Request Method:** GET

* **URL Params:**

    **Required:**

    | Name   | Type    | Description                                     |
    | -------| ------- | ----------------------------------------------- |
    | `isbn` | Integer | The isbn number of the book to get details for. |

* **Returned Data Format:** JSON

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

    Missing isbn URL parameter

    * **Code:** 400 </br>
    **Content:** `"Missing isbn parameter"`

    ISBN doesn't match any existing book

    * **Code:** 400 </br>
    **Content:** `"Invalid isbn"`

* **Notes:**

    * 7/26/21: Cover data will be added to the returned data before the MVP is finished
    * 7/26/21: This is the endpoint that will return ratings and reviews in the future

    </br>

## <span style="color:deepskyblue">Server Errors</span>
---
All server errors will return the following content:

If text response:

  * **Code:** 500 </br>
    **Content:** `"An error has occured on the server"`

If JSON response:
  * **Code:** 500 </br>
    **Content:**

    ```JSON
    {
        "error": "An error has occured on the server"
    }
    ```
