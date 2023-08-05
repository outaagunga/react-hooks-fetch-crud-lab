import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const BASE_URL = "http://localhost:4000";
  const Endpoint = "questions";
  const API_url = `${BASE_URL}/${Endpoint}`;

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await fetch(API_url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch questions from the server.");
        }

        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        console.log("Error:", err.message);
      }
    };

    getQuestions();
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  }

  async function handleDeleteQuestion(id) {
    try {
      await fetch(`${API_url}/${id}`, {
        method: "DELETE",
      });

      setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
    } catch (err) {
      console.log("Error deleting question:", err);
    }
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
        />
      )}
    </main>
  );
}

export default App;
