import { apiEndpoint } from '../config'
import { Book } from '../types/Book';
import { CreateBookRequest } from '../types/CreateBookRequest';
import Axios from 'axios';
import { UpdateBookRequest } from '../types/UpdateBookRequest';

export async function getBooks(): Promise<Book[]> {
  console.log('Fetching books')

  const response = await Axios.get(`${apiEndpoint}/books`, {
    headers: {
      'Content-Type': 'application/json'
    },
  })
  console.log('Books:', response.data)
  return response.data.Books
}

export async function createBook(
  newBook: CreateBookRequest
): Promise<Book> {
  const response = await Axios.put(`${apiEndpoint}/books`,  JSON.stringify(newBook), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
  return response.data.book
}

export async function patchBook(
  title: string,
  updatedBook: UpdateBookRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/books/${title}`, JSON.stringify(updatedBook), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}

export async function deleteBook(
  title: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/books/${title}`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}