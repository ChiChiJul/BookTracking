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
      	console.log("inside componentDidMount")
    	BooksAPI.getAll()
		.then( (books) => {
          	/*console.log(`inside App.js componenetDidMount. books is undefined:
				${books === undefined}. ****Total number of books: ${books.length}****`)*/
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
      	console.log(`screen: ${pageName}`)
    	this.setState( {screen: pageName} )
    }

	// ****************
	// need to update state after changeShelf
	changeShelf = (bookToChange, oldShelf, newShelf) => {
      	if (newShelf !== oldShelf) {
          	console.log(`old shelf: ${oldShelf}, new shelf: ${newShelf}`)
          	if (oldShelf === 'currentlyReading') {
                console.log(`@@@@@@@@@@@@@@inside if oldShelf === 'currentlyReading'`)
              	// updage -- remove bookToChange from currentlyReadingList
            	this.setState( prevState => ({
                  	currentlyReadingList: prevState.currentlyReadingList.filter( book => 
                                                                                book.id !== bookToChange.id)
                }))
              	// update -- move bookToChange to wantToReadList
              	if (newShelf === 'wantToRead') {
                  	// bookToChange has a new shelf
                  	bookToChange.shelf = newShelf
                	this.setState( prevState => ({
                    	wantToReadList: [...prevState.wantToReadList, bookToChange]
                    }))
                }
              	// update -- move bookToChange to readList
              	else if (newShelf === 'read') {
                  	// bookToChange has a new shelf
                  	bookToChange.shelf = newShelf
                	this.setState( prevState => ({
                    	readList: [...prevState.readList, bookToChange]
                    }))
                }
    		}
            else if (oldShelf === 'wantToRead') {
              	console.log(`@@@@@@@@@@@@@@inside else if oldShelf === 'wantToRead'`)
              	// update -- remove bookToChange from wantToReadList
				this.setState( prevState => ({
                  	wantToReadList: prevState.wantToReadList.filter( book => book.id !== bookToChange.id )
                }))
              	// update -- move bookToChange to currentlyReadingList
              	if (newShelf === 'currentlyReading') {
                  	// bookToChange has a new shelf
                  	bookToChange.shelf = newShelf
                	this.setState( prevState => ({
                    	currentlyReadingList: [...prevState.currentlyReadingList, bookToChange]
                    }))
                }
              	// update -- move bookToChange to readList
              	else if (newShelf === 'read') {
                  	// bookToChange has a new shelf
                  	bookToChange.shelf = newShelf
                	this.setState( prevState => ({
                    	readList: [...prevState.readList, bookToChange]
                    }))
                }
            }
            else if (oldShelf === 'read') {
                console.log(`@@@@@@@@@@@@@@inside else if oldShelf === 'read'`)
              	// update -- remove bookToChange from readList
           		this.setState( prevState => ({
                	readList: prevState.readList.filter( book => book.id !== bookToChange.id )
                }))
              	if (newShelf === 'wantToRead') {
                  	// bookToChange has a new shelf
                  	bookToChange.shelf = newShelf
                  	// update -- add bookToChange to wantToReadList
                	this.setState( prevState => ({
                    	wantToReadList: [...prevState.wantToReadList, bookToChange]
                    }))
                }
              	else if (newShelf === 'currentlyReading') {
                  	// bookToChange has a new shelf
                    bookToChange.shelf = newShelf
                  	// update -- add bookToChange to currentlyReadingList
                	this.setState( prevState => ({
                    	currentlyReadingList: [...prevState.currentlyReadingList, bookToChange]
                    }))
                }
            }
        }
    } 

  render() {
      /*console.log(`inside App.js render(). readList is an array: ${this.state.readList instanceof Array}. 
		  this.state.readList is ${typeof(this.state.readList)}`)*/

      return (
          <div className="app">
			<div>
            	{this.state.screen === 'home' && 
           			(<div className='list-books-title'><h1>MyReads</h1></div>)}
 				{this.state.screen === 'home' && (<div className='open-search'><Link to="search"></Link></div>)}
			</div>
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
          </div>
      )
  }
}

export default BooksApp
