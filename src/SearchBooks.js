import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {

  state = {
    search: '',
    results: [],
    books: [],
    shelf: ''
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

  updateCategory(book, shelf) {
    BooksAPI.update(book, shelf).then((data) => {
      book.shelf = shelf;
      this.setState({ data });
    });
  }

  getShelf = (book) => {
    var x = this.props.books.filter((result) => result.id === book.id)
    if ( x.length > 0 ) {
      return x[0].shelf;
    } else {
      return 'none'
    }
  }

  render() {
    const { props } = this.props;
    let results = this.state.results;

    return (
      <div className="wrapper">
        <div className="search-books">
        <div className="search-books-bar">
          <Link to="/"
              className="close-search">Create</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={props}
              onChange={(event) => this.updateSearch(event.target.value)}
            />
          </div>
        </div>
         <div className="search-books-results">
          <ol className="books-grid">
            { results.map((book) => (
              <Book
                book={book}
                shelf={this.getShelf(book)}
                key={Object.values(book.industryIdentifiers[0].identifier).join('')}
                onUpdateCategory={(book, shelf) => {
                  this.updateCategory(book, shelf);
                }}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>

    )
  }
}

export default SearchBooks;
