import React from 'react';

const NavBar = ({showLoginHandler,showRegisterHandler, showLogOut, logoutHandler}) => {
  const firmName = localStorage.getItem('firmName') ;

  return (
    <div className="navSection">
      
        <div className='company'>
            Vendor Dashboard
        </div>
        <div className='firmName'>
            <h4>firmname: {firmName}</h4>
        </div>
        <div className='userAuth'>
            {!showLogOut ? (
              <>
                <span className="loginText" onClick={showLoginHandler}>Login / </span>
                <span className="regText" onClick={showRegisterHandler}>Register</span>
              </>
            ) : (
              <span className="logoutText" onClick={logoutHandler}>Logout</span>
            )}
            
        </div>
    </div>
  );
};

export default NavBar;
