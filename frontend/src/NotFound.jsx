import { Link } from "react-router-dom"

function NotFound () {
  return (
    <div className="NotFound">
      <h3>No page here</h3>
      <Link to='/'> Go back to the main page</Link>
    </div>
  )
}

export default NotFound