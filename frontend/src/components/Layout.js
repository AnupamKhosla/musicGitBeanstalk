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
      <footer className="py-3 bg-slate-200">
        <div className="container text-sm text-center">
          Designed and developed solely by <a className="text-rose-500 hover:text-rose-600 underline" href="https://www.linkedin.com/in/anupamkhosla/">Anupam Khosla</a>. The&nbsp;
          <a
            className="text-rose-500 hover:text-rose-600 underline"
            href="https://github.com/AnupamKhosla/musicGitBeanstalk">deisgn and code</a>
          &nbsp;is licenced under CC BY-SA 4.0.          
        </div>
      </footer>  
    </div>
  )
}