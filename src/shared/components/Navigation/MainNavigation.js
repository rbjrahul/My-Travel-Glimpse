import React, { useState } from "react";
import { Link } from "react-router-dom";
import './MainNavigation.css'
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import BackDrop from "../UIElements/Backdrop";

function MainNavigation(props){
  const[drawerIsOpen,setDrawerOpen]= useState(false);

  function opendrawerHandler(){
    setDrawerOpen(!drawerIsOpen);
  }
  function closeDrawerHandler(){
    setDrawerOpen(false);
  }
  
    return (
      <>
      {drawerIsOpen && <BackDrop onClick={closeDrawerHandler}/>}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
      <nav  className="main-navigation__drawer-nav">
        <NavLinks />
      </nav>
    </SideDrawer>
        <MainHeader>
          <button className="main-navigation__menu-btn" onClick={opendrawerHandler}>
            <span />
            <span />
            <span />
          </button>
          <h1 className="main-navigation__title">
            <Link to="/">YourPlaces</Link>
          </h1>
          <nav className="main-navigation__header-nav">
            <NavLinks />
          </nav>
        </MainHeader>
        </>
      );
}
export default MainNavigation;