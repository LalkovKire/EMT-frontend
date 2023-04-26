import React from "react";
import {useHistory} from "react-router-dom";

const BookEdit = (props) => {

    const history = useHistory();
    const [formData,updateFormData] = React.useState({
        name: "",
        availableCopies: 0,
        category: 0,
        author: 0
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }


    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name !=="" ? formData.name : props.selectedBook.name;
        const availableCopies = formData.availableCopies !==0 ? formData.availableCopies : props.selectedBook.availableCopies;
        const category = formData.category !==0 ? formData.category : props.selectedBook.category;
        const author = formData.author !==0 ? formData.author : props.selectedBook.author.id;

        props.onEditBook(props.selectedBook.id,name,author,category,availableCopies);
        history.push("/books");
    }

    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Product name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               required
                               placeholder={props.selectedBook.name}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableCopies">Available Copies</label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               placeholder={props.selectedBook.availableCopies}
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" onChange={handleChange}>
                            {props.categories.map((term) => {
                                if(props.selectedBook.category !== undefined &&
                                props.selectedBook.category === term)
                                    return <option selected={props.selectedBook.category}
                                                   value={term}>{term}</option>
                                else return <option value={term}>{term}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="author" className="form-control" onChange={handleChange}>
                            {props.authors.map((term) => {
                                if(props.selectedBook.author !== undefined &&
                                props.selectedBook.author.id === term.id)
                                    return <option selected={props.selectedBook.author.id}
                                                   value={term.id}>{term.name}</option>
                                else return <option value={term.id}>{term.name}</option>
                            })}
                        </select>
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default BookEdit;
