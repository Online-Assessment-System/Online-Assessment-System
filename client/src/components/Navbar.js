import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {

    const [click, setClick] = useState(false);

    const [logedin, setLogedin] = useState(true);

    const [ user, setUser ] = useState({});

    const [mobnav,setMobnav] = useState(false);

    const [dropdown, setDropdown] = useState(false);

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
          setDropdown(false);
        } else {
          setDropdown(true);
        }
      };
    
    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
          setDropdown(false);
        } else {
          setDropdown(false);
        }
      };

    const handledropdown = () => setDropdown(false);
    
    const handleClick = () => setClick(!click);

    const closeMobileMenu = () =>
    {
        setClick(false)
        setDropdown(false)
    };

    const notify = () => {
        toast.error('કૃપા કરીને પહેલા લોગીન કરો!!!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:"colored",
            });
    };

  return (
   <>
   <nav className='mynavbar'>
       <div className='mynavbar-container'>
           <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
           &nbsp;Online Assessment System&nbsp;<i class="fa fa-solid fa-podcast"></i>
           </Link>
           <div className='menu-icon' onClick={handleClick}>
               <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
           </div>
           <ul className={click ? 'mynav-menu active' : 'mynav-menu'}>
               <li className='mynav-item'>
                   <Link to="/" className='mynav-links' onClick={closeMobileMenu}>
                   Home&nbsp;<i class="fa fa-home" aria-hidden="true"></i>
                   </Link>
               </li>
               <li className='mynav-item'>
                   <Link to={logedin ? "/quiz" : "/"} className='mynav-links' onClick={logedin ? closeMobileMenu :  notify}>
                   Quizzes&nbsp;<i class="fa fa-question" aria-hidden="true"></i>
                   </Link>
                   <ToastContainer/>
               </li>
               <li className='mynav-item'>
                   <Link to={logedin ? "/leaderboard" : "/"} className='mynav-links' onClick={logedin ? closeMobileMenu :  notify}>
                   Leaderboard&nbsp;<i class="fa fa-star" aria-hidden="true"></i>
                   </Link>
                   <ToastContainer/>
               </li>
               {/* <li className='mynav-item'>
              {logedin && mobnav && <Link to="/" className='mynav-links' onClick={handlesignoutNav}><i class="fa-solid fa-user"></i>&nbsp;{user.fullname}&nbsp;<i class="fa-solid fa-arrow-right-from-bracket"></i></Link>}
               </li> */}
           </ul>
           {/* <div className='mobile-google'>
                    <div id="signInDiv"> </div>
            </div>
            {logedin && !mobnav &&  */}
            <>
            <div className='mynavbar-container' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Link to="#" className='mynav-links' onClick={closeMobileMenu}>{user.fullname}&nbsp;{dropdown?<i class="fa-solid fa-caret-up"></i>:<i class="fa-solid fa-caret-down"></i>}</Link>
            {dropdown && 
             <>
             <ul className='dropdown-menu' onClick={handledropdown}>
                   <li>
                     <Link
                       className='dropdown-link'
                       to='/profile'>
                       <i class="fa-solid fa-user"></i>&nbsp;Profile
                     </Link>
                   </li>
             </ul>
           </>
            }
            </div> 
            </>
            
       </div>
   </nav>
   </>
  )
}

export default Navbar