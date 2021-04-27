import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookEntries from './BookEntries'

class ShowSearchBooks extends Component {
	state = {
    	query: '',
      	books: [],
      	screen: ''
    }

	// executes when search page is loaded
	componentDidMount() {
		this.setState( () => ({
        	screen: 'search'
        }))
    	this.props.onChangeScreen('search')
    }

	// executes when search bar to clicked
	updateQuery = (inputQuery) => {
    	this.setState( { query: inputQuery.trim() })
      	// if input is not empty, search for books that match the input
      	if(inputQuery.trim() !== '') {
            try {
                BooksAPI.search(inputQuery.trim(), 5).then( (matchedBooks) => {
                    if (matchedBooks.length !== undefined) {
                        matchedBooks.map( book => {
                          	console.log(`updateQuery`)
                            if(book.imageLinks === undefined) {
                                book.imageLinks = ''
                            }
                            else if(book.shelf === undefined) {
                                book.shelf = 'none'
                            }
                            else if(book.authors.length === undefined) {
                                  book.authors = []
                            }
                            return book
                        })
                        this.setState( {books: matchedBooks} )
                    }
                    // if search has no match/empty, books is set to empty
                    else if(matchedBooks.length === undefined) {
                        console.log(`search is undefined. matchedBooks length: ${matchedBooks.length}`)
                        this.setState( () => ({
                            books: []
                        }))
                    }
                })
                } catch (error) {
                console.log(`${error}`)
            }
        }
    }

	// executes when back arrow is clicked
	componentWillUnmount() {
    	this.props.onChangeScreen('home')
    }

	render() {
    	return(
        	<div>
          		<div className='search-books-bar'>         		
                    <Link to="/" className='close-search'>Close</Link>
          			<span className='search-books-input-wrapper'>
                        <input 
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query} 
                            onChange={(event) => this.updateQuery(event.target.value)} 
                        />
					</span>
				</div>
				<div className='search-books-results'>
                    { this.state.books.length !== 0 &&
                        <ul className='books-grid'>
                            {this.state.books.map( book => {
                                return <BookEntries key={book.id} book={book} onChangeShelf={this.props.onChangeShelf} />
							})}
                        </ul> 
                    }
				</div>
        	</div>
        )
    }
}

export default ShowSearchBooks