import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafetySupportPanel from '../components/SafetySupportPanel';

const questions = [
  { id: 0, q: 'Over the past two weeks, how often have you felt little interest or pleasure in doing things?', section: 'Mood & Energy', hint: 'Think about activities you usually enjoy — hobbies, socialising, or everyday tasks.' },
  { id: 1, q: 'Over the past two weeks, how often have you felt down, depressed, or hopeless?', section: 'Mood & Energy', hint: 'Think about persistent feelings rather than one difficult moment.' },
  { id: 2, q: 'Over the past two weeks, how often have you had trouble falling or staying asleep, or slept too much?', section: 'Sleep', hint: 'Consider noticeable changes in your usual sleep pattern.' },
  { id: 3, q: 'Over the past two weeks, how often have you felt tired or had little energy?', section: 'Mood & Energy', hint: 'Consider your energy during typical days.' },
  { id: 4, q: 'Over the past two weeks, how often have you noticed poor appetite or overeating?', section: 'Physical', hint: 'Consider noticeable changes, not one unusual meal.' },
  { id: 5, q: 'Over the past two weeks, how often have you felt bad about yourself or felt like a failure?', section: 'Self-worth', hint: 'Think about self-blame or guilt that feels disproportionate.' },
  { id: 6, q: 'Over the past two weeks, how often have you had trouble concentrating on things?', section: 'Concentration', hint: 'For example, reading, studying, or watching something you normally follow.' },
  { id: 7, q: 'Over the past two weeks, how often have you moved or spoken slowly enough that others could notice, or felt unusually restless?', section: 'Physical', hint: 'Consider noticeable changes in pace or restlessness.' },
  { id: 8, q: 'Over the past two weeks, how often have you had thoughts that you would be better off dead or of hurting yourself?', section: 'Safety', hint: 'Please answer honestly. If this applies, we will show support information before your summary.' },
];

const options = [
  { label: 'Not at all', value: 0 },
  { label: 'Several days', value: 1 },
  { label: 'More than half the days', value: 2 },
  { label: 'Nearly every day', value: 3 },
];

const getReflectionRange = (score) => {
  if (score >= 20) return { key: 'high-support', label: 'A lot may feel difficult right now', description: 'Several answers suggest that seeking qualified support could be useful.' };
  if (score >= 10) return { key: 'support-worth-considering', label: 'Some areas may deserve support', description: 'Some parts of daily wellbeing may be difficult right now. Support can be useful before things feel overwhelming.' };
  if (score >= 5) return { key: 'some-friction', label: 'Some wellbeing friction noticed', description: 'A few areas may feel harder than usual. A small routine or support step may help.' };
  return { key: 'low-friction', label: 'Lower wellbeing friction today', description: 'This check-in did not identify a high level of concern today. It is always okay to seek support when something feels difficult.' };
};

const AssessmentForm = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [showSafetyPause, setShowSafetyPause] = useState(false);

  const handleSelect = (value) => {
    setAnswers((previous) => {
      const next = [...previous];
      next[currentQ] = value;
      return next;
    });
  };

  const finishCheckIn = () => {
    const totalScore = answers.reduce((sum, answer) => sum + (answer ?? 0), 0);
    navigate('/summary', {
      state: {
        result: {
          checkInScore: totalScore,
          reflection: getReflectionRange(totalScore),
          hasSafetyAnswer: answers[8] > 0,
          timestamp: new Date().toISOString(),
        },
        answers,
      },
    });
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((value) => value + 1);
      return;
    }

    if (answers[8] > 0) {
      setShowSafetyPause(true);
      return;
    }

    finishCheckIn();
  };

  const previousQuestion = () => setCurrentQ((value) => Math.max(0, value - 1));
  const progress = ((currentQ + 1) / questions.length) * 100;
  const question = questions[currentQ];

  return (
    <div className="max-w-[680px] mx-auto px-6 pt-12 pb-12">
      {showSafetyPause && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-5" role="dialog" aria-modal="true" aria-labelledby="safety-pause-title">
          <div className="max-w-xl w-full bg-white rounded-2xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h1 id="safety-pause-title" className="sr-only">Safety support</h1>
            <SafetySupportPanel compact />
            <div className="grid sm:grid-cols-2 gap-3 mt-5">
              <button className="btn-forest py-3" onClick={() => setShowSafetyPause(false)}>Go back</button>
              <button className="btn-ghost py-3" onClick={finishCheckIn}>Continue to private summary</button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-10">
        <div className="flex justify-between items-baseline mb-3">
          <span className="text-[0.82rem] font-semibold text-forest uppercase tracking-[0.08em]">MindCheck private check-in</span>
          <span className="text-[0.82rem] text-muted">Question {currentQ + 1} of {questions.length}</span>
        </div>
        <div className="h-[5px] bg-border rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-forest to-forest-light rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.35 }} />
        </div>
      </div>

      <div className="inline-flex items-center gap-2 bg-forest-faint text-forest text-[0.75rem] font-bold tracking-[0.07em] uppercase px-3 py-1 rounded-full mb-4">
        <span className="w-[10px] h-[10px] bg-forest rounded-full" />{question.section}
      </div>

      <main className="bg-white border border-border rounded-[20px] p-6 sm:p-10 shadow-md">
        <p className="text-[0.78rem] font-bold text-muted tracking-[0.06em] uppercase mb-3">{String(currentQ + 1).padStart(2, '0')}.</p>
        <h1 className="font-heading text-[1.55rem] leading-[1.35] text-ink mb-2">{question.q}</h1>
        <p className="text-[0.85rem] text-muted italic leading-relaxed mb-8">{question.hint}</p>

        <div className="grid gap-3" role="radiogroup" aria-label={question.q}>
          {options.map((option) => {
            const selected = answers[currentQ] === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => handleSelect(option.value)}
                className={`flex items-center gap-4 w-full p-4 rounded-[14px] border-[1.5px] text-left transition-all ${selected ? 'border-forest bg-sage shadow-[0_0_0_3px_rgba(45,90,61,0.1)]' : 'border-border bg-ivory hover:border-forest hover:bg-white'}`}
              >
                <span className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? 'border-forest bg-forest' : 'border-border bg-white'}`}>
                  {selected && <span className="w-2 h-2 bg-white rounded-full" />}
                </span>
                <span className="flex-grow font-medium text-[0.95rem]">{option.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-10 gap-3">
          <button type="button" onClick={previousQuestion} disabled={currentQ === 0} className="btn-ghost py-3 disabled:opacity-30">Previous</button>
          <button type="button" onClick={nextQuestion} disabled={answers[currentQ] === null} className="btn-forest py-3 disabled:opacity-45">
            {currentQ === questions.length - 1 ? 'See my private summary' : 'Next question'}
          </button>
        </div>
      </main>

      <aside className="editorial-card p-4 mt-5 text-[0.8rem] text-muted flex gap-3">
        <span aria-hidden="true">🔒</span>
        <p>Your answers are processed in this browser. This check-in is not a diagnosis, emergency service, or substitute for professional care.</p>
      </aside>
    </div>
  );
};

export default AssessmentForm;
