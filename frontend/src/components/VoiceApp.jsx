// src/components/VoiceApp.js
import React, { useState, useEffect } from 'react';
import Recorder from './Recorder';
import Player from './Player';
import Transcript from './Transcript';
import { useWebSocket } from '../hooks/useWebSocket';

const WS_URL = 'ws://localhost:8000/ws';

const VoiceApp = () => {
  const { message, sendMessage } = useWebSocket(WS_URL);
  const [transcript, setTranscript] = useState('');
  const [voiceGender, setVoiceGender] = useState('female');

  useEffect(() => {
    if (message && message.type === 'transcription') {
      setTranscript(message.text);
    }
  }, [message]);

  const handleSendAudio = (base64Audio) => {
    sendMessage({
      type: 'audio_blob',
      data: base64Audio,
      voice: voiceGender,
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Simulator</h1>

      <label>
        Select Voice Gender:&nbsp;
        <select value={voiceGender} onChange={e => setVoiceGender(e.target.value)}>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </label>

      <div style={{ marginTop: 20 }}>
        <Recorder onSendAudio={handleSendAudio} />
      </div>

      <Transcript text={transcript} />
      <Player text={transcript} voiceGender={voiceGender} />
    </div>
  );
};

export default VoiceApp;
