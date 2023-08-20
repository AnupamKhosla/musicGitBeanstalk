import "./libs/@iconscout/unicons/css/line.css";
import "./styles.scss";
// import "./fonts.css";

// import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Create from "./pages/Create";
import Post from "./pages/Post";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/create" element={<Create />} />
            <Route path="/post/:id" element={<Post />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;