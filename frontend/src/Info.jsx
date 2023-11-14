import { useParams } from "react-router-dom"

function Info () {
  // Access the data in the url
  const { name } = useParams()


  return (
    <div>
    <p>This is a component getting info from the url!</p>
    <p>This is our employee: { name }</p>
    </div>
  )
}

export default Info