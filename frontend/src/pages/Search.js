import React, {useState, useEffect} from "react";
//import { H2 } from "@leafygreen-ui/typography";
import PostSummary from "../components/PostSummary";
import { baseUrl } from "../config";
import SearchForm from "../components/SearchForm";
import { useLocation } from "react-router-dom";


export default function SearchResults() {
  const location = useLocation();
  let [posts, setPosts] = useState([]);
  let [searchQuery, setSearchQuery] = useState(window.location.search);

  let searchSubmitCallback = () => {
    //trigger useEffect
    //setPosts([]);
    setSearchQuery(window.location.search); //this will just cause rerender
  }


  useEffect(() => {  
    const loadPosts = async () => {
      //search get vars
      let query = window.location.search; 
      //use live url instead of searchQuery
      //when Navigation search happens searchQuery is not updated
      let results = await fetch(window.location.protocol + `//${baseUrl}/posts${query}`).then(resp => resp.json());      
      setPosts(results);
    }
    loadPosts();
  }, [searchQuery, location.key]);
  return (
    <React.Fragment>
      <SearchForm searchSubmitCallback={searchSubmitCallback} />
      <div className="container relative my-16 min-h-[400px]">
          <h3 className="text-2xl font-bold text-center">
            {window.location.href.includes("?") ? "Search results" : "All music sheets"}
          </h3>
          {posts.length === 0 ? (<span className="block mt-4 text-lg text-semibold text-center">"No results found"</span>) : (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
              {posts.map(post => {
                return(
                  <PostSummary {...post} key={post._id} />
                )
              })}   
            </div> 
          )}          
      </div>    
    </React.Fragment>
  )
}