import { useBookList } from "../helpers/hooks";

function MyApp({ Component, pageProps }) {
  const [bookList, bookListSetters] = useBookList();

  return (
    <Component
      {...pageProps}
      bookList={bookList}
      bookListSetters={bookListSetters}
    />
  );
}

export default MyApp;
