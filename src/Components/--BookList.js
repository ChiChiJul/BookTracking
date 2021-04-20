import React from 'react'
import BookEntries from './BookEntries'

const BookList = (props) => {
  	/* showBooks = () => {
    	if(props.books) {
        	console.log('yay')
        }
    } */
  	
  	console.log(props.books instanceof Array)
  	console.log(props.books instanceof Object)

  
	return (
    	<div>
      		<p className="books">Books</p>
      		<p>{props.books.length}</p>
            <ol className="book">
{ props.books.map( (index, book) => <li key={index}> {book.shelf} {book.imageLinks.thumbnail} </li> )} 
{/* { props.books.map( (index, book) => <BookEntries key={index} book={book} /> )} */}
            </ol>


      	</div>
    )
}

export default BookList