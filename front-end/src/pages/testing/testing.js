    /*
    // Just testing my searching capabilities
    const testSearch = async (title, author, genre) => {
        let fetchURL = "http://localhost:8000/books/search?";

        if (title !== undefined) {
            fetchURL += `&title=${title}`;
        }
        if (author !== undefined) {
            fetchURL += `&author=${author}`;
        }
        
        if (genre !== undefined) {
            for (let i = 0; i < genre.length; i++) {
                fetchURL += `&genre[${i}]=${genre[i]}`;
            }
        }

        const response = await axios.get(fetchURL).catch((error) => console.log(error));
        console.log(response);

    }

    // await testSearch();
    */