import logo from './logo.svg';
import './App.css';
import VoiceApp from './components/VoiceApp';
import TextToAudio from './components/TextToAudio';

function App() {
  return (
    <div className="App">
      <VoiceApp />
      <TextToAudio />
    </div>
  );
}

export default App;
