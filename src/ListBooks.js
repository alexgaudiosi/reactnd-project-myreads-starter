import React, { Component } from 'react';
import Book from './Book';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class ListBooks extends Component {

  matchCategory = (category, book) => {
    category = category.replace(/\s/g, '');
    return book.shelf.match(new RegExp('^' + category + '$', 'i' ))
  }

  updateCategory(book, shelf) {
    BooksAPI.update(book, shelf).then((data) => {
      book.shelf = shelf;
      this.setState({ data });
    });
  }

  render() {

    const { books } = this.props;
    const categories = ['Currently Reading', 'Want to Read', 'Read'];

    return (
      <div className="list-books-content">
        { categories.map((category) => (
          <div className="bookshelf" key={category}>
            <h2 className="bookshelf-title">{category}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                { books.filter((book) => this.matchCategory(category, book) ).map((book) => (
                  <Book
                    book={book}
                    key={Object.values(book.industryIdentifiers[0].identifier).join('')}
                    onUpdateCategory={(book, shelf) => {
                      this.updateCategory(book, shelf);
                    }}
                  />
                ))}
              </ol>
            </div>
            <div className="open-search">
              <Link to="/search"
              className="add-contact">Create</Link>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default ListBooks;
