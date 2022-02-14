# Husky Reads Server API Documentation
The Husky Reads API provides information on cataloged books. It also maintains relationships that users have with books in the form of bookshelves. Users can add and remove books from their bookshelves.

## <span style="color:deepskyblue">Heroku Production Server</span>
---

### URL: https://husky-reads.herokuapp.com

### How to use URL to make web request

* Make GET/POST request to: URL + endpoint

* The endpoint should include the starting `/`

* Example: Login = `https://husky-reads.herokuapp.com/login`

* Example: Get books from bookshelf = `https://husky-reads.herokuapp.com/bookshelves/get/elliot/reading`

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
