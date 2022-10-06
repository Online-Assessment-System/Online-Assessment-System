import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import './Profile.css';
import {useState,useEffect} from 'react';
import axios from "axios";
import ReportProfile from './ReportProfile';

function Profile() {

const [button1, setButton1] = useState(true);

const [button2, setButton2] = useState(false);

const [button3, setButton3] = useState(false);

const [ user, setUser ] = useState({});

const [ profile, setProfile ] = useState({});

const [classactive, setClassactive] = useState("#about");

const [History, setHistory] = useState([]);

let h="";

useEffect(()=>{
  function checkuser () {
      axios.post('http://localhost:4000/app/usercheck',"")
      .then(response => 
      {   console.log(response.data)
          if(response.data !== '' && response.data.constructor === Object)
          {
              setUser(response.data)
              console.log("here") 
          }
      } 
  )
  }
  checkuser()
}, []);

useEffect(()=>{
  function checkProfile () {
      axios.post('http://localhost:5000/app/checkprofile',"")
      .then(response => 
      { 
        console.log(response.data[0])
        h=response.data[0].history
        if(h!= '')
        {
          setHistory(JSON.parse(h))
        }
          if(response.data !== '' )
          {
              setProfile(response.data[0])
              console.log("Profile-here") 
          }
      } 
  )
  }
  checkProfile()
}, []);



const handlebutton1 = () => {
  setButton1(true)
  setButton2(false)
  setButton3(false)
  setClassactive("#about");
};
const handlebutton2 = () => {
  setButton1(false)
  setButton2(true)
  setButton3(false)
  setClassactive("#experience");
};
const handlebutton3 = () => {
  setButton1(false)
  setButton2(false)
  setButton3(true)
  setClassactive("#contact");
};
return (
  <>
    <video src='/videos/video-4.mp4' autoPlay loop muted />
    <div className="card-container">
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"/>
     <div className={button1?"card":"card is-active"} data-state={classactive}>
    <div className="card-header">
    <div class="card-cover" style={{backgroundImage:`url(${user.picture})`}}></div>
    <img className="card-avatar" src={user.picture} alt="avatar" />
    <h1 className="card-fullname">{user.fullname}</h1>
    <h2 className="card-jobtitle">{profile.rank}</h2>
  </div>
  <div className="card-main">
    <div className={button1?"card-section is-active":"card-section"} id="about">
      <div className="card-content">
        <div className="card-subtitle">બેજ</div>
        <p className="card-desc">{profile.badge?profile.badge:"કોઈ બેજ મેળવેલ નથી"}
        </p>
      </div>
    </div>
    <div className={button2?"card-section is-active":"card-section"} id="experience">
      <div className="card-content">
        <div className="card-subtitle">ક્વિઝ હિસ્ટોરી</div>
          {profile.history?
          <div className="card-timeline">
           {History.map((item, index) => {
          return(
           <div className="card-item" data-year={item.date}>
           <div className="card-item-title">ધોરણ: {item.std}</div>
           <div className="card-item-desc">મેળવેલ માર્કસ: {item.score}</div>
           </div>
           );
          })}
          </div>
          :
          <h6>કોઈ હિસ્ટોરી ઉપલબ્ધ નથી</h6>
         }
      </div>
    </div>
    <div className={button3?"card-section is-active":"card-section"} id="contact">
      <div className="card-content">
        <div className="card-subtitle">રિપોર્ટ</div>
        <div className="card-contact-wrapper">
        <ReportProfile/>
        </div>
      </div>
    </div>
    <div className="card-buttons">
      <button onClick={handlebutton1} className={button1?"is-active":""}>બેજ</button>
      <button onClick={handlebutton2} className={button2?"is-active":""}>ક્વિઝ હિસ્ટોરી</button>
      <button onClick={handlebutton3} className={button3?"is-active":""}>રિપોર્ટ</button>
    </div>
  </div>
</div>
</div>
<Footer/>
</>
  )
}

export default Profile