import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
// import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom'
import ShowReadingList from './Components/ShowReadingList'
import ShowWantToReadList from './Components/ShowWantToReadList'
import ShowReadList from './Components/ShowReadList'
import SearchBooks from './Components/SearchBooks'

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
    readingList: [],
    wantToReadList: [],
    readList: [],
    screen: '',
  }

	// it's executed once when component is mounted.
	componentDidMount() {
      	console.log("inside componentDidMount") // not executed
    	BooksAPI.getAll()
		.then( (books) => {
        	this.setState( () => ({
            	books,
                screen: 'home',
            }))
          	this.setState({
                readingList: books.filter( (book) => {
                	return book.shelf === "currentlyReading"
                }),
              	wantToReadList: books.filter( (book) => {
                	return book.shelf === "wantToRead"
                }),
              	readList: books.filter( (book) => {
                	return book.shelf === "read"
                }),
            })
        })
    }

	changeScreen = (pageName) => {
      	console.log(`screen: ${pageName}`)
    	this.setState( {screen: pageName} )
    }

  render() {
      return (
          <div className="app">
           		<Route path='/search' render={()=> (
    				<SearchBooks books={this.state.books} changeScreen={this.changeScreen} />
    			)} />
                {this.state.screen === 'home' &&
                    <Link to="search" className="search">Search Book</Link>
                }
              	<Route exact path='/' render={()=> (
                	<ShowReadingList books={this.state.readingList} />
                )} />
              	<Route exact path='/' render={()=> (
                	<ShowWantToReadList books={this.state.wantToReadList} />
                )} />
              	<Route exact path='/' render={()=> (
                	<ShowReadList books={this.state.readList} />
                )} />
              
          </div>
      )
  }
}

export default BooksApp

