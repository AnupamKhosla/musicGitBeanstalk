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
              <a href={"search/song/" + props.sheetName} className="title h5 text-lg font-semibold hover:text-rose-600">
                {props.sheetName} 
              </a>
              <p className="bg-slate-200 -mx-6 px-6 py-2 mt-3">
                <span>Scale: </span>
                props.scale
              </p>
              <p className="text-slate-400 mt-2">
                <i className="uil uil-clock text-rose-600"></i> Uploaded on {(new Date(props.date)).toLocaleDateString()}
              </p>

              <div className="mt-4">
                  <p>
                    <span className="text-rose-600" >Artists:</span> {props.Artist}
                  </p>
                  <p>
                    <span className="text-rose-600">Genre:</span> {props.Genres}
                  </p>
              </div>
          </div>

          <div className="flex items-center p-6 border-t border-gray-100 dark:border-gray-700" >              
              <Link 
                className="text-sm py-1 px-3 inline-block tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-rose-600 hover:bg-rose-700 border-rose-600 hover:border-rose-700 text-white rounded-md me-2 mt-2"
                to={`/post/${props._id}`}>View sheet</Link>   
              <a
                href={"sheets/" + props.sheetName} 
                className="text-sm py-1 px-3 inline-block tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-slate-600 hover:bg-slate-700 border-slate-600 hover:border-slate-700 text-white rounded-md me-2 mt-2">
                Download
              </a>           
          </div>

      </div>
    
  ) 
}