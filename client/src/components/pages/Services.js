import React from 'react';
import '../../App.css';
import '../Cards'
import CardItem from '../CardItem';
import Footer from '../Footer';

export default function Services() {
  return(
    <>
    <video src='/videos/dp_video.mp4' autoPlay loop muted />
    <div className='cards'>
      <h1>તમારું ધોરણ પસંદ કરો!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='../images/num_3.jfif'
              text='ધોરણ 3'
              label='3'
              standard="5"
              path='/services/quizpage3'
            />
            <CardItem
              src='../images/num_4.png'
              text='ધોરણ 4'
              label='4'
              standard="5"
              path='/services/quizpage4'
            />
            <CardItem
              src='../images/num_5.png'
              text='ધોરણ 5'
              label='5'
              standard="5"
              path='/services/quizpage5'
            />
          </ul>
        </div>
      </div>
    </div>  
    <Footer />
    </>  
  );
}
