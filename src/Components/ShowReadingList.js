import React from 'react'
import BookEntries from './BookEntries'

const ShowReadingList = (props) => {

    return (
      <div>
      							<div className='bookshelf-title'><h4>Currently Reading</h4></div>
                        <div className='bookshelf-books'>
            <ul className='books-grid'>
              	{ props.books.map( book =>
      				// book.id !== undefined &&
      				<BookEntries key={book.id} book={book} onChangeShelf={props.onChangeShelf} />) }
            </ul>
        </div>

		</div>
    )
}

export default ShowReadingList