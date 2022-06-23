import "./index.css";

export default function AboutPage() {

    return(
        <section className="about-page-container">
            <div id="container">
            <div id="about-block">
                <img src="/images/huskypic.jpeg" alt="husky pic" />
                <div id="purpose-box">
                    <p id="page-title"> About Husky Reads </p>
                    <p id="purpose-text">
                        The purpose of Husky Reads to create a simpler, more straightforward web application similar
                        to GoodReads that allows our users to look for books to read, keep track of books previously
                        read, currently reading, and/or planning to read. Along with that, this project serves as a
                        learning experience for the members of the HuskyReads team, and build confidence in the members
                        of our team to pursue future projects. This is the first project ever completed by the Husky
                        Coding Club and we will use the experience we've gained from this project to provide the
                        groundwork for future project teams to build and grow from.
                    </p>
                </div>
            </div>
            <p id="team-title"> Our Team </p>
                <div id="member-list">
                    <div className="member-box">
                        <img src="/club-member-pics/elliot.png"
                             alt="pic"
                             className="member-pic" />
                        <h3>Elliot Schumacher</h3>
                        <p className="membertext">
                            <strong>Role:</strong> Project Manager / Backend Developer
                        </p>
                    </div>
                    <div className="member-box">
                        <img src="/club-member-pics/vikram.png"
                             alt="pic"
                             className="member-pic" />
                        <h3>Vikram Nithyanandam</h3>
                        <p className="membertext">
                            <strong>Role:</strong> Frontend Developer
                        </p>
                    </div>
                    <div className="member-box">
                        <img src="/club-member-pics/juda.png"
                             alt="pic"
                             className="member-pic" />
                        <h3>Juda Fernandez</h3>
                        <p className="membertext">
                            <strong>Role:</strong> Frontend Developer
                        </p>
                    </div>
                    <div className="member-box">
                        <img src="/club-member-pics/audrey.png"
                             alt="pic"
                             className="member-pic" />
                        <h3>Audrey Kho</h3>
                        <p className="membertext">
                            <strong>Role:</strong> Frontend Developer
                        </p>
                    </div>
                    <div className="member-box">
                        <img src="/club-member-pics/frank.png"
                             alt="pic"
                             className="member-pic" />
                        <h3>Frank Hou</h3>
                        <p className="membertext">
                            <strong>Role:</strong> Backend Developer
                        </p>
                    </div>
                    <div className="member-box">
                        <img src="/club-member-pics/nicholas.png"
                             alt="pic"
                             className="member-pic" />
                        <h3>Nicholas Boren</h3>
                        <p className="membertext">
                            <strong>Role:</strong> Backend Developer
                        </p>
                    </div>
                    <div className="member-box">
                        <img src="/club-member-pics/sid.png"
                             alt="pic"
                             className="member-pic" />
                        <h3>Sidharth Lakshmanan</h3>
                        <p className="membertext">
                            <strong>Role:</strong> Backend Developer
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );

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
}
