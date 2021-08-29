testfunc = async () => {
    const response = await fetch("localhost:8000/books/detail/1111111111");
    return response.json();
} 

testfunc().then(data => console.log(data));
