import React from "react";
import HighlightIcon from '@mui/icons-material/Highlight';
import LogoutIcon from '@mui/icons-material/Logout';
import "./Header.css"; // Import the CSS file

function Header({ user, onLogout }) {
  return (
    <header className="header">
      <h1 className="header-title">
        <HighlightIcon />
        Keeper
      </h1>
      {user && (
        <button className="logout-button" onClick={onLogout}><LogoutIcon/></button>
      )}
    </header>
  );
}

export default Header;
