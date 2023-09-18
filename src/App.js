
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './ourComponents/Pages/Home';
import About from './ourComponents/Pages/About/About';
import NotFound from './ourComponents/Pages/NotFound';
import CreateNewTour from './ourComponents/Pages/CreateNewTour';
import TourIndex from './ourComponents/Pages/TourIndex';
import TourLive from './ourComponents/Pages/TourLive';
import EndTour from './ourComponents/Pages/EndTour/EndTour';
// Input this EndTour into TourLive.js has been finalized/populated

import NavBar from './ourComponents/NavBar/NavBar';
import Footer from './ourComponents/Footer/Footer';

//import BrowseTours from './ourComponents/BrowseTours'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <main>
          <div className="content-container">
            {/* Check App.css for content-container for padding */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/createnewtour" element={<CreateNewTour />} />
              <Route path="/tours" element={<TourIndex />} />
              <Route path="/tours/:id" element={<TourLive />} />
              <Route path="/endtour" element={<EndTour />} />
              {/* Take out or leave once tour live has populated */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
