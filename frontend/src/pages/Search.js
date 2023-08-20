import React, {useState, useEffect} from "react";
//import { H2 } from "@leafygreen-ui/typography";
import PostSummary from "../components/PostSummary";
import { baseUrl } from "../config";
import SearchForm from "../components/SearchForm";


export default function App() {
  let [posts, setPosts] = useState([]);
  let [searchQuery, setSearchQuery] = useState(window.location.search);

  let searchSubmitCallback = () => {
    //trigger useEffect
    //setPosts([]);
    setSearchQuery(window.location.search);
    console.log("searchSubmitCallback", searchQuery);
  }


  useEffect(() => {
    console.log("update and mount");
  
    const loadPosts = async () => {
      //search get vars
      let query = searchQuery;
      let results = await fetch(window.location.protocol + `//${baseUrl}/posts${query}`).then(resp => resp.json());      
      setPosts(results);
    }
    loadPosts();
  }, [searchQuery]);
  return (
    <React.Fragment>
      <SearchForm searchSubmitCallback={searchSubmitCallback} />
      <div className="container relative my-16">
          <h3 className="text-2xl font-bold text-center">
            {window.location.href.includes("?") ? "Search results" : "All music sheets"}
          </h3>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
            {posts.map(post => {
              return(
                <PostSummary {...post} key={post._id} />
              )
            })}   
          </div>            
      </div>    
    </React.Fragment>
  )
}