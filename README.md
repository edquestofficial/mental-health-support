# mental-health-support
mental-health-support
# README #
# CRM Full Stack Project (React.js + Python FastAPI + Pinecone)

This project is a full-stack CRM system built with:

- **Frontend**: React.js
- **Backend**: Python with FastAPI
- **Database**: Pinecone

---

## 📁 Project Structure
    MentalHealth-CRM/
    │
    ├── backend/ # Python FastAPI backend
    │ ├── main.py
    │ ├── pyproject.toml
    │ └── app/
    │
    └── frontend/ # React.js frontend
    ├── src/
    ├── package.json
    └── ...
### Clone project ###


### Setup Backend ###
    - Python 3.10.12
    - `uv` installed (`pip install uv`)
    - vector database

## 🔧 Steps
    1.  Navigate to the backend directory:   cd backend
    2.  Setup the virtual environment        uv venv
    3.  Activate the environment             Source .venv/bin/activate
    4.  Install Library                      uv pip install -r pyproject.py
    5.  Start the backend server:   uvicorn app.main:app --reload
    6.  The backend will be available at: http://localhost:8000
### Setup Frontend ###
* Use Node version v22.9.0
## 🔧 Steps
    1.  Navigate to the frontend directory:     cd frontend
    2.  Install frontend dependencies:          npm install
    3.  Start the frontend app:                 npm run start
    4.  The frontend will be available at:      http://localhost:3000

