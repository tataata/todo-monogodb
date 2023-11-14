import { useState , useEffect} from "react"

function EditItem({ item, toggleEdit, editItem }) {

  const [ text, setText ] = useState(item.task)

  useEffect ( () => {
    console.log('Edit item is loaded');
  }, [])

  useEffect(()=> {
    console.log('Change in the text state');
  }, [ text ])

  const handleSubmit = (event) => {
    event.preventDefault()
    // Call edit item to change the state in app:
    let updatedItem = { ...item, task: text }
    editItem(updatedItem)
    toggleEdit(false)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={text} 
        onChange={event => { setText(event.target.value) }} />
      <button> Save after edit</button>
    </form>
  )
}

export default EditItem