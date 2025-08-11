import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import {Navigate, Link, useNavigate } from "react-router";
import axios from "axios"
import {toast} from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [isloading, setisloading] = useState(false)
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if(!title.trim() || !content.trim()){
        toast.error("All fields are required")
        return

      }
      setisloading(true)
   
      await api.post("/notes",{title, content});
      toast.success("Note created successfully")
      navigate("/")
      setcontent("");
      settitle("");
      
      
    } catch (error) {
      toast.error("Failed to create Note")
      console.log("error while creating a note",error)
    }finally{
      setisloading(false)
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-lg">
        <Link to="/">
          <div className="flex items-center py-10 cursor-pointer gap-2 font-bold">
            <IoMdArrowRoundBack size={23} />
            <span>Back to Note</span>
          </div>
        </Link>

        <div className="flex justify-center ">
          <div className="bg-base-200 p-7 px-10 rounded-3xl">
            <h1 className="font-bold text-2xl p-2 mb-2">Create New Note</h1>
            <p className="text-xs p-2">Title</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Note Title "
                className="input mb-4 w-110 "
                required
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
              <p className="text-xs p-2">Content</p>
              <textarea
                className="textarea h-30 w-110  mb-5"
                placeholder="Write your note here..."
                required
                value={content}
                onChange={(e) => setcontent(e.target.value)}
              ></textarea>
              <div className="flex justify-end items-center">
                <button className="btn btn-success p-3" type="submit" disabled={isloading}>
                 {isloading ? <span className="loading loading-spinner loading-xs"></span> : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
