import './App.css';
import React,{Component} from "react";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Countries from "../Countries/countries";
import booksRepository from "../../repository/booksRepository";
import Authors from "../Authors/authors";
import Books from "../Books/booksList/books";
import Header from "../Header/header";
import data from "bootstrap/js/src/dom/data";
import BookAdd from "../Books/BooksAdd/bookAdd";
import BookEdit from "../Books/BooksEdit/bookEdit";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            authors: [],
            books: [],
            categories: [],
            selectedBook: {}
        }
    }

    render() {
        return(
           <Router>
               <Header/>
               <main>
                   <div className="container">
                       <Route path={"/countries"} exact render={() =>
                           <Countries countries={this.state.countries}/>}/>
                       <Route path={"/authors"}  exact render={() =>
                           <Authors authors={this.state.authors}/>}/>
                       <Route path={"/books/add"} exact render={() =>
                           <BookAdd categories={this.state.categories} authors={this.state.authors} onAddBook={this.addBook}/>}/>
                       <Route path={"/books/edit/:id"} exact render={() =>
                           <BookEdit categories={this.state.categories}
                                     authors={this.state.authors}
                                     onEditBook={this.editBook}
                                     selectedBook={this.state.selectedBook}/>}/>
                       <Route path={["/books","/"]} exact render={() =>
                           <Books books={this.state.books}
                                  onDelete={this.deleteBook}
                                  onEdit={this.getBook} onRent={this.rentBook}/>}/>
                       <Redirect to={"/books"}/>
                   </div>
               </main>
           </Router>
        );
    }

    loadCountries = () => {
       booksRepository.fetchCountry()
           .then((data) => {
               this.setState({
                   countries: data.data
               })
           });
    }

    loadAuthors = () => {
        booksRepository.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }

    loadBooks = () => {
        booksRepository.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }

    loadCategories = () => {
        booksRepository.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                });
            })
    }

    deleteBook = (id) => {
        booksRepository.deleteBook(id)
            .then(() => {
                this.loadBooks();
            })
    }

    addBook = (name,author,category,availableCopies) => {
        booksRepository.addBook(name,author,category,availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    getBook = (id) => {
        booksRepository.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                });
            })
    }

    editBook = (id,name,author,category,availableCopies) => {
        booksRepository.editBook(id,name,author,category,availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    rentBook = (id) => {
        booksRepository.rentBook(id)
            .then(() => {
                this.loadBooks();
            })
    }

    componentDidMount() {
        this.loadCategories();
        this.loadBooks();
        this.loadAuthors();
        this.loadCountries();
    }
}

export default App;
