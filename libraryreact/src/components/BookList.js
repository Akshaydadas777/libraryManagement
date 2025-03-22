import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: "", author: "", isbn: "", published_date: "" });
    const [editingBook, setEditingBook] = useState(null);

    const fetchBooks = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:7000/books/");
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const addBook = async () => {
        try {
            await axios.post("http://127.0.0.1:7000/books/", newBook);
            setNewBook({ title: "", author: "", isbn: "", published_date: "" });
            fetchBooks();
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    const deleteBook = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:7000/books/${id}/`);
            fetchBooks();
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    const editBook = (book) => {
        setEditingBook(book);
    };

    const updateBook = async () => {
        try {
            await axios.put(`http://127.0.0.1:7000/books/${editingBook.id}/`, editingBook);
            setEditingBook(null);
            fetchBooks();
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    return (
        <div className="container mt-5 p-4 bg-light shadow rounded">
            <h3 className="text-primary text-center">Add a New Book</h3>
            <div className="row g-3 mb-4">
                <div className="col-md-3">
                    <input type="text" placeholder="Title" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} className="form-control" />
                </div>
                <div className="col-md-3">
                    <input type="text" placeholder="Author" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} className="form-control" />
                </div>
                <div className="col-md-3">
                    <input type="text" placeholder="ISBN" value={newBook.isbn} onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })} className="form-control" />
                </div>
                <div className="col-md-3">
                    <input type="text" placeholder="Published Date" value={newBook.published_date} onChange={(e) => setNewBook({ ...newBook, published_date: e.target.value })} className="form-control" />
                </div>
            </div>
            <button onClick={addBook} className="btn btn-primary">Add Book</button>

            <h2 className="text-center text-primary mt-5">Book List</h2>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-primary">
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>ISBN</th>
                            <th>Published Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                {editingBook && editingBook.id === book.id ? (
                                    <>
                                        <td><input type="text" value={editingBook.title} onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })} className="form-control" /></td>
                                        <td><input type="text" value={editingBook.author} onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })} className="form-control" /></td>
                                        <td><input type="text" value={editingBook.isbn} onChange={(e) => setEditingBook({ ...editingBook, isbn: e.target.value })} className="form-control" /></td>
                                        <td><input type="text" value={editingBook.published_date} onChange={(e) => setEditingBook({ ...editingBook, published_date: e.target.value })} className="form-control" /></td>
                                        <td>
                                            <button onClick={updateBook} className="btn btn-success me-2">Save</button>
                                            <button onClick={() => setEditingBook(null)} className="btn btn-secondary">Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.isbn}</td>
                                        <td>{book.published_date}</td>
                                        <td>
                                            <button onClick={() => editBook(book)} className="btn btn-warning me-2">Edit</button>
                                            <button onClick={() => deleteBook(book.id)} className="btn btn-danger">Delete</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookList;
