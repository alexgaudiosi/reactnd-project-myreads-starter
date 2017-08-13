import React, { Component } from 'react';

class ListBooks extends Component {

  trimCategory = (category, book) => {

    category = category.replace(/\s/g, '');

    return book.shelf.match(new RegExp('^' + category + '$', 'i' ))
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
                { books.filter((book) => this.trimCategory(category, book) ).map((book) => (
                  <li key={Object.values(book.industryIdentifiers[0].identifier).join('')}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{ backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}
                        />
                        <div className="book-shelf-changer">
                          <select>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
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
        ))}
      </div>
    )
  }
}

export default ListBooks;
