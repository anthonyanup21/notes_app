import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import toast from "react-hot-toast";
import api from "../lib/axios";

const Note = ({ data, notes, setnotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure to delete the Note")) return;
    try {
      await api.delete(`notes/${id}`);
      setnotes(notes.filter((note) => note._id != id));
      toast.success("note deleted successfully");
    } catch (error) {
      toast.error("Failed to delete note");
      console.log("error while deleting note\n", error);
    }
  };

  return (
    <Link
      to={`/note/${data._id}`}
      className="card bg-primary text-primary-content w-70"
    >
      <div className="card-body">
        <h2 className="card-title">{data.title}</h2>
        <p className="truncate ">{data.content}</p>
        <p className="text-sm">{formatDate(new Date(data.createdAt))}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-xs btn-ghost text-error">
            <MdDelete size={20} onClick={(e) => handleDelete(e, data._id)} />
          </button>
          <button className="btn btn-xs btn-ghost ">
            <FaEdit size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Note;
