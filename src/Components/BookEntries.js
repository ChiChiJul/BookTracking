import React, { Component } from 'react'

class BookEntries extends Component {
	state = {
    	value: ''
    }

	
	// arg this.state.value to this.props.onChangeShelf is empty
	handleChange = (bookToChange, oldBookId, event) => {
      	// console.log(this.props.length)
      	// console.log(`inside BookEntries, handleChange`)
      	// console.log(`bookID ${bookID}, event ${event.target.value}`)
      	// value is set, then callback this.props.onChangeShelf() is called
      	console.log(`inside BookEntries, inside handleChange`)
    	return this.setState( {value: event.target.value}, console.log(`value: ${event.target.value} 
			:::: inside BookEntries before onChangeShelf`),
			this.props.onChangeShelf(bookToChange, oldBookId, event.target.value)
		)
    }
  
    render() {
      	const { id, book } = this.props
		const bookToChange = book
		const oldShelf = bookToChange.shelf

        return (
            <div>
                <li key={id} >
                        <div className="book">
                              <div className="book-top">
                                  <div className="book-cover" 
                                      style={{ 
                                             width: 128, 
                                             height: 188, 
											 backgroundImage: `url(${bookToChange.imageLinks.thumbnail})` 
                                      }}>
                                  </div>
									{/* even though books are displayed in the correct in their library based on the
									// the book's shelf, the value for shelf is defaulted to currently reading */}
                                  <div className="book-shelf-changer">
                                      <select 
                                            value={oldShelf} 
                                            onChange={ (event) => 
												this.handleChange(bookToChange, oldShelf, event) 
											}>
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                      </select>
                                    </div>
                                </div>
                              	<div className="book-title">{bookToChange.title}</div>
                              	<div className="book-authors">{bookToChange.authors.map( author => author)}</div>
								<div>{ this.state.value }</div>
                            </div>
                </li>
            </div>
        )
	}
}

export default BookEntries