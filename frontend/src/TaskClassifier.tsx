import React, { useState } from 'react';

type ClassificationResult = {
  category: string;
  points: number;
};

function TaskClassifier() {
  const [task, setTask] = useState('');
  const [result, setResult] = useState<ClassificationResult | null>(null);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // 👈 Prevent default GET submission

  const response = await fetch('http://localhost:8000/classify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description: task }),
  });

  const data = await response.json();
  setResult(data);
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

     {result && (
        <div>
            <p><strong>Category:</strong> {result.category}</p>
            <p><strong>Points:</strong> {result.points}</p>
        </div>
)}

    </div>
  );
}

export default TaskClassifier;
