import Header from "./Header";
import Navigation from "./Navigation";
// import { css } from "@leafygreen-ui/emotion";
import { Outlet } from "react-router-dom";


export default function Layout(props) {
  return(
    <div className="gridStyle">
      <section className="headerStyle">        
        <Navigation className="sideNavStyle" />
      </section>
      

      <section className="mainStyle">
        <Outlet />
      </section>
    </div>
  )
}