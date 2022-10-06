import React from 'react';
import './Footer.css';
import { Link,Redirect } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Quiz</h2>
            <p>Students can take quiz of available subjects.</p>
          </div>
          <div class='footer-link-items'>
            <h2>Leaderboard</h2>
            <p>Students can compare their results with the other participants around the globe.</p>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Profile</h2>
            <p>Students can check the history of each attempts and also can track their progress through profile.</p>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='#' className='social-logo'>
            Online Assessment System&nbsp;<i class="fa-solid fa-graduation-cap"></i>
            </Link>
          </div>
          <small class='website-rights'>OAS  © 2022</small>
          <div class='social-icons'>
            <a
              class='social-icon-link facebook'
              href='https://www.facebook.com/schoolsLens/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </a>
            <a
              class='social-icon-link instagram'
              href='https://www.instagram.com/schoolslens/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </a>
            <a
              class='social-icon-link youtube'
              href='https://www.youtube.com/channel/UCPt1cruX-cYuL8e5KNdGv7Q'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </a>
            <a
              class='social-icon-link twitter'
              href='https://twitter.com/schoolsLens'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </a>
            <a
              class='social-icon-link twitter'
              href='https://www.linkedin.com/school/schoolslens/?originalSubdomain=in'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;