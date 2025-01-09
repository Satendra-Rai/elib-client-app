import { Book } from "@/types";
import Image from "next/image";
import React from "react";
import DownloadButton from "./components/DownloadButton";

const SingleBookPage = async ({ params }: { params: { bookId: string } }) => {
  
  //validate params
  const { bookId } = params;
  if(!bookId) {
    throw new Error("Book ID is missing.");
  }
  let book: Book | null = null;
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/books/${bookId}`, {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch book with ID: ${bookId}`);
    }
    book = await response.json();
  } catch (err: unknown) {
    console.error("Error fetching book:", err);
    throw new Error("Error fetching book data. Please try again later.");
  }

  if (!book) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-10 text-center text-primary-950">
        <h2 className="text-3xl font-bold">Book Not Found</h2>
        <p className="mt-4">The requested book could not be found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-3 gap-10 px-5 py-10">
      <div className="col-span-2 pr-16 text-primary-950">
        <h2 className="mb-5 text-5xl font-bold leading-[1.1]">{book.title}</h2>
        <span className="font-semibold">by {book.author.name}</span>
        <p className="mt-5 text-lg leading-8">{book.description}</p>
        <DownloadButton fileLink={book.file} />
      </div>
      <div className="flex justify-end">
        <Image
          src={book.coverImage}
          alt={book.title}
          className="rounded-md border"
          height={0}
          width={0}
          sizes="100vw"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default SingleBookPage;
