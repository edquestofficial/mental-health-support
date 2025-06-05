import base64
import uuid
import os
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import whisper
from pydub import AudioSegment

app = FastAPI()

# Allow CORS from all origins (customize for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Whisper model once
model = whisper.load_model("base")


@app.get("/status")
async def get_status():
    return {"status": "running", "message": "Backend is up!"}


@app.post("/echo")
async def post_echo(request: Request):
    data = await request.json()
    return {
        "received": data,
        "message": "POST data received successfully."
    }


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("Client connected via WebSocket")

    try:
        while True:
            data = await websocket.receive_text()
            import json
            payload = json.loads(data)

            if payload["type"] == "audio_blob":
                base64_audio = payload["data"]
                voice_type = payload.get("voice", "female")

                # Save audio to temporary file
                filename = f"temp_{uuid.uuid4().hex}.wav"
                audio_data = base64.b64decode(base64_audio)
                with open(filename, "wb") as f:
                    f.write(audio_data)

                # Convert format if needed
                try:
                    audio = AudioSegment.from_file(filename)
                    audio.export(filename, format="wav")
                except Exception as e:
                    print("Audio conversion error:", e)

                # Transcribe with Whisper
                try:
                    result = model.transcribe(filename)
                    print("Transcription:", result["text"])
                    await websocket.send_json({
                        "type": "transcription",
                        "text": result["text"],
                        "voice": voice_type
                    })
                except Exception as e:
                    print("Transcription error:", e)
                    await websocket.send_json({
                        "type": "error",
                        "text": str(e)
                    })

                # Clean up
                os.remove(filename)

    except WebSocketDisconnect:
        print("WebSocket client disconnected")
