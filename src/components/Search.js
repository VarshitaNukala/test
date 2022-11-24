import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksApi from "../BooksApi";

import Shelf from "./Shelf";

const Search = ({ changeBookData, changeShowSearchPage, allBooks }) => {
  const [query, setQuery] = useState("");
  const [queriedBooks, setQueriedBooks] = useState([]);

  function handleChangeShowSearchPage() {
    changeShowSearchPage();
  }

  // const searchFunction = async () => {
  //   if (queryParams.length !== 0) {
  //     let data = queryParams.map((currQuery) => BooksApi.search(currQuery, 20));
  //     let resolvedData = await Promise.all(data).catch((error) =>
  //       console.log(error)
  //     );`
  //     let fetchedBooks = [];
  //     resolvedData.forEach((el) => {
  //       if (Array.isArray(el)) {
  //         el.forEach((book) => {
  //           if (!fetchedBooks.find((b) => book.id === b.id)) {
  //             fetchedBooks.push(book);
  //           }
  //         });
  //       }
  //     });
  //     setQueriedBooks(fetchedBooks);
  //     // console.log(fetchedBooks);
  //   }
  // };

  const handleSearchChange = (e) => {
    console.log("calling handleSearch: ", e.target.value);
    setQuery(e.target.value);
  };

  //console.log(queriedBooks);

  useEffect(() => {
    if (query.length > 0) {
      BooksApi.search(query, 100).then((books) => {
        console.log(books);
        if (books.error && books.items.length === 0) {
          return setQueriedBooks([]);
        }

        books.forEach((book) => {
          const homeBook = allBooks.find((homeBook) => book.id === homeBook.id);
          homeBook && (book.shelf = homeBook.shelf);
        });

        setQueriedBooks(books);
      });
    } else {
      console.log("empty query");
      setQueriedBooks([]);
    }
  }, [query, allBooks]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search" onClick={handleChangeShowSearchPage}>
            Close
          </button>
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={handleSearchChange}
            value={query}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {/* <Books
          booksData={queriedBooks}
          changeBookData={changeBookData}
        ></Books> */}
          <Shelf
            books={queriedBooks}
            returnedFromSearch={true}
            changeBookData={changeBookData}
          ></Shelf>
        </ol>
      </div>
    </div>
  );
};

export default Search;
