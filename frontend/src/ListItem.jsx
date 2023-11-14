import { useState, useEffect } from "react"

import EditItem from "./EditItem"

function ListItem ({ item, deleteItem, editItem }){

  const [ edit, setEdit ] = useState(false)

  // Runs when the component is loaded onto the page:
  useEffect(() => {
    // console.log('List Item is loaded');
  }, [])

  const toggleEdit = (value) => {
    setEdit(value)
  }

  return (
    <li className="m-2"> 
      { edit === true ? ( 
        <>
        <EditItem item={item} toggleEdit={toggleEdit} editItem={editItem} />
      </>
      ) : (
         <>
         {item.task} 
         <button className="btn btn-danger m-2" onClick={() => deleteItem(item.id)}>Delete</button> 
         <button className="btn btn-primary" onClick={ () => toggleEdit(true)}>Edit</button>
       </>
      )}
      </li>
  )
}

export default ListItem