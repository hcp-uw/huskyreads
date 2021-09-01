/*
    HUSKY READS AXIOS EXAMPLE WITH HOOKS (useEffect and useState)
    ----
    const [data, setData] = useState({});

    useEffect(() => {
        search(undefined, undefined, ["Horror"]);
    }, []);
    

    async function search(title, author, genre) {
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
        setData(response.data);
    }

    Within return statement: <p>{data.books !== undefined && data.books[0].title}</p>


    POKEMON API EXAMPLE
    ---
    const [data, setData] = useState({});

    useEffect(() => {
        async function search(limit, offset) {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).catch((err) => console.log(err));
            setData(response.data);
        }
        search(5, 0);
    }, []);


    Within render: <p>{(data.results !== undefined) ? data.results[0].name : "Not yet"}</p>
    */