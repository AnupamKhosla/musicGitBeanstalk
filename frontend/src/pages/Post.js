import React, {useState, useEffect} from "react";
// import ExpandableCard from "@leafygreen-ui/expandable-card";
// import { H2, H3, Body } from "@leafygreen-ui/typography";
// import ConfirmationModal from "@leafygreen-ui/confirmation-modal";
// import TextInput from '@leafygreen-ui/text-input';
// import TextArea from "@leafygreen-ui/text-area";
// import Icon from "@leafygreen-ui/icon";
// import Button from "@leafygreen-ui/Button";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../config";

export default function App() {
  let params = useParams();
  let [post, setPost] = useState({});
  let [showModal, setShowModal] = useState(false);
  let [author, setAuthor] = useState("");
  let [body, setBody] = useState("");
  const navigate = useNavigate();

  const deletePost = async () => {
    await fetch(window.location.protocol + `//${baseUrl}/posts/${params.id}`, {
      method: "DELETE"
    });
    return navigate("/");
  }

  const handleNewComment = async () => {     
    await fetch(window.location.protocol + `//${baseUrl}/posts/comment/${params.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        author, body
      })
    }).then(resp => console.log(resp.json())  );

    let result = await fetch(window.location.protocol + `//${baseUrl}/posts/${params.id}`).then(resp => resp.json());
    //console.log(result);
    setPost(result);

    setAuthor("");
    setBody("");
    setShowModal(false);
  }

  useEffect(() => {
    console.log(window.location.protocol + `//${baseUrl}/posts/${params.id}`);
    const loadPost = async () => {
      let results = await fetch(window.location.protocol + `//${baseUrl}/posts/${params.id}`).then(resp => resp.json());      
      setPost(results);
    }

    loadPost();
  }, [params.id]);

  return (
    <React.Fragment>
      <h2>{post.title}</h2>
      <h3>by {post.author}</h3>
      <p>Published on {(new Date(post.date)).toLocaleDateString()}</p>
      <p dangerouslySetInnerHTML={{__html: post.body}} />
      <button variant="primary" onClick={() => setShowModal(true)}>Add Comment</button>&nbsp;&nbsp;
      <button variant="danger" onClick={deletePost}>Delete Post</button>
      <br/><br/>
      {post && post.comments &&
      <dialog title="Comments">
        {post.comments.map((comment, index) => {
          return (
            <div className="test" key={comment.author+index} data-key={comment.author+index}>
              <div weight="medium">{comment.author} said: </div>
              <div>{comment.body}</div>
            </div>
          )
        })}
      </dialog>
      }

      <dialog
        open={showModal}
        buttonText="Save Comment"
        onConfirm={handleNewComment}
        onCancel={() => setShowModal(false)}
        title=""
      >
        <h2>Add Comment</h2>
        <input
            label="Name"
            description="Enter your name"
            onChange={e => setAuthor(e.target.value)}
            value={author}
          />
          <textarea
            label="Comment"
            onChange={e => setBody(e.target.value)}
            rows="5"
            value={body}
          />
      </dialog>
    </React.Fragment>
  )
}