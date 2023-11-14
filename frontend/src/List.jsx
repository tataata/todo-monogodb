import './List.css'
import ListItem from './ListItem';

const List = ({ tasks, deleteItem, editItem, deleteAllTasks }) => {

  return (
    <div className="List mt-5 d-flex
    flex-column align-items-center">
      <h2>These are your tasks</h2>
      <button className='btn btn-danger mt-3' onClick={deleteAllTasks}>Delete all tasks</button>
      <ul>
        {(tasks.length > 0) ? (
          tasks.map(item => {
            return <ListItem key={item.id} item={item} deleteItem={deleteItem} editItem={editItem}/>
          })
        ) : (
          <li>No tasks</li>
        )
        }
      </ul>
    </div>
  );
}

export default List;
