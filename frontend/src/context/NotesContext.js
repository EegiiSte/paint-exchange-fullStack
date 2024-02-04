import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

const NotesContext = createContext();

export const NotesContexProvider = ({ children }) => {
  const { currentUser, userContextLoading } = useUserContext();

  const [notes, setNotes] = useState([]);

  const [notesContextLoading, setNotesContextLoading] = useState(true);

  useEffect(() => {
    if (!userContextLoading) {
      const fetchNotes = async () => {
        try {
          const response = await axios.get(
            // "https://fullstack-backend-pm5t.onrender.com/notes",
            "http://localhost:8080/notes",
            {
              headers: {
                Authorization: `Bearer ${currentUser.token}`,
              },
            }
          );

          const data = await response.data;

          setNotes(data);
          setNotesContextLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      if (currentUser) {
        fetchNotes();
      }
      return () => fetchNotes();
    } else {
      setNotes([]);
    }
  }, [currentUser, userContextLoading]);

  const Set_Notes = (notes) => {
    setNotes(notes);
  };

  const Create_Note = async (note) => {
    setNotes([note, ...notes]);
  };

  const Update_Note = async (updatedNote) => {
    const updatedNotes = notes.map((note) => {
      if (note._id === updatedNote._id) {
        return updatedNote;
      } else {
        return note;
      }
    });
    setNotes(updatedNotes);
  };

  const Delete_Note = async (id) => {
    const updatedNotes = notes.filter((note) => note._id !== id);
    setNotes(updatedNotes);
  };

  return (
    <NotesContext.Provider
      value={{
        Set_Notes,
        Create_Note,
        Update_Note,
        Delete_Note,
        notes,
        notesContextLoading,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => {
  return useContext(NotesContext);
};
