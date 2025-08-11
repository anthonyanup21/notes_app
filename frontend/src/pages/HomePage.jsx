import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Note from "../components/Note";
import { toast } from "react-hot-toast";
import api from "../lib/axios.js"

const HomePage = () => {
  const [notes, setnotes] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setloading(true);
        const data = await api.get("/notes");
        console.log(data.data);
        setnotes(data.data);
      } catch (error) {
        toast.error("Failed to load Notes");
        console.log("error while fetching notes\n", error);
      } finally {
        setloading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="">
      <Navbar />
      <div className="h-full flex justify-center   gap-10 p-4 mt-6">
        {loading && (
          <div className=" text-center py-50">
            <span className="loading loading-bars loading-xl"></span>
          </div>
        )}

        {notes.length > 0 && (
          <div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {notes.map((data) => (
              <Note key={data._id} data={data} notes={notes} setnotes={setnotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
