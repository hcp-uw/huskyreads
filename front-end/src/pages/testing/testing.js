let axios = require('axios');

window.addEventListener('load', () => {
    let response = await axios.get("localhost:8000/books/detail/1111111111").catch((err) => console.log(err));
    console.log(response);
}); 