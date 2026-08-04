import React, { useMemo, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import FrictionMap from '../components/FrictionMap';
import SafetySupportPanel from '../components/SafetySupportPanel';
import { buildFrictionMap } from '../lib/frictionMap';
import { chooseActions } from '../lib/actionPlanner';
import { saveCheckIn } from '../lib/checkinStore';
import PrivacyReceipt from '../components/PrivacyReceipt';

const EMPTY_ANSWERS = [];

const rangeStyle = {
  'low-friction': { color: '#2D5A3D', bg: '#EBF5EE' },
  'some-friction': { color: '#A16207', bg: '#FEF3C7' },
  'support-worth-considering': { color: '#C2410C', bg: '#FFEDD5' },
  'high-support': { color: '#B91C1C', bg: '#FEE2E2' },
};

const ResultDashboard = () => {
  const { state } = useLocation();
  const [selectedAction, setSelectedAction] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');

  const result = state?.result;
  const answers = Array.isArray(state?.answers) ? state.answers : EMPTY_ANSWERS;
  const hasSafetyAnswer = Boolean(result?.hasSafetyAnswer || answers[8] > 0);
  const frictionMap = useMemo(() => buildFrictionMap(answers), [answers]);
  const actions = useMemo(() => chooseActions(frictionMap), [frictionMap]);
  const style = rangeStyle[result?.reflection?.key] || rangeStyle['low-friction'];
  const formattedDate = result?.timestamp
    ? new Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(new Date(result.timestamp))
    : '';

  if (!result || !Array.isArray(state?.answers)) return <Navigate to="/assessment" replace />;

  const handleSave = async () => {
    try {
      setSaveError('');
      await saveCheckIn({
        answers,
        reflection: result.reflection,
        selectedAction,
        // Do not retain an entry that included a safety response. This keeps the
        // default local history focused on non-crisis reflection patterns.
        hasSafetyAnswer: false,
      });
      setSaved(true);
    } catch {
      setSaveError('This browser could not save the private reflection. You can still use the summary without saving it.');
    }
  };

  return (
    <div className="max-w-[680px] mx-auto px-6 py-6">
      {hasSafetyAnswer && <div className="mb-5"><SafetySupportPanel /></div>}

      <motion.main initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="bg-white border border-border rounded-[20px] overflow-hidden shadow-lg">
        <header className="p-6 sm:p-10 border-b border-border">
          <p className="text-[0.9rem] text-muted mb-2">Private check-in complete · {formattedDate}</p>
          <h1 className="font-heading text-[1.9rem] text-ink mb-5 tracking-tight">Your wellbeing summary</h1>
          <div className="inline-flex items-center px-3 py-2 rounded-full text-[0.85rem] font-bold" style={{ backgroundColor: style.bg, color: style.color }}>
            {result.reflection.label}
          </div>
          <p className="text-[0.95rem] leading-relaxed text-gray-700 mt-5">{result.reflection.description}</p>
          <p className="text-xs text-muted mt-4">This is a reflection based on your answers, not a diagnosis or a clinical result.</p>
        </header>

        <div className="p-6 sm:p-10">
          <FrictionMap areas={frictionMap} />

          <section className="mb-8" aria-labelledby="next-step-title">
            <h2 id="next-step-title" className="text-lg font-bold mb-2">Choose one small next step</h2>
            <p className="text-sm text-muted mb-4">You are in control. Pick an option only if it feels realistic today.</p>
            <div className="space-y-3">
              {actions.map((action) => {
                const selected = selectedAction === action.id;
                return (
                  <button key={action.id} type="button" onClick={() => setSelectedAction(action.id)} className={`w-full text-left border rounded-xl p-4 transition-colors ${selected ? 'border-forest bg-sage' : 'border-border hover:border-forest bg-ivory'}`}>
                    <div className="flex justify-between gap-3">
                      <h3 className="font-bold text-ink">{action.title}</h3>
                      <span className="text-xs text-muted whitespace-nowrap">{action.minutes} min</span>
                    </div>
                    <p className="text-sm mt-2 leading-relaxed">{action.instruction}</p>
                    <p className="text-xs text-muted mt-3">{action.note}</p>
                  </button>
                );
              })}
            </div>
          </section>

          {!hasSafetyAnswer && (
            <section className="border-t border-border pt-7" aria-labelledby="save-title">
              <h2 id="save-title" className="text-lg font-bold">Optional private reflection history</h2>
              <p className="text-sm text-muted mt-2 mb-4">Save this check-in only on this device. It is not uploaded to a server and you can delete/export it from My Data.</p>
              <button type="button" className="btn-forest py-3" onClick={handleSave} disabled={saved}>
                {saved ? 'Saved on this device' : 'Save this reflection locally'}
              </button>
              {saveError && <p className="text-sm text-red-700 mt-3" role="alert">{saveError}</p>}
            </section>
          )}

          <PrivacyReceipt saved={saved} hasSafetyAnswer={hasSafetyAnswer} />

          <footer className="text-center pt-8 mt-8 border-t border-border">
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/assessment" className="btn-ghost inline-flex py-2 px-5 text-[0.85rem]">Retake check-in</Link>
              <Link to="/my-data" className="btn-ghost inline-flex py-2 px-5 text-[0.85rem]">My local data</Link>
            </div>
          </footer>
        </div>
      </motion.main>
    </div>
  );
};

export default ResultDashboard;
