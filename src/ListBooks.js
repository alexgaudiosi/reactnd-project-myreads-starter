import React, { Component } from 'react';

class ListBooks extends Component {
  render() {

    const { books } = this.props;

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          { books.map((book) => (
            <li>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{ backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}
                  />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    )

  }
}

export default ListBooks;
