import Banner from "@/app/(home)/components/Banner";
import BookList from "./components/BookList";

export default async function Home() {

  let books; 
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/books`);
    if(!response.ok) {
      throw new Error('An error occurred while fetching the books');
    }
    books = await response.json();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err: unknown) {
    throw new Error('An error occurred while fetching the books');
  }
    
  return (
    <>
      <Banner />
      <BookList books={books} />
    </>    
  );
}
