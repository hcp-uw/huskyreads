## <span style="color:deepskyblue">User Authentication and Color Schema</span>
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

### Creating a New User

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

    * **Code:** 400 </br>
    **Content:** `"Username already taken"`

    </br>

### Logging out user

Deletes authorization cookie.

* **Endpoint:** /logout

* **Request Method:** POST

* **Returned Data Format:** Plain Text

* **Success Response:**

    * **Code:** 200 </br>
    **Content:** `"Logout Successful"`

    </br>

### Setting a Users Preferred Color Scheme

Sets a user's preferred color scheme. Valid color schemes are either `"light"` or `"dark"` mode.
* **Endpoint:** /color_scheme

* **Request Method:** POST

* **Body Params:**

    **Required:**

    | Name           | Type   | Description                                       |
    | -------------- | ------ | ------------------------------------------------- |
    | `username`     | String | The username of the user to create.               |
    | `color_scheme` | String | The preferred color scheme for the given user.    |

* **Returned Data Format:** Plain Text

* **Success Response:**

    * **Code:** 200 </br>
    **Content:** `"Color Scheme Updated Successfuly"`

* **Error Response:**

    Missing one or more body parameters

    * **Code:** 400 </br>
    **Content:** `"Missing username or color_scheme"`

    Username doesn't match any existing user

    * **Code:** 401 </br>
    **Content:** `"Invalid username"`

    An invalid color scheme is provided

    * **Code:** 400 </br>
    **Content:** `"Invalid color scheme"`

    </br>

### Grabbing color_scheme from cookie

Grabs the color_scheme stored as a cookie. Valid color schemes are either `"light"` or `"dark"` mode. Will default to `"light"` if no cookie has been set. For clarification, the sample call is just `/grab/color_scheme`.
* **Endpoint:** /grab/color_scheme

* **Request Method:** GET

* **Returned Data Format:** JSON

* **Success Response:**

    * **Code:** 200 </br>
    **Content:**

    ```JSON
    {
        "color_scheme": "light"
    }
    ```

    </br>

### Grabbing username from cookie

Grabs the username of the user that was previously logged in. Note that username cookies expire after 2 days.
* **Endpoint:** /grab/username

* **Request Method:** GET

* **Returned Data Format:** JSON

* **Success Response:**

    * **Code:** 200 </br>
    **Content:**

    ```JSON
    {
        "username": "elliot"
    }
    ```

* **Error Response:**

    User not logged in OR cookie has expired. User must login again.

    * **Code:** 401 </br>
    **Content:**

    ```JSON
    {
        "error": "User not logged in"
    }
    ```

    </br>
