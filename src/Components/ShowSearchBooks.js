import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookEntries from './BookEntries'

// To Do
// MatchedBooks should have shelf with value none
// MatchedBooks that have been moved to a shelf should reflect that in MyReads page

//const ShowSearchBooks = (props) => {
class ShowSearchBooks extends Component {
	state = {
    	query: '',
      	books: [],
      	screen: ''
    }

	// executes when search page is loaded
	componentDidMount() {
      	console.log(`inside ShowSearchBooks:componentDidMount()`)
		this.setState( () => ({
        	screen: 'search'
        })
        )
    	return this.props.onChangeScreen('search')
    }

	// executes when search bar to clicked
	updateQuery = (inputQuery) => {
      	console.log(`inputQuery: ${inputQuery}`)
    	this.setState( () => ({
        	query: inputQuery.trim()
        }))
		//console.log(`this.state.query is empty: ${this.state.query === ''}`)
      	
      	if(inputQuery.trim() !== '') {
          	console.log(`inputQuery.trim() is empty: ${inputQuery.trim() === ''}`)
        	BooksAPI.search(inputQuery.trim(), 30).then( (matchedBooks) => {
            	this.setState( () => ({
                	books: matchedBooks
                }))
            })
        }
    }

// self executing function not working
/*(()=> {
    	if(this.state.query !== '') {
        	console.log(`hi`)
        }
    })()*/


	// executes when back arrow is clicked
	componentWillUnmount() {
      	console.log(`inside ShowSearchBooks:componentWillUnmount()`)
    	return this.props.onChangeScreen('home')
    }

	render() {
        // destructure
        // const { query } = this.state
        // const { books } = this.state

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
                    { this.state.query !== '' &&
                        <ul className='books-grid'>
                            {this.state.books.map( book => {
                     			console.log(`book title: ${book.title}`)
								console.log(`book shelf: ${book.shelf}`)
								console.log(`book id: ${book.id}`)
								book.authors.map( author => console.log(`author: ${author}`))
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