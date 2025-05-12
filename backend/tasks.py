from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import openai
import json
from dotenv import load_dotenv
import os

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key:
    print("⚠️ OPENAI_API_KEY is missing!")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

task_history = []
class Task(BaseModel):
    description: str

@app.post("/classify")
def classify(task: Task):
    prompt = f"""
You are a task classification assistant. Classify the following task into one of these categories: hygiene, chores, fitness, work.
If the task does not fit well, create a new category and assign an appropriate point value.

Point value reference:
"hygiene": 5, "chores": 10, "fitness": 15, "work": 20

Respond strictly in this JSON format:
{{"category": "some_category", "points": some_number}}

Task: "{task.description}"
"""

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )

        content = response.choices[0].message['content'].strip()
        print("Raw GPT response:", content)

        parsed = json.loads(content)
        task_entry = {
        "description": task.description,
        "category": parsed["category"],
        "points": parsed["points"]
        }

        task_history.append(task_entry)

        return task_entry
    
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
    
@app.get("/history")
def get_history():
    return task_history
