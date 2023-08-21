// import { SideNav, SideNavItem } from '@leafygreen-ui/side-nav';
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";


//menu is static atm so using plain js
//helper funcs
function toggleMenu() {
    document.getElementById('isToggle').classList.toggle('open');
    var isOpen = document.getElementById('navigation')
    if (isOpen.style.display === "block") {
        isOpen.style.display = "none";
    } else {
        isOpen.style.display = "block";
    }
};
/*********************/
/*    Menu Active    */
/*********************/
function getClosest(elem, selector) {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    // Get the closest matching element
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
    }
    return null;

};

function activateMenu() {
    var menuItems = document.getElementsByClassName("sub-menu-item");
    if (menuItems) {

        var matchingMenuItem = null;
        for (var idx = 0; idx < menuItems.length; idx++) {
            if (menuItems[idx].href === window.location.href) {
                matchingMenuItem = menuItems[idx];
            }
        }

        if (matchingMenuItem) {
            matchingMenuItem.classList.add('active');
         
         
            var immediateParent = getClosest(matchingMenuItem, 'li');
      
            if (immediateParent) {
                immediateParent.classList.add('active');
            }
            
            var parent = getClosest(immediateParent, '.child-menu-item');
            if(parent){
                parent.classList.add('active');
            }

            var parent = getClosest(parent || immediateParent , '.parent-menu-item');
        
            if (parent) {
                parent.classList.add('active');

                var parentMenuitem = parent.querySelector('.menu-item');
                if (parentMenuitem) {
                    parentMenuitem.classList.add('active');
                }

                var parentOfParent = getClosest(parent, '.parent-parent-menu-item');
                if (parentOfParent) {
                    parentOfParent.classList.add('active');
                }
            } else {
                var parentOfParent = getClosest(matchingMenuItem, '.parent-parent-menu-item');
                if (parentOfParent) {
                    parentOfParent.classList.add('active');
                }
            }
        }
    }
}






export default function Navigation ({ className }) {
  const location = useLocation();

  let [songName, setSongName] = useState("");
  let searchFormRef = useRef(null);



  //useeffect hook to run once
  useEffect(() => {
    activateMenu();        
    if (document.getElementById("navigation")) {
        var elements = document.getElementById("navigation").getElementsByTagName("a");
        for (var i = 0, len = elements.length; i < len; i++) {
            elements[i].onclick = function (elem) {
                if (elem.target.getAttribute("href") === "#") {
                    var submenu = elem.target.nextElementSibling.nextElementSibling;
                    submenu.classList.toggle('open');
                }
            }
        }
    }
  }, []);
 
  return (
    <>
     {/*<SideNav aria-label="Navigation Bar" className={className}>
        <SideNavItem aria-label="Home" as={Link} active={location.pathname === "/"} to="/">Home</SideNavItem>
        <SideNavItem aria-label="Archive" as={Link} active={location.pathname === "/archive"} to="/archive">Archive</SideNavItem>

        <SideNavItem aria-label="New Post" as={Link} active={location.pathname === "/create"} to="/create">New Post</SideNavItem>
      </SideNav>*/}
      
          <nav id="topnav" className="defaultscroll is-sticky">
              <div className="container relative">
                  {/*Logo container*/}
                  <Link className="logo" to="/">
                      <span className="h1"> <img className="w-auto h-8 inline"  src="logo.svg" alt="Clef symbol logo"/> MusicSheets</span>
                  </Link>
                  {/*End Logo container*/}
                  <div className="menu-extras">
                      <div className="menu-item">
                          {/*Mobile menu toggle*/}
                          <a className="navbar-toggle" id="isToggle" onClick={toggleMenu}>
                              <div className="lines">
                                  <span></span>
                                  <span></span>
                                  <span></span>
                              </div>
                          </a>
                          {/*End mobile menu toggle*/}
                      </div>
                  </div>

                  {/*Login button Start*/}
                  <ul className="buy-button list-none mb-0">
                      <li className="inline-block mb-0">
                          <div className="form-icon relative">
                              <Link to={`/search?songName=${songName}`}
                                type="submit" 
                                ref={searchFormRef} 
                                className=" absolute top-1/2 -translate-y-1/2 start-3"
                              >
                                <i className="uil uil-search text-lg text-rose-600"></i>
                              </Link>
                              
                              <input 
                                type="text"
                                className="form-input sm:w-44 w-28 ps-10 py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-3xl outline-none border border-gray-200 focus:border-rose-600 dark:border-gray-800 dark:focus:border-rose-600 focus:ring-0 bg-white"
                                name="searchTop"
                                id="searchTop"
                                placeholder="Search sheet" 
                                onChange={(e) => {setSongName(e.target.value)}}
                                onKeyUp={(e) => {if (e.key === 'Enter') {searchFormRef.current.click()} }}
                              />
                          </div>                         
                      </li>
                      
              
                      <li className="inline ps-1 mb-0">
                          <Link href="#" to="/create" 
                          className="px-4 h-9 w-auto inline-flex items-center justify-center tracking-wide align-middle transition duration-500 ease-in-out text-base text-center rounded-full bg-rose-600 hover:bg-rose-700 border border-rose-600 hover:border-rose-700 text-white"
                          >
                            Contribute <i className="uil uil-edit text-lg ml-2"></i>
                          </Link>
                      </li>
                  </ul>
                  {/*Login button End*/}

                  <div id="navigation" className="z-1">
                      {/*Navigation Menu*/}
                      <ul className="navigation-menu justify-end">
                          <li>
                            <Link className="sub-menu-item" aria-label="Home" to="/">
                              Home
                            </Link>
                          </li>
                  
                          <li className="has-submenu parent-parent-menu-item">
                              <Link href="#" aria-label="Archive" to="/archive">Ragas</Link><span className="menu-arrow"></span>

                              <ul className="submenu megamenu">
                                  <li>
                                      <ul>
                                          <li><a href="search?scaleName=abhogi" className="sub-menu-item">Abhogi</a></li>
                                          <li><a href="search?scaleName=adana" className="sub-menu-item">Adana (raga) </a></li>
                                          <li><a href="search?scaleName=amritvarshini" className="sub-menu-item">Amritvarshini (raga) </a></li>
                                          <li><a href="search?scaleName=asa" className="sub-menu-item">Asa (raga)</a></li>
                                          <li><a href="search?scaleName=asavari" className="sub-menu-item">Asavari </a></li>
                                          <li><a href="search?scaleName=bageshri" className="sub-menu-item">Bageshri</a></li>
                                          <li><a href="search?scaleName=bahar" className="sub-menu-item">Bahar (raga)</a></li>
                                          <li><a href="search?scaleName=bairagi" className="sub-menu-item">Bairagi (raga)</a></li>
                                          <li><a href="search?scaleName=bairari" className="sub-menu-item">Bairari </a></li>
                                          <li><a href="search?scaleName=barwa" className="sub-menu-item">Barwa (raga) </a></li>
                                          <li><a href="search?scaleName=basant" className="sub-menu-item">Basant (raga)</a></li>
                                          <li><a href="search?scaleName=ahir-bhairav" className="sub-menu-item">Ahir Bhairav </a></li>
                                          <li><a href="search?scaleName=bhairav" className="sub-menu-item">Bhairav (raga) </a></li>
                                          <li><a href="search?scaleName=sindhu-bhairavi" className="sub-menu-item">Sindhu Bhairavi (raga) </a></li>
                                          <li><a href="search?scaleName=bhairavi" className="sub-menu-item">Bhairavi (Hindustani)</a></li>
                                      </ul>
                                  </li>

                                  <li>
                                      <ul>
                                          <li><a href="search?scaleName=Bhatiyar" className="sub-menu-item">Bhatiyar</a></li>
                                          <li><a href="search?scaleName=Bhimpalasi" className="sub-menu-item">Bhimpalasi</a></li>
                                          <li><a href="search?scaleName=Bhimsen" className="sub-menu-item">Bhimsen (raga)</a></li>
                                          <li><a href="search?scaleName=Bhinna%20Shadja" className="sub-menu-item">Bhinna Shadja</a></li>
                                          <li><a href="search?scaleName=Bhoopali" className="sub-menu-item">Bhoopali </a></li>
                                          <li><a href="search?scaleName=Bhoopeshwari" className="sub-menu-item">Bhoopeshwari</a></li>
                                          <li><a href="search?scaleName=Bibhas" className="sub-menu-item">Bibhas</a></li>
                                          <li><a href="search?scaleName=Bihag" className="sub-menu-item">Bihag</a></li>
                                          <li><a href="search?scaleName=Hem%20Bihag" className="sub-menu-item">Hem Bihag</a></li>
                                          <li><a href="search?scaleName=Bihagara" className="sub-menu-item">Bihagara</a></li>
                                          <li><a href="search?scaleName=Bilaval" className="sub-menu-item">Bilaval</a></li>
                                          <li><a href="search?scaleName=Alhaiya%20Bilaval" className="sub-menu-item">Alhaiya Bilaval</a></li>
                                          <li><a href="search?scaleName=Brindavani%20Sarang" className="sub-menu-item">Brindavani Sarang</a></li>
                                          <li><a href="search?scaleName=Chandrakauns" className="sub-menu-item">Chandrakauns</a></li>
                                          <li><a href="search?scaleName=Chhayanat" className="sub-menu-item">Chhayanat (raga)</a></li>
                                      </ul>
                                  </li>  

                                  <li>
                                      <ul>
                                          <li><a href="search?scaleName=Darbar" className="sub-menu-item">Darbar (raga)</a></li>
                                          <li><a href="search?scaleName=Desh" className="sub-menu-item">Desh (raga)</a></li>
                                          <li><a href="search?scaleName=Desi" className="sub-menu-item">Desi (raga)</a></li>
                                          <li><a href="search?scaleName=Dhanashree" className="sub-menu-item">Dhanashree</a></li>
                                          <li><a href="search?scaleName=Dhani" className="sub-menu-item">Dhani (raga) </a></li>
                                          <li><a href="search?scaleName=Puriya%20Dhanashree" className="sub-menu-item">Puriya Dhanashree</a></li>
                                          <li><a href="search?scaleName=Durga" className="sub-menu-item">Durga (raga)</a></li>
                                          <li><a href="search?scaleName=Gond" className="sub-menu-item">Gond (raga)</a></li>
                                          <li><a href="search?scaleName=Gaud%20Malhar" className="sub-menu-item">Gaud Malhar </a></li>
                                          <li><a href="search?scaleName=Gaud%20Sarang" className="sub-menu-item">Gaud Sarang</a></li>
                                          <li><a href="search?scaleName=Gauri" className="sub-menu-item">Gauri (raga)</a></li>
                                          <li><a href="search?scaleName=Gorakh%20Kalyan" className="sub-menu-item">Gorakh Kalyan</a></li>
                                          <li><a href="search?scaleName=Gujjari" className="sub-menu-item">Gujjari</a></li>
                                          <li><a href="search?scaleName=Gunakri" className="sub-menu-item">Gunakri</a></li>
                                          <li><a href="search?scaleName=Gurjari" className="sub-menu-item">Gurjari (raga)</a></li>
                                      </ul>
                                  </li>

                                  <li>
                                      <ul>
                                          <li><a href="search?scaleName=Hameer" className="sub-menu-item">Hameer</a></li>
                                          <li><a href="search?scaleName=Hindol" className="sub-menu-item">Hindol</a></li>
                                          <li><a href="search?scaleName=Jaijaivanti" className="sub-menu-item">Jaijaivanti</a></li>
                                          <li><a href="search?scaleName=Jaitsri" className="sub-menu-item">Jaitsri</a></li>
                                          <li><a href="search?scaleName=Jaunpuri" className="sub-menu-item">Jaunpuri (raga)</a></li>
                                          <li><a href="search?scaleName=Jhinjhoti" className="sub-menu-item">Jhinjhoti</a></li>
                                          <li><a href="search?scaleName=Jog" className="sub-menu-item">Jog (raga)</a></li>
                                          <li><a href="search?scaleName=Jogiya" className="sub-menu-item">Jogiya (raga)</a></li>
                                          <li><a href="search?scaleName=Chhayanat" className="sub-menu-item">XXXX </a></li>
                                          <li><a href="search?scaleName=Chhayanat" className="sub-menu-item">XXX (raga) </a></li>
                                          <li><a href="search?scaleName=Chhayanat" className="sub-menu-item">XXX (raga)</a></li>
                                          <li><a href="search?scaleName=Chhayanat" className="sub-menu-item">XXX Bhairav </a></li>
                                      </ul>
                                  </li>

                                  <li>
                                      <ul>
                                          <li><a href="search?scaleName=Chhayanat" className="sub-menu-item">XXX</a></li>
                                          <li><a href="search?scaleName=Chhayanat" className="sub-menu-item">XXX (raga) </a></li>
                                          <li><a href="search?scaleName=Chhayanat" className="sub-menu-item">XXXX (raga) </a></li>
                                          <li><a href="search?scaleName=Chhayanat" className="sub-menu-item">XXXX (raga)</a></li>
                                          <li><a href="search?scaleName=Chhayanat" className="sub-menu-item">XXXX </a></li>
                                          <li><a href="#" className="sub-menu-item">Bageshri</a></li>
                                          <li><a href="search?scaleName=Chhayanat" className="sub-menu-item">XXX (raga)</a></li>
                                          <li><a href="search?scaleName=Chhayanat" className="sub-menu-item">BairXXagi (raga)</a></li>
                                          <li><a href="search?scaleName=Chhayanat" className="sub-menu-item">Bairari </a></li>
                                          <li><a href="search?scaleName=Chhayanat" className="sub-menu-item">Barwa (raga) </a></li>
                                          <li><a href="search?scaleName=Chhayanat" className="sub-menu-item">Basant (raga)</a></li>
                                          <li><a href="search?scaleName=Chhayanat" className="sub-menu-item">Ahir Bhairav </a></li>
                                      </ul>
                                  </li>


                              </ul>
                          </li>

                                            

                          <li className="has-submenu parent-menu-item">
                              <a href="#">Genres</a><span className="menu-arrow"></span>
                              <ul className="submenu">
                                  <li><a href="/search?genre=blues" className="sub-menu-item">Blues</a></li>
                                  <li><a href="/search?genre=Western%20classical" className="sub-menu-item">Classical</a></li>
                                  <li><a href="search?genre=country" className="sub-menu-item">Country</a></li>
                                  <li><a href="search?genre=disco" className="sub-menu-item">Disco</a></li>
                                  <li><a href="search?genre=electronic" className="sub-menu-item">Electronic</a></li>
                                  <li><a href="search?genre=folk" className="sub-menu-item">Folk</a></li>
                                  <li><a href="search?genre=hip-Hop" className="sub-menu-item">Hip hop</a></li>
                                  <li><a href="search?genre=Indian" className="sub-menu-item">Indian</a></li>
                                  <li><a href="search?genre=jazz" className="sub-menu-item">Jazz</a></li>
                                  <li><a href="search?genre=metal" className="sub-menu-item">Metal</a></li>
                                  <li><a href="search?genre=pop" className="sub-menu-item">Pop</a></li>
                                  <li><a href="search?genre=rap" className="sub-menu-item">Rap</a></li>
                                  <li><a href="search?genre=r&b-funk-soul" className="sub-menu-item">R&b, Funk & Soul</a></li>
                                  <li><a href="search?genre=religious-music" className="sub-menu-item">Religious Music</a></li>
                                  <li><a href="search?genre=rock" className="sub-menu-item">Rock</a></li>
                              </ul>
                          </li>                  
                         
                      </ul>
                      {/*end navigation menu*/}
                  </div>
                  {/*end navigation*/}
              </div>
              {/*end container*/}
          </nav>
    </>
  );
}