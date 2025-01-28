import './App.css';
import GraphViz from './GraphViz';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const CLIENT_ID = "7507663a44624719aab5e14da953ed38"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPE = "user-top-read"

  const [token, setToken] = useState("");
  const [profile, setProfile] = useState({});
  const [tracks, setTracks] = useState({});
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)
}, [])

const logout = () => {
  setToken("")
  window.localStorage.removeItem("token")
}

useEffect(() => {
  if (!token) return
  axios.get("https://api.spotify.com/v1/me", {
      headers: {
          "Authorization": `Bearer ${token}`
      }
  }).then(response => {
      setProfile(response.data)
  }).catch(error => {
      console.error(error)
  })
}, [token])

useEffect(() => {
  if (!token) return

  axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
          "Authorization": `Bearer ${token}`
      },
      params: {
          limit: 10
      }
  }).then(response => {
      setTracks(response.data)
  }
  ).catch(error => {
      console.error(error)
  })
}, [token])

const renderTracks = () => {
  if (!tracks.items) return

  return tracks.items.map((track) => {
      return <GraphViz key={track.id} track={track} genres={genres} setGenres={setGenres}/>
  })
}

return (
<div className="App">
            <header className="App-header">
                <h1>Spotiviz</h1>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}
                  Graph will render below after login
                  <div>
                    {renderTracks()}
                  </div>
            </header>
        </div>
  );
}

export default App;
