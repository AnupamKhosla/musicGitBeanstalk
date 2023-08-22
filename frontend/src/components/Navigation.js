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

//on click anywhere if toggle is open close it
window.onclick = function (event) {
    document.querySelectorAll('#topnav .navigation-menu > li.has-submenu:hover > .submenu').forEach(function (elem) {
      elem.style.display = 'none';
      //remove these styles after 0.2 seconds
      setTimeout(function () {
          elem.removeAttribute('style');
      }, 200);
    });

    //check if event propogated from '#topnav .navigation-menu > li .submenu li a'
    if (event.target.matches('#topnav .navigation-menu > li .submenu li a')) {
        // if (document.getElementById('isToggle').classList.contains('open')) {
        //     document.getElementById('isToggle').classList.remove('open');
        //     document.getElementById('navigation').style.display = "none";
        // }
        toggleMenu();
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
                          {/*disabled the create btn for the time being*/}
                          <Link href="#" to="/create" 
                          className="pointer-events-none cursor-not-allowed px-4 h-9 w-auto inline-flex items-center justify-center tracking-wide align-middle transition duration-500 ease-in-out text-base text-center rounded-full bg-rose-600 hover:bg-rose-700 border border-rose-600 hover:border-rose-700 text-white"
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
                              <a href="#">Ragas</a><span className="menu-arrow"></span>

                              <ul className="submenu megamenu">
                                  <li>
                                      <ul>
                                          <li><Link to="search?scaleName=abhogi" className="sub-menu-item">Abhogi</Link></li>
                                          <li><Link to="search?scaleName=adana" className="sub-menu-item">Adana (raga) </Link></li>
                                          <li><Link to="search?scaleName=amritvarshini" className="sub-menu-item">Amritvarshini (raga) </Link></li>
                                          <li><Link to="search?scaleName=asa" className="sub-menu-item">Asa (raga)</Link></li>
                                          <li><Link to="search?scaleName=asavari" className="sub-menu-item">Asavari </Link></li>
                                          <li><Link to="search?scaleName=bageshri" className="sub-menu-item">Bageshri</Link></li>
                                          <li><Link to="search?scaleName=bahar" className="sub-menu-item">Bahar (raga)</Link></li>
                                          <li><Link to="search?scaleName=bairagi" className="sub-menu-item">Bairagi (raga)</Link></li>
                                          <li><Link to="search?scaleName=bairari" className="sub-menu-item">Bairari </Link></li>
                                          <li><Link to="search?scaleName=barwa" className="sub-menu-item">Barwa (raga) </Link></li>
                                          <li><Link to="search?scaleName=basant" className="sub-menu-item">Basant (raga)</Link></li>
                                          <li><Link to="search?scaleName=ahir-bhairav" className="sub-menu-item">Ahir Bhairav </Link></li>
                                          <li><Link to="search?scaleName=bhairav" className="sub-menu-item">Bhairav (raga) </Link></li>
                                          <li><Link to="search?scaleName=sindhu-bhairavi" className="sub-menu-item">Sindhu Bhairavi (raga) </Link></li>
                                          <li><Link to="search?scaleName=bhairavi" className="sub-menu-item">Bhairavi (Hindustani)</Link></li>
                                      </ul>
                                  </li>

                                  <li>
                                      <ul>
                                          <li><Link to="search?scaleName=Bhatiyar" className="sub-menu-item">Bhatiyar</Link></li>
                                          <li><Link to="search?scaleName=Bhimpalasi" className="sub-menu-item">Bhimpalasi</Link></li>
                                          <li><Link to="search?scaleName=Bhimsen" className="sub-menu-item">Bhimsen (raga)</Link></li>
                                          <li><Link to="search?scaleName=Bhinna%20Shadja" className="sub-menu-item">Bhinna Shadja</Link></li>
                                          <li><Link to="search?scaleName=Bhoopali" className="sub-menu-item">Bhoopali </Link></li>
                                          <li><Link to="search?scaleName=Bhoopeshwari" className="sub-menu-item">Bhoopeshwari</Link></li>
                                          <li><Link to="search?scaleName=Bibhas" className="sub-menu-item">Bibhas</Link></li>
                                          <li><Link to="search?scaleName=Bihag" className="sub-menu-item">Bihag</Link></li>
                                          <li><Link to="search?scaleName=Hem%20Bihag" className="sub-menu-item">Hem Bihag</Link></li>
                                          <li><Link to="search?scaleName=Bihagara" className="sub-menu-item">Bihagara</Link></li>
                                          <li><Link to="search?scaleName=Bilaval" className="sub-menu-item">Bilaval</Link></li>
                                          <li><Link to="search?scaleName=Alhaiya%20Bilaval" className="sub-menu-item">Alhaiya Bilaval</Link></li>
                                          <li><Link to="search?scaleName=Brindavani%20Sarang" className="sub-menu-item">Brindavani Sarang</Link></li>
                                          <li><Link to="search?scaleName=Chandrakauns" className="sub-menu-item">Chandrakauns</Link></li>
                                          <li><Link to="search?scaleName=Chhayanat" className="sub-menu-item">Chhayanat (raga)</Link></li>
                                      </ul>
                                  </li>  

                                  <li>
                                      <ul>
                                          <li><Link to="search?scaleName=Darbar" className="sub-menu-item">Darbar (raga)</Link></li>
                                          <li><Link to="search?scaleName=Desh" className="sub-menu-item">Desh (raga)</Link></li>
                                          <li><Link to="search?scaleName=Desi" className="sub-menu-item">Desi (raga)</Link></li>
                                          <li><Link to="search?scaleName=Dhanashree" className="sub-menu-item">Dhanashree</Link></li>
                                          <li><Link to="search?scaleName=Dhani" className="sub-menu-item">Dhani (raga) </Link></li>
                                          <li><Link to="search?scaleName=Puriya%20Dhanashree" className="sub-menu-item">Puriya Dhanashree</Link></li>
                                          <li><Link to="search?scaleName=Durga" className="sub-menu-item">Durga (raga)</Link></li>
                                          <li><Link to="search?scaleName=Gond" className="sub-menu-item">Gond (raga)</Link></li>
                                          <li><Link to="search?scaleName=Gaud%20Malhar" className="sub-menu-item">Gaud Malhar </Link></li>
                                          <li><Link to="search?scaleName=Gaud%20Sarang" className="sub-menu-item">Gaud Sarang</Link></li>
                                          <li><Link to="search?scaleName=Gauri" className="sub-menu-item">Gauri (raga)</Link></li>
                                          <li><Link to="search?scaleName=Gorakh%20Kalyan" className="sub-menu-item">Gorakh Kalyan</Link></li>
                                          <li><Link to="search?scaleName=Gujjari" className="sub-menu-item">Gujjari</Link></li>
                                          <li><Link to="search?scaleName=Gunakri" className="sub-menu-item">Gunakri</Link></li>
                                          <li><Link to="search?scaleName=Gurjari" className="sub-menu-item">Gurjari (raga)</Link></li>
                                      </ul>
                                  </li>

                                  <li>
                                      <ul>
                                          <li><Link to="search?scaleName=Hameer" className="sub-menu-item">Hameer</Link></li>
                                          <li><Link to="search?scaleName=Hindol" className="sub-menu-item">Hindol</Link></li>
                                          <li><Link to="search?scaleName=Jaijaivanti" className="sub-menu-item">Jaijaivanti</Link></li>
                                          <li><Link to="search?scaleName=Jaitsri" className="sub-menu-item">Jaitsri</Link></li>
                                          <li><Link to="search?scaleName=Jaunpuri" className="sub-menu-item">Jaunpuri (raga)</Link></li>
                                          <li><Link to="search?scaleName=Jhinjhoti" className="sub-menu-item">Jhinjhoti</Link></li>
                                          <li><Link to="search?scaleName=Jog" className="sub-menu-item">Jog (raga)</Link></li>
                                          <li><Link to="search?scaleName=Jogiya" className="sub-menu-item">Jogiya (raga)</Link></li>
                                          <li><Link to="search?scaleName=Kafi" className="sub-menu-item">Kafi (raga)</Link></li>
                                          <li><Link to="search?scaleName=Kalavati" className="sub-menu-item">Kalavati</Link></li>
                                          <li><Link to="search?scaleName=Kanada" className="sub-menu-item">Kanada (family of ragas)</Link></li>
                                          <li><Link to="search?scaleName=Darbari%20Kanada" className="sub-menu-item">Darbari Kanada</Link></li>
                                          <li><Link to="search?scaleName=Kedar" className="sub-menu-item">Kedar (raga)</Link></li>
                                          <li><Link to="search?scaleName=Khamaj" className="sub-menu-item">Khamaj</Link></li>
                                          <li><Link to="search?scaleName=Kirwani" className="sub-menu-item">Kirwani</Link></li>
                                      </ul>
                                  </li>

                                  <li>
                                      <ul>
                                          <li><Link to="search?scaleName=Lalit" className="sub-menu-item">Lalit (raga)</Link></li>
                                          <li><Link to="search?scaleName=Malhar " className="sub-menu-item">Malhar</Link></li>
                                          <li><Link to="search?scaleName=Malkauns" className="sub-menu-item">Malkauns</Link></li>
                                          <li><Link to="search?scaleName=Mangala%20Gujjari" className="sub-menu-item">Mangala Gujjari</Link></li>
                                          <li><Link to="search?scaleName=Multani" className="sub-menu-item">Multani (raga)</Link></li>
                                          <li><Link to="search?scaleName=Nat%20Bhairav" className="sub-menu-item">Nat Bhairav</Link></li>
                                          <li><Link to="search?scaleName=Patdeep" className="sub-menu-item">Patdeep</Link></li>
                                          <li><Link to="search?scaleName=Purvi" className="sub-menu-item">Purvi</Link></li>
                                          <li><Link to="search?scaleName=Ramkali" className="sub-menu-item">Ramkali</Link></li>
                                          <li><Link to="search?scaleName=Shivaranjani" className="sub-menu-item">Shivaranjani</Link></li>
                                          <li><Link to="search?scaleName=Sohni" className="sub-menu-item">Sohni</Link></li>
                                          <li><Link to="search?scaleName=Bilaskhani%20Todi" className="sub-menu-item">Bilaskhani Todi</Link></li>
                                          <li><Link to="search?scaleName=Yaman" className="sub-menu-item">Yaman (raga)</Link></li>
                                          <li><Link to="search?scaleName=Zeelaf" className="sub-menu-item">Zeelaf</Link></li>
                                      </ul>
                                  </li>


                              </ul>
                          </li>

                                            

                          <li className="has-submenu parent-menu-item">
                              <a href="#">Genres</a><span className="menu-arrow"></span>
                              <ul className="submenu">
                                  <li><Link to="/search?genre=blues" className="sub-menu-item">Blues</Link></li>
                                  <li><Link to="/search?genre=Western%20classical" className="sub-menu-item">Classical</Link></li>
                                  <li><Link to="search?genre=country" className="sub-menu-item">Country</Link></li>
                                  <li><Link to="search?genre=disco" className="sub-menu-item">Disco</Link></li>
                                  <li><Link to="search?genre=electronic" className="sub-menu-item">Electronic</Link></li>
                                  <li><Link to="search?genre=folk" className="sub-menu-item">Folk</Link></li>
                                  <li><Link to="search?genre=hip-Hop" className="sub-menu-item">Hip hop</Link></li>
                                  <li><Link to="search?genre=Indian" className="sub-menu-item">Indian</Link></li>
                                  <li><Link to="search?genre=jazz" className="sub-menu-item">Jazz</Link></li>
                                  <li><Link to="search?genre=metal" className="sub-menu-item">Metal</Link></li>
                                  <li><Link to="search?genre=pop" className="sub-menu-item">Pop</Link></li>
                                  <li><Link to="search?genre=rap" className="sub-menu-item">Rap</Link></li>
                                  <li><Link to="search?genre=r&b-funk-soul" className="sub-menu-item">R&b, Funk & Soul</Link></li>
                                  <li><Link to="search?genre=religious-music" className="sub-menu-item">Religious Music</Link></li>
                                  <li><Link to="search?genre=rock" className="sub-menu-item">Rock</Link></li>
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