import { useEffect, useState } from 'react';
import { Play, Square, Volume2, VolumeX } from 'lucide-react';
import { content } from '../data/content.js';

function PortraitSvg({ mouthState }) {
  return <svg className="avatar-illustration" viewBox="0 0 320 390" role="img" aria-label={content.copy.accessibility.portrait}>
    <defs>
      <linearGradient id="azka-scarf" x1="39" x2="266" y1="57" y2="339" gradientUnits="userSpaceOnUse"><stop stopColor="#72d7c9"/><stop offset="1" stopColor="#357d8f"/></linearGradient>
      <linearGradient id="azka-shirt" x1="100" x2="260" y1="285" y2="394" gradientUnits="userSpaceOnUse"><stop stopColor="#ff927f"/><stop offset="1" stopColor="#d85f6c"/></linearGradient>
    </defs>
    <ellipse cx="160" cy="365" rx="113" ry="14" fill="#080f20" opacity=".32"/>
    <g className="avatar-shoulders" aria-label={content.copy.accessibility.avatarParts.shoulders}>
      <path d="M70 361c7-46 35-74 89-79 56-5 91 24 98 79H70Z" fill="url(#azka-shirt)"/>
      <path d="m132 254 29 22 31-22-9 80-25 25-26-25-8-80Z" fill="#e8f2e7"/>
    </g>
    <g className="avatar-hijab" aria-label={content.copy.accessibility.avatarParts.hijab}>
      <path d="M85 180c-11-87 18-141 76-150 70-11 110 46 86 142-10 40-15 95-10 127-33 29-128 32-164 0 5-45 16-80 12-119Z" fill="url(#azka-scarf)"/>
      <path d="M101 122c-18 20-19 60-8 98 12 40 40 65 68 76-25-35-34-68-34-107 0-23 4-43 10-63-12 1-24 0-36-4Z" fill="#1d2d4b"/>
      <path d="M235 116c16 29 18 67 9 102-8 31-23 53-43 68 15-35 18-65 17-102-1-27-5-46-13-64 11 1 21 0 30-4Z" fill="#243859"/>
    </g>
    <g className="avatar-head">
      <g className="avatar-face" aria-label={content.copy.accessibility.avatarParts.face}>
        <path d="M111 122c9-45 44-68 82-58 31 8 46 42 41 82-5 42-31 74-70 72-44-2-63-52-53-96Z" fill="#d89a7e"/>
        <path d="M107 117c-1-50 32-80 75-81 46-1 71 33 63 78-18-2-36-10-47-27-13 20-47 33-91 30Z" fill="#15223b"/>
        <g className="avatar-brows" fill="none" stroke="#543831" strokeWidth="3" strokeLinecap="round" aria-label={content.copy.accessibility.avatarParts.eyebrows}>
          <path d="M132 135c5-4 11-5 17-3"/><path d="M185 132c6-2 12-1 17 3"/>
        </g>
        <g className="avatar-eyes" stroke="#47302e" strokeWidth="3" strokeLinecap="round" aria-label={content.copy.accessibility.avatarParts.eyes}>
          <path d="M137 147h10"/><path d="M187 147h10"/>
        </g>
        <g className={`avatar-mouth mouth-${mouthState}`} aria-label={content.copy.accessibility.avatarParts.mouth}>
          {mouthState === 'closed' && <path d="M157 179c7 7 14 7 21 0" fill="none" stroke="#874e4a" strokeWidth="3" strokeLinecap="round"/>}
          {mouthState === 'small' && <ellipse cx="167.5" cy="180" rx="4" ry="3.6" fill="#874e4a"/>}
          {mouthState === 'wide' && <ellipse cx="167.5" cy="181" rx="7" ry="7" fill="#874e4a"/>}
        </g>
        <circle cx="126" cy="166" r="8" fill="#e88d7b" opacity=".36"/><circle cx="208" cy="166" r="8" fill="#e88d7b" opacity=".36"/>
      </g>
    </g>
    <g className="avatar-wave" aria-label={content.copy.accessibility.avatarParts.wavingHand}>
      <path d="M239 244c18-26 28-42 34-60 3-10-3-17-11-14-8 2-16 22-27 32" fill="none" stroke="#d89a7e" strokeWidth="19" strokeLinecap="round"/>
      <path d="M252 181c2-13 3-24 1-34-1-8-10-9-13-2l-5 28" fill="none" stroke="#d89a7e" strokeWidth="10" strokeLinecap="round"/>
      <path d="m245 148 4-15c2-6 9-5 10 1l1 19" fill="#d89a7e"/>
    </g>
  </svg>;
}

export default function TalkingAvatar() {
  const [photoAvailable, setPhotoAvailable] = useState(true);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [mouthState, setMouthState] = useState('closed');
  const [typedSpeech, setTypedSpeech] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedSpeech(content.speech);
      return undefined;
    }
    let position = 0;
    const timer = window.setInterval(() => {
      position += 1;
      setTypedSpeech(content.speech.slice(0, position));
      if (position >= content.speech.length) window.clearInterval(timer);
    }, 25);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setSpeechSupported('speechSynthesis' in window && typeof window.SpeechSynthesisUtterance === 'function');
  }, []);

  useEffect(() => {
    if (!speaking || paused) {
      setMouthState('closed');
      return undefined;
    }
    const states = ['closed', 'small', 'wide'];
    let index = 0;
    setMouthState(states[index]);
    const timer = window.setInterval(() => {
      index = (index + 1) % states.length;
      setMouthState(states[index]);
    }, 145);
    return () => window.clearInterval(timer);
  }, [speaking, paused]);

  function sayHi() {
    if (!speechSupported) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      setPaused(false);
      setMouthState('closed');
      return;
    }
    const utterance = new window.SpeechSynthesisUtterance(content.speech);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find(voice => /^en/i.test(voice.lang) && /female|woman|samantha|zira|karen/i.test(voice.name))
      || voices.find(voice => /^en/i.test(voice.lang))
      || null;
    utterance.lang = 'en-US';
    utterance.onstart = () => { setSpeaking(true); setPaused(false); };
    const closeMouth = () => { setSpeaking(false); setPaused(false); setMouthState('closed'); };
    utterance.onend = closeMouth;
    utterance.onerror = closeMouth;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  function togglePause() {
    if (!speechSupported || !speaking) return;
    if (paused) window.speechSynthesis.resume();
    else window.speechSynthesis.pause();
    setPaused(!paused);
  }

  return <div className="hero-art">
    <div className="avatar-stage" role="group" aria-label={content.copy.accessibility.avatar}>
      <div className="avatar-orbit" aria-hidden="true" /><div className="avatar-glow" aria-hidden="true" />
      {photoAvailable && <img src={`${import.meta.env.BASE_URL}headshot.jpg`} alt={content.name} onError={() => setPhotoAvailable(false)} style={{ position: 'absolute', inset: '14%', width: '72%', height: '72%', objectFit: 'cover', borderRadius: '50%', zIndex: 3, border: '4px solid rgba(98,211,195,.6)' }} />}
      {!photoAvailable && <PortraitSvg mouthState={mouthState} />}
      <div className="speech-bubble glass" aria-live="polite">{typedSpeech}</div>
    </div>
    {speechSupported && <div className="speech-controls">
      <button className="speech-say" aria-label={speaking ? content.copy.accessibility.stopSpeech : content.copy.accessibility.playSpeech} onClick={sayHi}>
        {speaking ? <Square size={14} fill="currentColor" /> : <Play size={16} />}<span>{speaking ? content.copy.accessibility.stopSpeech : content.copy.accessibility.playSpeech}</span>
      </button>
      <button aria-label={paused ? content.copy.accessibility.resumeSpeech : content.copy.accessibility.pauseSpeech} title={paused ? content.copy.accessibility.resumeSpeech : content.copy.accessibility.pauseSpeech} onClick={togglePause} disabled={!speaking}>
        {paused ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
    </div>}
  </div>;
}
