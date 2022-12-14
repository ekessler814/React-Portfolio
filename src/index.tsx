import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Weather from './components/Weather';
import { TeamShuffle } from './components/TeamShuffle'
import  Calendar from './components/Calendar'
import ConnectFour from './components/ConnectFour';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    <Weather />
    <TeamShuffle />

    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: '50px'

      }}
    >

    <Calendar />
    <div style={{width: '50px'}}></div>
    <ConnectFour />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
