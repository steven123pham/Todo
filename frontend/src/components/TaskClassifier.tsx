import React, { useState } from "react";
import { ClassificationResult } from "../types/types";

interface TaskClassifierProps {
  onTaskAdded: () => void;
}

function TaskClassifier({ onTaskAdded }: TaskClassifierProps) {
  const [task, setTask] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: task }),
    });

    if (response.ok) {
      setTask(""); // optional: reset input
      onTaskAdded(); // ✅ tell parent to refresh data
    }
  };

  return (
    <div>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter your task..."
      />
      <button onClick={handleSubmit}>Classify Task</button>
    </div>
  );
}
export default TaskClassifier;
