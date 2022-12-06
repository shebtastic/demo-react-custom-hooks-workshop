import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import {
  useBookList,
  useForm,
  useHandleSubmit,
  useLightbulb,
  useLocalStorage,
  useToggle,
} from "../helpers/hooks";

export default function Home({
  bookList,
  bookListSetters: { addBook, deleteBook },
}) {
  const [state, toggle] = useToggle();
  const [lightbulbState, { on, off, stomp }] = useLightbulb();
  const submit = useHandleSubmit();

  function handleSubmit(book) {
    addBook({
      name: book["new-book"],
    });
  }

  return (
    <div>
      <h1>react custom hooks</h1>
      <button onClick={toggle}>{state ? "on" : "off"}</button>
      <div>
        <p>{lightbulbState}</p>
        <button onClick={on}>Turn on</button>
        <button onClick={off}>Turn off</button>
        <button onClick={stomp}>Stomp</button>
      </div>
      <form onSubmit={submit(handleSubmit)}>
        <label htmlFor="new-book">New Book:</label>
        <input type="text" id="new-book" name="new-book" />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {bookList.map((book) => (
          <li key={book.id} onClick={() => deleteBook(book.id)}>
            {book.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
