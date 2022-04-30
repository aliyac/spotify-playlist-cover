import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "./StateProvider";
import Player from "./Player";
import { getTokenFromResponse } from "./spotify";
import Login from "./Login";

const s = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useStateValue();
  // Run code if token changes
  useEffect(() => {
    const hash = getTokenFromResponse();
    // Clear token from URL
    window.location.hash = "";
    let _token = hash.access_token;
    
    // Push information into data layer
    if (_token) {
      s.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      s.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: s,
      });

      s.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      s.getMyTopTracks().then((tracks) => {
        // Some users don't have enough top tracks
        if (tracks[1]) {
          dispatch({
            type: "SET_TRACKS",
            tracks: tracks,
          });

          s.getAudioFeaturesForTracks(tracks).then((audioFeatures) => {

            dispatch ({
              type:"SET_FEATURES",
              features: audioFeatures,
              danceability: audioFeatures["danceability"],
              key: audioFeatures["key"],
              loudness: audioFeatures["loudness"],
              valence: audioFeatures["valence"],
              tempo: audioFeatures["tempo"],
              mode: audioFeatures["mode"],
              energy: audioFeatures["energy"],
              speechiness: audioFeatures["speechiness"],
              acousticness: audioFeatures["acousticness"],
              instrumentalness: audioFeatures["instrumentalnes"],
              liveness: audioFeatures["liveness"],
            })
            console.log(audioFeatures)
            
          })
        }
      });

      s.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });
    }
  }, [token, dispatch]);

  return (
    // Render login if no token exists
    <div className="app">
      {!token && <Login />}
      {token && <Player spotify={s} />}
    </div>
  );
}

export default App;
