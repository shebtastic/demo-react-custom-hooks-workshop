// taken from: https://github.com/pixelass/local-storage-next/blob/main/hooks/useLocalStorage.js

import { useCallback, useEffect, useState } from "react";

export function useLocalStorage(key, initialState) {
  const [state, setState] = useState(initialState);

  const setStateAndLocalStorage = useCallback(
    (callbackOrValue) => {
      setState((previousValue) => {
        const nextValue =
          typeof callbackOrValue === "function"
            ? callbackOrValue(previousValue)
            : callbackOrValue;
        window.localStorage.setItem(key, JSON.stringify(nextValue));
        return nextValue;
      });
    },
    [key]
  );

  useEffect(() => {
    const stored = window.localStorage.getItem(key);
    if (stored !== null) {
      setState(JSON.parse(stored));
    }
  }, [key]);

  return [state, setStateAndLocalStorage];
}

function useToggle() {
  const [state, setState] = useState(false);
  function toggle() {
    setState((oldState) => !oldState);
  }

  return [state, toggle];
}

function useLightbulb() {
  const [state, setState] = useState("off");

  function on() {
    setState((oldState) => (state !== "broken" ? "on" : oldState));
  }

  function off() {
    setState((oldState) => (state !== "broken" ? "off" : oldState));
  }

  function stomp() {
    setState("broken");
  }

  return [state, { on, off, stomp }];
}

function useBookList() {
  const [state, setState] = useLocalStorage("bookList", []);

  function addBook(book) {
    setState((oldState) => [
      ...oldState,
      {
        id: crypto.randomUUID(),
        ...book,
      },
    ]);
  }

  function deleteBook(bookId) {
    setState((oldState) => oldState.filter((book) => book.id !== bookId));
  }
  return [state, { addBook, deleteBook }];
}

function useHandleSubmit(onSubmit) {
  //schlechter usecase für hook
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  }

  return handleSubmit;
}

export { useToggle, useLightbulb, useBookList, useHandleSubmit };
