import React from 'react'
import BookEntries from './BookEntries'

const ShowWantToReadList = (props) => {

	return(
      	<div>
      		<div className='bookshelf-title'><h4>Want To Read</h4></div>
            <div className='bookshelf-books'>
                <ul className='books-grid'>
                    {props.books.map( book => <BookEntries key={book.id} book={book} onChangeShelf={props.onChangeShelf} /> )}
                </ul>
			</div>
		</div>
    )
}

export default ShowWantToReadList