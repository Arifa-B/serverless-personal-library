import dateFormat from 'dateformat'
import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'

import { createBook, deleteBook, getBooks, patchBook } from '../api/books-api'
import { Book } from '../types/Book'

interface BooksProps {
  history: History
}

interface BooksState {
  books: Book[]
  newBookTitle: string
  newBookAuthor: string
  newBookGenre: string
  loadingBooks: boolean
}

export class Books extends React.PureComponent<BooksProps, BooksState> {
  state: BooksState = {
    books: [],
    newBookTitle: '',
    newBookAuthor: '',
    newBookGenre: '',
    loadingBooks: true
  }

  handleBookTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newBookTitle: event.target.value })
  }

  handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newBookAuthor: event.target.value })
  }

  handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newBookGenre: event.target.value })
  }

  onBookCreate = async () => {
    try {
      const newBook = await createBook( {
        title: this.state.newBookTitle,
        author: this.state.newBookAuthor,
        genre: this.state.newBookGenre
      })
      const books = await getBooks()
      this.setState({
        books,
        loadingBooks: false
      })
    } catch {
      alert('Book creation failed')
    }
  }

  onBookDelete = async (title: string) => {
    try {
      await deleteBook(title)
      const books = await getBooks()
      this.setState({
        books,
        loadingBooks: false
      })
    } catch {
      alert('Book deletion failed')
    }
  }

  async componentDidMount() {
    try {
      const books = await getBooks()
      this.setState({
        books,
        loadingBooks: false
      })
    } catch (e) {
      alert(`Failed to fetch books: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
          <Header as="h1">Your Books</Header>

          {this.renderCreateBookInput()}

          {this.renderBooks()}
      </div>
    )
  }

  renderCreateBookInput() {
    return (
      <Grid.Row>
        <Grid.Column width={8}>

          <Input
            fluid
            actionPosition="left"
            placeholder="Book title..."
            onChange={this.handleBookTitleChange}
          />

          <Input
            fluid
            actionPosition="left"
            placeholder="Book author..."
            onChange={this.handleAuthorChange}
          />

          <Input
            fluid
            actionPosition="left"
            placeholder="Book genre..."
            onChange={this.handleGenreChange}
          />

          <Button
            color="green"
            content="Add New Book"
            icon="add"
            onClick={this.onBookCreate}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>
    )
  }

  renderBooks() {
    if (this.state.loadingBooks) {
      return this.renderLoading()
    }

    return this.renderBooksList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Books
        </Loader>
      </Grid.Row>
    )
  }

  renderBooksList() {
    return (
      <Grid padded>
        <Grid.Row key={0}>
          <Grid.Column width={3} verticalAlign="middle">
            Title
          </Grid.Column>
          <Grid.Column width={5} verticalAlign="middle">
            Author
          </Grid.Column>
          <Grid.Column width={4} floated="right">
            Genre
          </Grid.Column>
          <Grid.Column width={1} floated="right">
          </Grid.Column>
          <Grid.Column width={16}>
            <Divider />
          </Grid.Column>
        </Grid.Row>
        {this.state.books ? this.state.books.map((book, pos) => {
          return (
            <Grid.Row key={book.title}>
              <Grid.Column width={3} verticalAlign="middle">
                {book.title}
              </Grid.Column>
              <Grid.Column width={5} verticalAlign="middle">
                {book.author}
              </Grid.Column>
              <Grid.Column width={4} floated="right">
                {book.genre}
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => this.onBookDelete(book.title)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        }): null}
      </Grid>
    )
  }

}