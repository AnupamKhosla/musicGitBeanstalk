import React, {useState, useEffect} from "react";
//import { H2 } from "@leafygreen-ui/typography";
import PostSummary from "../components/PostSummary";
import { baseUrl } from "../config";


export default function App() {
  let [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      let results = await fetch(window.location.protocol + `//${baseUrl}/posts/latest`).then(resp => resp.json());
      setPosts(results);
    }

    loadPosts();
  }, []);

  return (
    <React.Fragment>
      <h2 className="text-3xl font-bold underline">Latest Articles XX</h2>
      <div>
        {posts.map(post => {
          return(
            <PostSummary {...post} key={post._id} />
          )
        })}
      </div>
    </React.Fragment>
  )
}