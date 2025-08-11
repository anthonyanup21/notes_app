import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const NoteDetailPage = () => {
  const { id } = useParams();
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [isUpdating, setisUpdating] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {
      if (!title.trim() || !content.trim()) {
        toast.error("all the fields required");
        return;
      }
      setisUpdating(true);
      await api.put(`/notes/${id}`, { title, content });
      navigate("/");
      toast.success("updated successfully");
    } catch (error) {
      toast.error("Failed to update note");
      console.log("error while updating the note", error);
    } finally {
      setisUpdating(false);
    }
  };

  const handleDelete = async () => {
    setisDeleting(true);

    if (!window.confirm("Are you sure you want to delete note")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
      console.log("error while deleating the note", error);
    } finally {
      setisDeleting(false);
    }
  };

  useEffect(() => {
    const getNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        settitle(res.data.title);
        setcontent(res.data.content);
      } catch (error) {
        toast.error("error while fetching Note");
        console.log("error while getting a note", error);
      }
    };
    getNote();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-lg">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center py-10 cursor-pointer gap-2 font-bold"
          >
            <IoMdArrowRoundBack size={23} />
            <span>Back to Note</span>
          </Link>
          <div>
            <button className="btn btn-error p-3" onClick={handleDelete}>
              {isDeleting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <span className="flex items-center">
                  <MdDelete size={18} />
                  Delete Note
                </span>
              )}
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center ">
            <div className="bg-base-200 p-7 px-10 rounded-3xl">
              <p className="text-xs p-2">Title</p>
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
                <button
                  className="btn btn-success"
                  type="submit"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "Update Note"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteDetailPage;
