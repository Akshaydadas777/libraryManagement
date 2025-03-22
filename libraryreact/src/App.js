import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminAuth from "./api";
import BookList from "./components/BookList";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminAuth />} />
                <Route path="/books" element={<BookList />} />
            </Routes>
        </Router>
    );
}

export default App;
