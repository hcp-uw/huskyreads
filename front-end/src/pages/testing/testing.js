let axios = require('axios');

let testVar = {};

testfunc = async () => {
    let response = await axios.get("localhost:8000/books/detail/1111111111").catch((err) => console.log(err));
    testVar = response;
} 

testfun();
