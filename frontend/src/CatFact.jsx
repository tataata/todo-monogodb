import { useEffect, useState } from "react"

function CatFact() {

  const [text, setText] = useState('before fetch is done')
  const [error, setError] = useState('')

  useEffect(() => {
    console.log('Cat fact is loaded');
    const getCatFact = async () => {

      try {
        let response = await fetch('https://meowfacts.herokuapp.com/')

        if (response.status === 200) {
          let dataFromAPI = await response.json()
          setText(dataFromAPI.data[0])
        } else {
          // display error message:
          setError('There was an error fetching the data')
          // OR:
          throw Error('Something went wrong!')
        }
      } catch (er){
        console.log(er);
        setError(er.message)
        // alert(er.message)
      } 
     
    }
    getCatFact()
  }, [])

  return (
    <div className="CatFact">
      <h2>A fact about cats:</h2>
      <p> {error ? error : text} </p>
    </div>
  )
}

export default CatFact