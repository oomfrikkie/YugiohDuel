import { Routes, Route, Link } from 'react-router-dom';
import Duel from './Duel';
import PlayerSetUp from './PlayerSetUp';
import History from './History';
import Test from './Test';
import '../styles/App.css';



function App() {
  return (
    <div>
      {/* Navigation buttons */}
   <div className='flex flex-row bg-[#003399]'>
    <h1>Logo</h1>
       <nav className="p-4 flex gap-6 ">
        <Link to="/setUp" className='rounded-[20px] text-white py-1 px-1 hover:bg-[#0055ff]'>Go to Duel</Link>
        <Link to="/history" className='rounded-[20px] text-white py-1 px-1 hover:bg-[#0055ff]' >View History</Link>
        <Link to="/test">Test</Link>
      </nav>
   </div>
     

      {/* Routes */}
      <Routes>
        <Route path="/setUp" element={<PlayerSetUp />} />
        <Route path="/history" element={<History />} />
         <Route path="/duel-page" element={<Duel />} />
         <Route path="/test" element={<Test />}></Route>
      </Routes>
    </div>
  );
}

export default App;
