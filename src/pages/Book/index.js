import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Homepage from "../../components/Homepage";
import { fetchBooks } from "../../store/books/actions";
import { selectBooks } from "../../store/books/selectors";
import { fetchCategory } from "../../store/categories/actions";
import { selectCategories } from "../../store/categories/selectors";

export default function Book() {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const categories = useSelector(selectCategories);
  const [selectedCategory, setSelectedCategory] = useState(-1);

  const filteredBooks =
    selectedCategory == -1
      ? books
      : books.filter((book) => {
          return book.categoryId == selectedCategory;
        });

  const categoryJSX = categories.map((category, i) => {
    return (
      <option key={i} value={category.id}>
        {category.genre}
      </option>
    );
  });

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchCategory());
  }, []);

  return (
    <>
      <Jumbotron>
        <h1>Books To Find</h1>
        <Container>
          <div className="BrowseCategory">
            <select onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value={-1}>categories...</option>
              {categoryJSX}
            </select>
          </div>
        </Container>
        <Container>
          {filteredBooks.map((book, i) => (
            <Homepage
              key={i}
              title={book.title}
              image={book.image}
              author={book.author}
              genre={book.genre}
              price={book.price}
            />
          ))}
        </Container>
      </Jumbotron>
    </>
  );
}