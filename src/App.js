import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
// import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom'
import ShowReadingList from './Components/ShowReadingList'
import ShowWantToReadList from './Components/ShowWantToReadList'
import ShowReadList from './Components/ShowReadList'
import ShowSearchBooks from './Components/ShowSearchBooks'

/**
* All the data lists live here, as the content of the list can move 
* from list to list, so 
**/

/**
* books is an array of book objects.
* need book.shelf and book.imageLinks.thumb, the latter determines 
* which shelf it belong, if at all.
**/

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false,
    currentlyReadingList: [],
    wantToReadList: [],
    readList: [],
    screen: '',
  }

	// it's executed once when component is mounted.
	componentDidMount() {
    	BooksAPI.getAll()
		.then( (books) => {
        	this.setState( () => ({
            	books,
                screen: 'home',
            }))
          	this.setState( () => ({
                currentlyReadingList: books.filter( (book) => {
                	return book.shelf === "currentlyReading"
                }),
              	wantToReadList: books.filter( (book) => {
                	return book.shelf === "wantToRead"
                }),
              	readList: books.filter( (book) => {
                	return book.shelf === "read"
                }),
            }))
        })
    }

	changeScreen = (pageName) => {
    	this.setState( {screen: pageName} )
    }

	// update state and upend server after shelf change
	changeShelf = (bookToChange, oldShelf, newShelf) => {
      	if (newShelf !== oldShelf) {
          	// update -- remove book from old shelf
          	switch (oldShelf) {
                case 'currentlyReading':
                    this.setState( prevState => ({
                        currentlyReadingList: prevState.currentlyReadingList.filter( book => 
                            book.id !== bookToChange.id)
                    }))
                    break
                case 'wantToRead':
                    this.setState( prevState => ({
                        wantToReadList: prevState.wantToReadList.filter( book => book.id !== bookToChange.id )
                    }))
                    break
                case 'read':
                    this.setState( prevState => ({
                        readList: prevState.readList.filter( book => book.id !== bookToChange.id )
                    }))
                    break
                default:
            }
          	// assign book to new shelf
			bookToChange.shelf = newShelf
          	// add book to new shelf and update the book shelf state
            switch(newShelf) {
            	case 'currentlyReading':
                    this.setState( prevState => ({
                        currentlyReadingList: [...prevState.currentlyReadingList, bookToChange]
                    }))
                    break
                case 'wantToRead':
                    this.setState( prevState => ({
                        wantToReadList: [...prevState.wantToReadList, bookToChange]
                    }))
                    break
                case 'read':
                    this.setState( prevState => ({
                        readList: [...prevState.readList, bookToChange]
                    }))
                    break
              	default:
            } 
          	// update backend server of the book shelf with new book
          	BooksAPI.update(bookToChange, newShelf).then( res => res)
        }
    } 

  render() {
      return (
          <div className="app">
            <div>    
                <Route path='/search' render={()=> (
                    <ShowSearchBooks 
                        books={this.state.books} 
                        onChangeScreen={this.changeScreen}
                        onChangeShelf={this.changeShelf}
                    />
                )} />
            </div>
			<div>
				<Route exact path='/' render={()=> 
					(<div className='list-books-title'><h1>MyReads</h1></div> &&
					<div className='open-search'><Link to="search"></Link></div>)
				} />
			</div>
            <div className='list-books-content'>  
                <div className='bookshelf'>
                    <Route exact path='/' render={()=> (
                        <ShowReadingList 
                            books={this.state.currentlyReadingList}
                            onChangeShelf={this.changeShelf}
                        />
                    )} />
                </div>
                <div className='bookshelf'>
                    <Route exact path='/' render={()=> (
                        <ShowWantToReadList 
                            books={this.state.wantToReadList}
                            onChangeShelf={this.changeShelf} 
                        />
                    )} />
                </div>
                <div className='bookshelf'>
                    <Route exact path='/' render={ ()=> 
                        <ShowReadList 
                            books={this.state.readList}
                            onChangeShelf={this.changeShelf} 
                        />
                    }/>
                </div>
          	</div>
          </div>
      )
  }
}

export default BooksApp
