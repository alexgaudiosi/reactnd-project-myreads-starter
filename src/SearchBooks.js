import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {

  state = {
    search: '',
    results: []
  }

  updateSearch = (search) => {
    this.setState({ search });
    if ( search !== '' )
      BooksAPI.search(search, 20).then((books) => {
        this.setState({ results: [] })
        if ( books !== undefined && books.length > 0 )
          this.setState({ results: books })
      });
  }

  render() {
    const { results } = this.props;
    return (
      <div className="wrapper">
        <div className="search-books">
        <div className="search-books-bar">
          <Link to="/"
              className="close-search">Create</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={results}
              onChange={(event) => this.updateSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.results.map((book) => (
              <li key={Object.values(book.industryIdentifiers[0].identifier).join('')}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{ backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}
                    />
                    <div className="book-shelf-changer">
                      {/* <select onChange={(event) => onUpdateCategory(book, event.target.value)} value={book.shelf}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select> */}
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>

    )
  }
}

export default SearchBooks;
