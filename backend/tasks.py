from fastapi import FastAPI, Request
from pydantic import BaseModel
import openai
from dotenv import load_dotenv
import os

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key:
    print("⚠️ OPENAI_API_KEY is missing!")

app = FastAPI()

class Task(BaseModel):
    description: str

@app.post("/classify")
def classify(task: Task):

    prompt = f"""Classify this task into: hygiene, chores, fitness, work, long, or misc, and only respond with the category.
    Task: "{task.description}" """

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    category = response.choices[0].message['content'].strip().lower()

    points_map = {
        "short": 5, "hygiene": 5, "chores": 10,
        "fitness": 15, "work": 20, "long": 25, "misc": 10,
    }

    return {
        "category": category,
        "points": points_map.get(category, 5)
    }