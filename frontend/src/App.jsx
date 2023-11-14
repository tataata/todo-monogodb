import { Route, Routes, Link } from 'react-router-dom'
import './App.css'

import CatFact from './CatFact'
import ToDoApp from './ToDoApp'
import About from './About'
import NotFound from './NotFound'
import Info from './Info'

function App() {

  return (
    <div className='App d-flex flex-column align-items-center'>
      <Routes>
        <Route path='/' element={<ToDoApp />} />
        <Route path='/cat' element={<CatFact />} />
        <Route path='/about' element={<About />} />
        {/* A dynamic route */}
        <Route path='/info/:name' element={<Info />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {/* <footer className='p-3 w-100'>
        <Link to='/'>To do App</Link>
        <Link to='/cat'>Cats</Link>
        <Link to='/about'>About</Link>
      </footer> */}
    </div>
  )
}

export default App