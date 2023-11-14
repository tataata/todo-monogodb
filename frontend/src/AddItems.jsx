import { useState } from "react";

function AddItems(props) {
  const [text, setText] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    props.addOneItem(text)
    setText('')
  }

  return (
    <div className="AddItems">
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          minLength={1}
          maxLength={10}
          placeholder="Add a to do"
          value={text}
          onChange={event => { setText(event.target.value) }}
        />
         <button type="submit" className='btn button-primary'disabled={text.length < 3 || text.length > 10} >Add</button>
      </form>
    </div>
  )
}

export default AddItems