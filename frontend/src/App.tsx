// App.tsx or any other file
import React, { useState, useEffect } from "react";
import TaskClassifier from "./components/TaskClassifier";
import Addbutton from "./components/addbutton";
import "./webpage.css";
import { ClassificationResult } from "./types/types";
import Task from "./components/Task";
/*
Goals
---------------------------------------------------------------------------------------------------------
- Want to try to check if we can recieve the list of tasks from the get request (checked)
- We will create a new component using Accordion so that we can inject the data from the request into it
- Create new type that has a check if task is finished
*/
function App() {
  const [result, setResult] = useState<ClassificationResult[]>([]);

  const getTasks = async () => {
    const response = await fetch("http://localhost:8000/history", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    setResult(data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="body">
      <div>
        <Addbutton onTaskAdded={getTasks} />
        {result.map((res) => (
          <Task data={res} key={res.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
