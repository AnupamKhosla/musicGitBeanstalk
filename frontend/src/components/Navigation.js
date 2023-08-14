// import { SideNav, SideNavItem } from '@leafygreen-ui/side-nav';
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

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
                      <span className="h1">MusicSheets</span>
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
                              <i className="uil uil-search text-lg absolute top-1/2 -translate-y-1/2 start-3"></i>
                              <input type="text" className="form-input sm:w-44 w-28 ps-10 py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-3xl outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0 bg-white" name="s" id="searchItem" placeholder="Search..." />
                          </div>
                      </li>
                      
              
                      <li className="inline ps-1 mb-0">
                          <Link href="#" to="/create" 
                          className="px-4 h-9 w-auto inline-flex items-center justify-center tracking-wide align-middle transition duration-500 ease-in-out text-base text-center rounded-full bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 hover:border-indigo-700 text-white"
                          >
                            Contribute +
                          </Link>
                      </li>
                  </ul>
                  {/*Login button End*/}

                  <div id="navigation">
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
                                          <li><a href="ragas/abhogi" className="sub-menu-item">Abhogi <span className="bg-emerald-600 inline-block text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ms-1">Animation</span></a></li>
                                          <li><a href="ragas/adana" className="sub-menu-item">Adana (raga) </a></li>
                                          <li><a href="ragas/amritvarshini" className="sub-menu-item">Amritvarshini (raga) </a></li>
                                          <li><a href="ragas/asa" className="sub-menu-item">Asa (raga)</a></li>
                                          <li><a href="ragas/asavari" className="sub-menu-item">Asavari </a></li>
                                          <li><a href="ragas/bageshri" className="sub-menu-item">Bageshri <span className="bg-red-600 inline-block text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ms-1">Comingsoon</span></a></li>
                                          <li><a href="ragas/bahar" className="sub-menu-item">Bahar (raga)</a></li>
                                          <li><a href="ragas/bairagi" className="sub-menu-item">Bairagi (raga)</a></li>
                                          <li><a href="ragas/bairari" className="sub-menu-item">Bairari </a></li>
                                          <li><a href="ragas/barwa" className="sub-menu-item">Barwa (raga) </a></li>
                                          <li><a href="ragas/basant" className="sub-menu-item">Basant (raga)</a></li>
                                          <li><a href="ragas/ahir-bhairav" className="sub-menu-item">Ahir Bhairav </a></li>
                                          <li><a href="ragas/bhairav" className="sub-menu-item">Bhairav (raga) </a></li>
                                          <li><a href="ragas/sindhu-bhairavi" className="sub-menu-item">Sindhu Bhairavi (raga) </a></li>
                                          <li><a href="ragas/bhairavi" className="sub-menu-item">Bhairavi (Hindustani)</a></li>
                                      </ul>
                                  </li>

                                  <li>
                                      <ul>
                                          <li><a href="ragas/abhogi" className="sub-menu-item">Abhogi <span className="bg-emerald-600 inline-block text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ms-1">Animation</span></a></li>
                                          <li><a href="ragas/adana" className="sub-menu-item">Adana (raga) </a></li>
                                          <li><a href="ragas/amritvarshini" className="sub-menu-item">Amritvarshini (raga) </a></li>
                                          <li><a href="ragas/asa" className="sub-menu-item">Asa (raga)</a></li>
                                          <li><a href="ragas/asavari" className="sub-menu-item">Asavari </a></li>
                                          <li><a href="ragas/bageshri" className="sub-menu-item">Bageshri <span className="bg-red-600 inline-block text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ms-1">Comingsoon</span></a></li>
                                          <li><a href="ragas/bahar" className="sub-menu-item">Bahar (raga)</a></li>
                                          <li><a href="ragas/bairagi" className="sub-menu-item">Bairagi (raga)</a></li>
                                          <li><a href="ragas/bairari" className="sub-menu-item">Bairari </a></li>
                                          <li><a href="ragas/barwa" className="sub-menu-item">Barwa (raga) </a></li>
                                          <li><a href="ragas/basant" className="sub-menu-item">Basant (raga)</a></li>
                                          <li><a href="ragas/ahir-bhairav" className="sub-menu-item">Ahir Bhairav </a></li>
                                          <li><a href="ragas/bhairav" className="sub-menu-item">Bhairav (raga) </a></li>
                                          <li><a href="ragas/sindhu-bhairavi" className="sub-menu-item">Sindhu Bhairavi (raga) </a></li>
                                          <li><a href="ragas/bhairavi" className="sub-menu-item">Bhairavi (Hindustani)</a></li>
                                      </ul>
                                  </li>  

                                  <li>
                                      <ul>
                                          <li><a href="index-saas.html" className="sub-menu-item">Abhogi <span className="bg-emerald-600 inline-block text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ms-1">Animation</span></a></li>
                                          <li><a href="index-classNameic-saas.html" className="sub-menu-item">Adana (raga) </a></li>
                                          <li><a href="index-modern-saas.html" className="sub-menu-item">Amritvarshini (raga) </a></li>
                                          <li><a href="index-apps.html" className="sub-menu-item">Asa (raga)</a></li>
                                          <li><a href="index-classNameic-app.html" className="sub-menu-item">Asavari </a></li>
                                          <li><a href="#" className="sub-menu-item">Bageshri <span className="bg-red-600 inline-block text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ms-1">Comingsoon</span></a></li>
                                          <li><a href="index-smartwatch.html" className="sub-menu-item">Bahar (raga)</a></li>
                                          <li><a href="index-marketing.html" className="sub-menu-item">Bairagi (raga)</a></li>
                                          <li><a href="index-seo.html" className="sub-menu-item">Bairari </a></li>
                                          <li><a href="index-software.html" className="sub-menu-item">Barwa (raga) </a></li>
                                          <li><a href="index-payment.html" className="sub-menu-item">Basant (raga)</a></li>
                                          <li><a href="index-charity.html" className="sub-menu-item">Ahir Bhairav </a></li>
                                      </ul>
                                  </li>

                                  <li>
                                      <ul>
                                          <li><a href="index-saas.html" className="sub-menu-item">Abhogi <span className="bg-emerald-600 inline-block text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ms-1">Animation</span></a></li>
                                          <li><a href="index-classNameic-saas.html" className="sub-menu-item">Adana (raga) </a></li>
                                          <li><a href="index-modern-saas.html" className="sub-menu-item">Amritvarshini (raga) </a></li>
                                          <li><a href="index-apps.html" className="sub-menu-item">Asa (raga)</a></li>
                                          <li><a href="index-classNameic-app.html" className="sub-menu-item">Asavari </a></li>
                                          <li><a href="#" className="sub-menu-item">Bageshri <span className="bg-red-600 inline-block text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ms-1">Comingsoon</span></a></li>
                                          <li><a href="index-smartwatch.html" className="sub-menu-item">Bahar (raga)</a></li>
                                          <li><a href="index-marketing.html" className="sub-menu-item">Bairagi (raga)</a></li>
                                          <li><a href="index-seo.html" className="sub-menu-item">Bairari </a></li>
                                          <li><a href="index-software.html" className="sub-menu-item">Barwa (raga) </a></li>
                                          <li><a href="index-payment.html" className="sub-menu-item">Basant (raga)</a></li>
                                          <li><a href="index-charity.html" className="sub-menu-item">Ahir Bhairav </a></li>
                                      </ul>
                                  </li>

                                  <li>
                                      <ul>
                                          <li><a href="index-saas.html" className="sub-menu-item">Abhogi <span className="bg-emerald-600 inline-block text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ms-1">Animation</span></a></li>
                                          <li><a href="index-classNameic-saas.html" className="sub-menu-item">Adana (raga) </a></li>
                                          <li><a href="index-modern-saas.html" className="sub-menu-item">Amritvarshini (raga) </a></li>
                                          <li><a href="index-apps.html" className="sub-menu-item">Asa (raga)</a></li>
                                          <li><a href="index-classNameic-app.html" className="sub-menu-item">Asavari </a></li>
                                          <li><a href="#" className="sub-menu-item">Bageshri <span className="bg-red-600 inline-block text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ms-1">Comingsoon</span></a></li>
                                          <li><a href="index-smartwatch.html" className="sub-menu-item">Bahar (raga)</a></li>
                                          <li><a href="index-marketing.html" className="sub-menu-item">Bairagi (raga)</a></li>
                                          <li><a href="index-seo.html" className="sub-menu-item">Bairari </a></li>
                                          <li><a href="index-software.html" className="sub-menu-item">Barwa (raga) </a></li>
                                          <li><a href="index-payment.html" className="sub-menu-item">Basant (raga)</a></li>
                                          <li><a href="index-charity.html" className="sub-menu-item">Ahir Bhairav </a></li>
                                      </ul>
                                  </li>


                              </ul>
                          </li>

                                            

                          <li className="has-submenu parent-menu-item">
                              <a href="#">Genres</a><span className="menu-arrow"></span>
                              <ul className="submenu">
                                  <li><a href="/genre/blues" className="sub-menu-item">Blues</a></li>
                                  <li><a href="/genres/classical" className="sub-menu-item">Classical</a></li>
                                  <li><a href="genres/country" className="sub-menu-item">Country</a></li>
                                  <li><a href="genres/disco" className="sub-menu-item">Disco</a></li>
                                  <li><a href="genres/electronic" className="sub-menu-item">Electronic</a></li>
                                  <li><a href="genres/experimental" className="sub-menu-item">experimental</a></li>
                                  <li><a href="genres/folk" className="sub-menu-item">Folk</a></li>
                                  <li><a href="genres/hip-Hop" className="sub-menu-item">Hip hop</a></li>
                                  <li><a href="genres/jazz" className="sub-menu-item">Jazz</a></li>
                                  <li><a href="genres/metal" className="sub-menu-item">Metal</a></li>
                                  <li><a href="genres/pop" className="sub-menu-item">Pop</a></li>
                                  <li><a href="genres/rap" className="sub-menu-item">Rap</a></li>
                                  <li><a href="genres/r&b-funk-soul" className="sub-menu-item">R&b, Funk & Soul</a></li>
                                  <li><a href="genres/religious-music" className="sub-menu-item">Religious Music</a></li>
                                  <li><a href="genres/rock" className="sub-menu-item">Rock</a></li>
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