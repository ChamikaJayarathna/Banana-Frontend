import React, { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import gsap from 'gsap';
import './Welcome.css';
import Banana01 from '../../assets/banana01.png';
import Banana02 from '../../assets/banana02.png';
import Monkey01 from '../../assets/monkey01.png';
import Monkey02 from '../../assets/monkey04.png';
import Monkey03 from '../../assets/monkey05.png';

const Welcome = () => {

  const imgRed01 = useRef(null);
  const imgRed02 = useRef(null);
  const imgRed03 = useRef(null);
  const imgRed04 = useRef(null);
  const imgRed05 = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      imgRed01.current,
      { y: -100 },
      { y: 0, duration: 2, repeat: -1, yoyo: true }
    );
  
    const tl1 = gsap.timeline({ repeat: -1, yoyo: true });
    tl1.fromTo(
      imgRed02.current,
      { rotation: 10 },
      { rotation: -10, duration: 2 }
    );
  
    const tl2 = gsap.timeline({ repeat: -1, yoyo: true });
    tl2.fromTo(
      imgRed03.current,
      { x: 50, y: -50, rotation: 30 },
      { x: 0, y: 0, rotation: 360, duration: 5 }
    );
  
    gsap.fromTo(
      imgRed04.current,
      { y: -100, scale: 1 },
      { y: 0, scale: 0.8, duration: 5, repeat: -1, yoyo: true }
    );
  
    gsap.fromTo(
      imgRed05.current,
      { y: 100 },
      { y: 0, duration: 3, repeat: -1, yoyo: true }
    );
  }, []);
  

  return (
    <div className="main">
      <section className="home">
        <div className="home-container container">
          <div className="home-data">
            <h3 className="home-subtitle">Unknown Zone</h3>
            <h1 className="home-title">Welcome To the Banana Game</h1>
            <p className="home-description">
              We can't seem to find the page you're looking for,
              you need to come back to earth.
            </p>
            <Link to={'/login'} className="home-button">Login</Link>
            <Link to={'/signup'} className="home-button">SignUp</Link>
          </div>

          <div className="home-images">

            <div className="home-blob-1">
              <img ref={imgRed01} src={Banana01} alt="Banana-image" className='home-img-1'/>
            </div>

            <div className="home-blob-2">
              <img ref={imgRed02} src={Monkey01} alt="Monkey-image" className='home-img-2'/>
            </div>

            <div className="home-blob-3">
              <img ref={imgRed03} src={Monkey02} alt="Monkey-image" className='home-img-3'/>
            </div>

            <div className="home-blob-4">
              <img ref={imgRed04} src={Monkey03} alt="Monkey-image" className='home-img-4'/>
            </div>

            {/* <img ref={imgRed05} src={Banana02} alt="Banana-image" className='home-img-5'/> */}

          </div>

        </div>
      </section>
    </div>
  );
}

export default Welcome;