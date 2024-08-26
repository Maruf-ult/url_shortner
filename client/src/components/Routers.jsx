
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
import Allurl from './Allurl'
import Home from './Home';
function Routers() {
  return (
       <Router>
            <Routes>
                   <Route path='/' element={<Home></Home>}   />
                 <Route path='/all-url' element={<Allurl></Allurl>}   />
            </Routes>
       </Router>
  )
}

export default Routers