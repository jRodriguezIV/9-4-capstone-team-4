// import { Link } from "react-router-dom";
import React, { useState} from 'react'; //useEffect, useNavigate
import "../EndTour/EndTour.css"

function EndTour() {
  //const navigate = useNavigate();
  const [userMessage, setUserMessage] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    issue: "General Inquiry",
  });

  const handleTextChange = (event) => {
    setUserMessage({ ...userMessage, [event.target.id]: event.target.value });
  };

  return (
    <div className="message-container">
      <label className="form-label" htmlFor="message">
        <div className="improve-container" style={{ fontSize: '24px' }}>
          Help us Improve!
        </div>
        <br />
        Customer Feedback:
      </label>
      <br />
      <textarea
        className="form-control"
        id="message"
        rows={5}
        style={{ width: '50%', height: '200px' }}
        onChange={handleTextChange}
        value={userMessage.message}
        placeholder="Write your message here"
        required
      />
    </div>
  )
}

export default EndTour;
