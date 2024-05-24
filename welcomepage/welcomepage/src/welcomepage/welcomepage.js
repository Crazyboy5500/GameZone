import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.css';

export default function WelcomePage() {
  const [selectedGame, setSelectedGame] = useState(null);
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox !== event.target) {
        checkbox.checked = false;
      }
    });
    setSelectedGame(event.target.checked ? event.target.value : null);
  };

  const handleButtonClick = () => {
    if (selectedGame === '15_Puzzle') {
      navigate('/puzzle');
    } else {
      navigate('/memory');
    }
  };

  return (
    <div className="App">
      <div className="card">
        <div className="screen">
          <div className="start-screen active" id="start-screen">
            <h1>Hello & Welcome...</h1>
            <div className="container">
              <input required type="text" name="text" className="input" />
              <label className="label">Enter Username</label>
            </div>
            <div className="playImage">
              <div className="menu-card">
                <div className="img-container">
                  <img src="https://th.bing.com/th/id/OIP.I3-Qk6SmKOXwf6FaUqsiBgHaHb?rs=1&pid=ImgDetMain" alt="15 Puzzle" />
                  <div className="details">
                    <button className="game-name">15_Puzzle</button>
                    <label>
                      <input
                        type="checkbox"
                        value="15_Puzzle"
                        className="input"
                        onChange={handleCheckboxChange}
                      />
                      <span className="custom-checkbox"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="menu-card">
                <div className="img-container">
                  <img src="https://th.bing.com/th/id/OIP.I3-Qk6SmKOXwf6FaUqsiBgHaHb?rs=1&pid=ImgDetMain" alt="Memory" />
                  <div className="details">
                    <button className="game-name">Memory</button>
                    <label>
                      <input
                        type="checkbox"
                        value="Memory"
                        className="input"
                        onChange={handleCheckboxChange}
                      />
                      <span className="custom-checkbox"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button onClick={handleButtonClick}>
                <span>Button</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
