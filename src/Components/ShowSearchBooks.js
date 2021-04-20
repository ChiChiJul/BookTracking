import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookEntries from './BookEntries'

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
    	return this.props.onChangeScreen('search')
    }

	// executes when search bar to clicked
	updateQuery = (inputQuery) => {
      	console.log(`------------------`)
      	console.log(`inside ShowSearchBooks:updateQuery`)
      	console.log(`input is: ${inputQuery.trim()}`)
      	// search books is not empty, length is 0, is an array
      	console.log(`is search books empty: ${this.state.books === ''}. Search books length: ${this.state.books.length}.
					Array: ${this.state.books instanceof Array}`)
      	console.log(`is inputQuery: ${inputQuery.trim()}. query length: ${inputQuery.trim()}`)
      	console.log(`------------------`)
    	return this.setState( () => ({
        	query: inputQuery.trim()
        }))	
    }

	/*searchBooks = BooksAPI.search()
		.then( books => {
          	console.log(`books is undefined: ${books === undefined}`)
        	this.setState( () => ({
        		books,
       			//screen: 'search'
        	}))
        })*/

	// search books based on input query
	/*searchBooks = (inputQuery, maxResult) => {
      	try {
            BooksAPI.search(inputQuery, 1)
            .then( (matchedBooks) => {
                console.log(`inside searchBooks()`)
                console.log(`is matchedBooks undefined: ${matchedBooks === undefined}`) // true
                console.log(`matchedBooks is ${matchedBooks}`)
                if (matchedBooks !== undefined) {
                    return this.setState( () => ({
                        books: matchedBooks,
                    }))
                }
                else if (matchedBooks === undefined) {
                    return false
                }
        	
            }).catch( (err) =>
                console.log(`error: ${err}`)
            )
      	/*console.log(`inside searchBooks()`)
      	return this.setState( () => ({
        	books: BooksAPI.search(inputQuery, maxResult)
        }))*/
        //}catch(e) {
        	//console.log(`error: ${e}`)
        //}finally {
        	//return false
        //}
    //}*/

	searchBooks = (inputQuery, maxResult) => {
    	if(inputQuery !== '') {
        	BooksAPI.search(inputQuery, maxResult).then( (matchedBooks) => {
            	console.log(`matchedBooks is an Array: ${matchedBooks instanceof Array}.
					matchedBooks length: ${matchedBooks.length}`)
              	return this.setState( ()=> ({ books: matchedBooks }))
            })
        } else if(inputQuery === '') {
        	return this.state.books
        }
    }


	// executes when back arrow is clicked
	componentWillUnmount() {
      	console.log(`inside ShowSearchBooks:componentWillUnmount()`)
    	return this.props.onChangeScreen('home')
    }

	render() {
        // destructure
        // const { query } = this.state
        // const { books } = this.state
      	
      
      	// books is defined
      	//?????????? it seems that if the evaluation is true, infinite loop is entered?
		/*const showingBooks = this.state.query === ''
			? this.searchBooks(this.state.query, 10) 
			: this.state.books.filter ( book => { 
              	console.log(`in showingBooks. this.state.books.length: ${this.state.books.length}`)
              	return (book.title.toLowerCase().includes( this.state.query.toLowerCase())
                       || book.authors.some( author => author.toLowerCase().includes(this.state.query.toLowerCase()))
                       )
            })*/
      
		// ????? why is method searchBooks() runs nonstop?  
      	// the three statement doesn't get executed because the previous statement won't stop executing
      	const showingBooks = this.state.query !== '' &&
      		this.searchBooks(this.state.query, 20) &&
			this.state.books.filter ( book => { 
              	console.log(`in showingBooks. this.state.books.length: ${this.state.books.length}.
					book title: ${book.title}.`)
              	return (book.title.toLowerCase().includes( this.state.query.toLowerCase())
                       || book.authors.some( author => author.toLowerCase().includes(this.state.query.toLowerCase()))
                       )
            })

		console.log(`this.state.query is empty: ${this.state.query === ''}`)

		//console.log(`~~~~~~~~~~is search books empty: ${this.state.books === ''}. Search books length: ${this.state.books.length}.
		//			Array: ${this.state.books instanceof Array}. this state book is undefined: ${this.state.books === undefined}~~~~~~~~~~~~`)

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
                            {showingBooks.map( book =>
                                <BookEntries key={book.id} book={book} onChangeShelf={this.props.onChangeShelf} />
                            )}
                        </ul> 
                    }
				</div>
				
        	</div>
        )
    }
}

export default ShowSearchBooks