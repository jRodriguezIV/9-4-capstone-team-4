
import React, { useState  } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import loadingAnimation from '../../assets/S-Loop_transnparent.gif';
import Map from '../Map/Map';


function sanitizeInput(input) {
  return input.replace(/'/g, "''");
}

const config = {
  openaiApiKey: process.env.REACT_APP_OPENAI_API_KEY,
  apiUrl: process.env.REACT_APP_API_URL,
  googleApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  unsplashApiKey: process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY,
};

const fetchCityPhoto = async (cityName, setCityPhoto) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cityName)}&client_id=${config.unsplashApiKey}&count=1&order_by=relevant&per_page=1`
    );

    const photoUrl = response.data.results[0]?.urls?.regular || '';

    setCityPhoto(photoUrl);

    return photoUrl;
  } catch (error) {
    console.error('Error fetching city photo:', error);
    return '';
  }
};

export default function CreateNewTour() {
  const [tour, setTour] = useState({
    country: '',
    region: '',
    state: '',
    city: '',
    duration: 'Full-day',
    difficulty: 'Medium',
    theme: 'Historic',
  });

  const [tourContent, setTourContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cityPhoto, setCityPhoto] = useState('');
  const [tour_id, setTour_id] = useState(null);


  const parsePointsOfInterest = (generatedTour) => {
    const bulletPattern = /^\s*\d+\.\s(.+)$/gm;
    const matches = [];
    let match;
    while ((match = bulletPattern.exec(generatedTour)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  };

  const generateWalkingTour = async () => {
    try {
      setIsLoading(true);

      const sanitizedCity = sanitizeInput(tour.city);
      const sanitizedRegion = sanitizeInput(tour.region);
      const sanitizedState = sanitizeInput(tour.state);
      const sanitizedCountry = sanitizeInput(tour.country);
      const sanitizedDuration = sanitizeInput(tour.duration);
      const sanitizedDifficulty = sanitizeInput(tour.difficulty);
      const sanitizedTheme = sanitizeInput(tour.theme);

      const prompt = `Walking Tour in ${sanitizedCity}, ${sanitizedRegion}, ${sanitizedState}, ${sanitizedCountry}\nTour Duration: ${sanitizedDuration}\nDifficulty Level: ${sanitizedDifficulty}\nTour Theme: ${sanitizedTheme},`;

      const requestBody = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Create a self-guided walking tour where a person can start somewhere and follow a route from the start point to each point of interest and returning to the start point when the tour is over.  I only want the tour route and what points of interest are on that route. I will ask later for an in-depth tour of each point of interest.',
          },
          {
            role: 'user',
            content: prompt,
          },
          {
            role: 'user',
            content: `Use this as a format example for the response I want to get. I do not want any additional information other than what is in this example, also notice how the start point and end point are the same: 
          
          // Start Point: Plaça de Catalunya
          
          // Route:
          1. Plaça de Catalunya
          2. La Rambla
          3. Palau Güell
          4. Plaça Reial
          5. Barcelona Cathedral
          6. Santa Maria del Mar
          7. Picasso Museum
          8. Parc de la Ciutadella
          9. Arc de Triomf
          10. Sagrada Família
          11. Casa Batlló
          12. Casa Milà (La Pedrera)
          13. Passeig de Gràcia
          14. Plaça de Catalunya`
          }          
        ],
      };

      const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.openaiApiKey}`,
        },
      });

      const generatedTour = response.data.choices[0]?.message.content;
      setTourContent(generatedTour);

      const pointsOfInterest = parsePointsOfInterest(generatedTour);
      const sanitizedPointsOfInterest = pointsOfInterest.map(sanitizeInput);

      console.log('Points of Interest: ', sanitizedPointsOfInterest);

      setIsLoading(false);

      return generatedTour;

    } catch (error) {
      console.error('Error:', error);
      setTourContent('Error generating the walking tour. Please try again.');
      setIsLoading(false);
    }
  };

  const handleDropdownChange = (event) => {
    const { id, value } = event.target;
    setTour({ ...tour, [id]: value });
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setTour({ ...tour, [name]: value });
  };

  const generateTourName = () => {
    const { city, country, theme, duration, difficulty } = tour;
    const name = `${city}, ${country} ${theme} tour - lasting ${duration} with ${difficulty} difficulty.`;
    console.log('Generated Tour Name:', name);
    return name;
  };

  const insertPointOfInterest = async (poi, tour_id, coordinates, image_url) => {
    const poiData = {
      poi_name: poi,
      tour_id: tour_id,
      latitude: coordinates?.lat || null,
      longitude: coordinates?.lng || null,
      image_url: image_url || null,
    };

    console.log('Data being sent to backend for Point of Interest:', poiData);

    try {
      const response = await axios.post(`${config.apiUrl}/pointofinterest`, poiData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(`Point of Interest "${poi}" added successfully:`, response.data);
    } catch (error) {
      console.error(`Error adding Point of Interest "${poi}":`, error);
    }
  };

  const insertPointsOfInterest = async (tourId, pointsOfInterest) => {
    try {
      for (const poi of pointsOfInterest) {
        const coordinatesAndImage = await getCoordinatesAndImageForPointOfInterest(poi, config.googleApiKey);
        const { coordinates, imageUrl } = coordinatesAndImage;
        await insertPointOfInterest(poi, tourId, coordinates, imageUrl);
      }
    } catch (error) {
      console.error('Error inserting points of interest:', error);
    }
  };

  const getCoordinatesAndImageForPointOfInterest = async (poi, apiKey) => {
    try {
      const coordinatesResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(poi)}&inputtype=textquery&fields=geometry&key=${apiKey}`
      );
  
      const coordinatesData = coordinatesResponse.data.candidates[0]?.geometry?.location;
  
      // Fetch image using the Place Details request
      const placeDetailsResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${coordinatesResponse.data.candidates[0].place_id}&fields=photos&key=${apiKey}`
      );
  
      const photoReference = placeDetailsResponse.data.result?.photos?.[0]?.photo_reference;
  
      if (coordinatesData && photoReference) {
        const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
        return { coordinates: coordinatesData, imageUrl };
      }
    } catch (error) {
      console.error(`Error fetching data for ${poi}:`, error);
    }
  
    return { coordinates: null, imageUrl: '' };
  };
  



  const handleSubmit = async (e) => {
    e.preventDefault();

    let generatedWalkingTour = await generateWalkingTour();

    const pointsOfInterest = parsePointsOfInterest(generatedWalkingTour);
    const sanitizedPointsOfInterest = pointsOfInterest.map(sanitizeInput);

    const cityPhoto = await fetchCityPhoto(tour.city, setCityPhoto);

    const newTour = {
      country: sanitizeInput(tour.country),
      region: sanitizeInput(tour.region),
      state: sanitizeInput(tour.state),
      city: sanitizeInput(tour.city),
      duration: sanitizeInput(tour.duration),
      difficulty: sanitizeInput(tour.difficulty),
      theme: sanitizeInput(tour.theme),
      tour_name: generateTourName(),
      image_url: cityPhoto,
      ordered_points_of_interest: sanitizedPointsOfInterest,
    };

    try {
      const response = await axios.post(`${config.apiUrl}/tours`, newTour, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Tour added successfully:', response.data);

      setTour_id(response.data.id);
      console.log('Tour ID:', tour_id);

      insertPointsOfInterest(response.data.id, sanitizedPointsOfInterest);

    } catch (error) {
      console.error('Error adding tour:', error);
    }
  }



  return (
    <div className="container mt-5" style={{ paddingTop: '160px' }}>
      <h1 className="text-center mb-4">Walking Tour Generator</h1>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="City"
            name="city"
            value={tour.city}
            onChange={handleTextChange}
          />
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Borough/Region"
            name="region"
            value={tour.region}
            onChange={handleTextChange}
          />
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="State/County/Province"
            name="state"
            value={tour.state}
            onChange={handleTextChange}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Country"
            name="country"
            value={tour.country}
            onChange={handleTextChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <select
            className="form-control"
            value={tour.duration}
            onChange={handleDropdownChange}
            id="duration"
          >
            <option value="Full-day">Full-day</option>
            <option value="Half-day">Half-day</option>
            <option value="2 hours">2 hours</option>
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={tour.difficulty}
            onChange={handleDropdownChange}
            id="difficulty"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={tour.theme} // Updated: theme instead of tourType
            onChange={handleDropdownChange}
            id="theme" // Updated: theme instead of tourType
          >
            <option value="Historic">Historic</option>
            <option value="Scenic">Scenic</option>
            <option value="Fun">Fun</option>
            <option value="Museums">Museums</option>
            <option value="Pubs">Pubs</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col text-center">
          <button className="btn btn-primary" onClick={handleSubmit} disabled={!tour.city || isLoading}>
            Generate Walking Tour
          </button>
        </div>
      </div>
      {isLoading ? (
        // Conditional rendering for loading animation
        <div className="row text-center">
          <div className="col">
            <p>Loading...</p>

            <div style={{ margin: '16px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={loadingAnimation} alt="Loading..." width="250" height="250" />
            </div>
          </div>
        </div>
      ) : (

        <div className="row">
          <div className="col">
            {/* Display the city photo */}
            {cityPhoto && (
              <img src={cityPhoto} alt={`${tour.city}`} style={{ width: '30%', display: 'block', margin: '0 auto' }} />
            )}
            <textarea className="form-control" style={{ width: '20%' }} rows="10" value={tourContent} readOnly />
          </div>

        {/* Include the Map component here */}
          <Map />
        </div>
      )}

      {/* "Start Tour" button */}
      <div className="row">
        <div className="col text-center">
          <Link to="/tourlive">
            <button className="btn btn-success">Start Tour</button>
          </Link>
        </div>
      </div>

    </div>
  );
}
