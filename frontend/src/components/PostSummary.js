import React from "react";
//import Card from "@leafygreen-ui/card";
//import { css } from "@leafygreen-ui/emotion";
//import { H3 } from "@leafygreen-ui/typography";
//import Badge from "@leafygreen-ui/badge";
import { Link } from "react-router-dom";


export default function PostSummary(props) {
  return (
      <div className="rounded-md shadow dark:shadow-gray-800">
          <div className="p-6">
              <a href="search/song/{props.title}" className="title h5 text-lg font-semibold hover:text-rose-600">
                {props.title} 
              </a>
              <p className="text-slate-400 mt-2">
                <i className="uil uil-clock text-rose-600"></i> Uploaded on {(new Date(props.date)).toLocaleDateString()}
              </p>

              <div className="mt-4">
                  <p>
                    <span className="text-rose-600" >Atist:</span> {props.author}
                  </p>
                  <p>
                    <span className="text-rose-600">Genre:</span> {props.author}
                  </p>
              </div>
          </div>

          <div className="flex items-center p-6 border-t border-gray-100 dark:border-gray-700" >              
              <Link to={`/post/${props._id}`}>Read More...</Link>              
          </div>
      </div>
    
  ) 
}