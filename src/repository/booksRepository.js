import axios from "../custom-axios/axios";

const BooksRepository = {
    fetchCountry: () => {
        return axios.get("/countries");
    },
    fetchAuthors: () => {
        return axios.get("/authors");
    },
    fetchBooks: () => {
        return axios.get("/books");
    },
    fetchCategories: () => {
        return axios.get("/books/categories");
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    addBook: (name,author,category,availableCopies) => {
        return axios.post("/books/add", {
            "name": name,
            "authorId": author,
            "availableCopies": availableCopies,
            "category": category
        });
    },
    editBook: (id,name,author,category,availableCopies) => {
        return axios.put(`/books/edit/${id}`, {
            "name": name,
            "authorId": author,
            "availableCopies": availableCopies,
            "category": category
        });
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    },
    rentBook: (id) => {
        return axios.put(`/books/rent/${id}`);
    }
}

export default BooksRepository;