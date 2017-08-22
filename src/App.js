import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  updateCategory(book, shelf) {
    BooksAPI.update(book, shelf).then((data) => {
      book.shelf = shelf;
      this.setState({ data });
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
          />
        )}/>
         <Route path="/search" render={({ history }) => (
           <SearchBooks
            books={this.state.books}
            onUpdateCategory={(book, shelf) => {
              this.updateCategory(book, shelf);
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
