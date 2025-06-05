import React, { useState, useEffect } from 'react';
import { useSpeech } from 'react-text-to-speech';
import Config from '../Config'; // Import your configuration file

const TextToAudio = () => {
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(Config.speech.defaultVoiceURI);
  const [speechRate, setSpeechRate] = useState(Config.speech.defaultRate);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const voices = synth.getVoices();
      setAvailableVoices(voices);
      // Set default voice if specified in Config and available
      if (Config.speech.defaultVoiceURI) {
        const defaultVoice = voices.find(voice => voice.voiceURI === Config.speech.defaultVoiceURI);
        if (defaultVoice) {
          setSelectedVoice(defaultVoice.voiceURI);
        }
      } else if (voices.length > 0) {
        setSelectedVoice(voices[0].voiceURI);
      }
    };

    // Some browsers may not have voices immediately available
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }, []);

  const {
    Text,
    speechStatus,
    isInQueue,
    start,
    pause,
    stop,
  } = useSpeech({
    text: `This library is awesome! How you can evaluate the RAG system with metrics measuring both retrieval quality and generation quality?
In retrieval evaluation, we use:
- Recall@k: retrieved docs in top k results
- Precision@k: retrieved docs in top k are actually relevant
- MMR: Measures diversity and relevance among retrieved docs
- NDCG: Normalized Discounted Cumulative Gain ranks relevance with position.`,
    voiceURI: selectedVoice,
    rate: speechRate,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
      <Text />
      <div style={{ display: 'flex', columnGap: '0.5rem' }}>
        {speechStatus !== 'started' ? (
          <button onClick={start}>Start</button>
        ) : (
          <button onClick={pause}>Pause</button>
        )}
        <button onClick={stop}>Stop</button>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label>
          Select Voice:
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          >
            {availableVoices.map((voice, index) => (
              <option key={index} value={voice.voiceURI}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </label>
      </div>
      {/* <div style={{ marginTop: '1rem' }}>
        <label>
          Speech Rate:
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={speechRate}
            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
            style={{ marginLeft: '0.5rem' }}
          />
          <span style={{ marginLeft: '0.5rem' }}>{speechRate.toFixed(1)}</span>
        </label>
      </div> */}
    </div>
  );
};

export default TextToAudio;
