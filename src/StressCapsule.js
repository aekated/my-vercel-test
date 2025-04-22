// Барлық қажетті импорттар
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';

const emotionSupportMap = {
  '😡 Ашулану': [
    '💥 Қағазды майдалап жырт',
    '🏃‍♂️ 10 рет отырып-тұр',
    '😤 Ашуыңды жастыққа шығарып таста',
    '✍️ Неге ашулы екеніңді жаз – кейін оны жыртып немесе өшіріп таста'
  ],
  '😰 Мазасыздық': [
    '🫁 4-7-8 тыныс алу техникасын қолдан',
    '📋 Басқара алатын нәрселеріңнің тізімін жаз',
    '📞 Досыңа қоңырау шал немесе біреумен сөйлес',
    '🎵 3 минуттық тыныш музыка тыңда'
  ],
  '😶 Бейтараптық': [
    '🌟 Өзің үшін кішкентай бір жақсы іс жаса – мысалы, шай ішу',
    '🛏 Төсекке жатып, көзіңді 5 минутқа жұм',
    '📷 Сені бақытты еткен естеліктерді қарап шық',
    '🧸 Жұмсақ, жағымды бір затты қолыңа ал'
  ],
  '😢 Қайғы': [
    '🖌 Қайғыңды түспен бейнеле – сурет сал',
    '👂 Бір сүйікті әніңді тыңда',
    '💌 Өзіңе досыңнан хат жазып көр',
    '📖 Жігерлендіретін дәйексөз оқы немесе есіңе түсір'
  ]
};

export default function StressCapsule() {
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [emotion, setEmotion] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('stressCapsuleHistory')) || [];
    setHistory(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('stressCapsuleHistory', JSON.stringify(history));
  }, [history]);

  const handleSubmit = () => {
    const supportList = emotionSupportMap[emotion] || [];
    const randomSupport = supportList[Math.floor(Math.random() * supportList.length)];
    setResult(randomSupport);
    setStep(3);
    setHistory(prev => [
      ...prev,
      { message, emotion, support: randomSupport, time: new Date().toLocaleString() }
    ]);
  };

  const reset = () => {
    setStep(1);
    setMessage('');
    setEmotion('');
    setResult('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-purple-200 flex items-center justify-center px-4 py-8">
      <div className="flex flex-col items-center w-full max-w-md gap-6">
        <motion.h1
          className="text-4xl font-bold text-center text-blue-900 drop-shadow fade-in"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          💊 Стресс капсуласы
        </motion.h1>

        {step === 1 && (
          <motion.div
            className="bg-white/90 shadow-xl rounded-2xl p-6 w-full fade-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-800 mb-2">📝 Сені не мазалайды?</p>
            <textarea
              className="w-full p-2 border rounded-md focus:outline-none focus:ring"
              placeholder="Мұнда жаз..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              onClick={() => setStep(2)}
              disabled={!message.trim()}
            >
              Келесі ➡️
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            className="bg-white/90 shadow-xl rounded-2xl p-6 w-full fade-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-800 mb-4">🤔 Қалай сезініп тұрсың?</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(emotionSupportMap).map((e) => (
                <button
                  key={e}
                  onClick={() => setEmotion(e)}
                  className={`py-2 px-4 rounded-md transition ${
                    emotion === e
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
            <button
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
              onClick={handleSubmit}
              disabled={!emotion}
            >
              Кеңес алу 💌
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            className="bg-white/90 shadow-xl rounded-2xl p-6 w-full fade-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-700 text-lg">💬 Бөліскенің үшін рақмет!</p>
            <p className="text-xl font-semibold mt-4">🎁 Саған кеңес:</p>
            <p className="mt-2 text-blue-700 text-lg">{result}</p>
            <button
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              onClick={reset}
            >
              Қайта бастау 🔁
            </button>
          </motion.div>
        )}

        {history.length > 0 && (
          <motion.div
            className="bg-white/70 backdrop-blur-md shadow-md rounded-xl p-4 w-full fade-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-lg font-semibold mb-3 text-blue-900">📜 Соңғы жазбалар:</h2>
            <ul className="space-y-3 text-sm text-gray-700">
              {history.slice(-3).reverse().map((entry, index) => (
                <li
                  key={index}
                  className="bg-blue-50/80 p-4 rounded-xl shadow-sm border border-blue-100"
                >
                  <p>🕒 <span className="font-medium">{entry.time}</span></p>
                  <p>💬 <span className="italic">{entry.message || 'Мәтінсіз'}</span></p>
                  <p>🧠 {entry.emotion}</p>
                  <p>🎯 {entry.support}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
