import React from "react";
import { useStateValue } from "./StateProvider";
import "./DisplayCover.css";


function DisplayCover({ spotify }) {
    const [{ tracks, features }, dispatch] = useStateValue();
  
    return (
        // <img src="https://media.istockphoto.com/photos/surreal-dream-cloud-moon-art-3d-rendering-picture-id1320900167?s=612x612"alt="test-image"/>
        <div id="coverContainer">
          <svg viewbox="0 0 200 200">
            <circle id="acousticRepresentation" cx="50" cy="50" r="50" />
            <polygon id="danceabilityRepresentation" points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180"/>
          </svg>
        </div>
    );
  }

export default DisplayCover;
