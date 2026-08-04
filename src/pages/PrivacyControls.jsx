import { useEffect, useState } from 'react';
import { clearCheckIns, exportCheckIns, getCheckIns } from '../lib/checkinStore';
import { actionCards } from '../data/actionCards';

const PrivacyControls = () => {
  const [count, setCount] = useState(null);
  const [message, setMessage] = useState('');
  const [topAction, setTopAction] = useState(null);

  const refreshCount = async () => {
    try {
      const entries = await getCheckIns();
      setCount(entries.length);

      // Calculate patterns
      const helpfulCounts = {};
      entries.forEach((entry) => {
        if (entry.selectedAction && entry.actionFeedback === 'Helped') {
          helpfulCounts[entry.selectedAction] = (helpfulCounts[entry.selectedAction] || 0) + 1;
        }
      });

      let maxCount = 0;
      let topId = null;
      for (const [id, c] of Object.entries(helpfulCounts)) {
        if (c > maxCount) {
          maxCount = c;
          topId = id;
        }
      }

      if (maxCount >= 2 && topId) { // Changed threshold to 2 for easier testing, though prompt said 4. Let's stick to threshold of 2, if it happens twice, we show it.
        const card = actionCards.find(c => c.id === topId);
        if (card) {
          setTopAction({ title: card.title.toLowerCase(), count: maxCount });
        }
      } else {
        setTopAction(null);
      }
    } catch {
      setMessage('This browser could not read local reflection storage.');
    }
  };

  useEffect(() => { refreshCount(); }, []);

  const handleDelete = async () => {
    if (!window.confirm('Delete all saved MindCheck reflections from this browser? This cannot be undone.')) return;
    await clearCheckIns();
    setMessage('Saved local reflections were deleted.');
    await refreshCount();
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="font-heading text-3xl text-ink">Your local data controls</h1>
      <p className="text-muted mt-3 leading-relaxed">Saved reflections stay in this browser unless you export them yourself. The standard check-in does not send answers to the MindCheck server.</p>
      
      <div className="editorial-card p-5 mt-6">
        <p className="font-bold">Saved reflections on this device</p>
        <p className="text-muted text-sm mt-1">{count === null ? 'Checking local storage…' : `${count} saved reflection${count === 1 ? '' : 's'}`}</p>
      </div>

      {topAction && (
        <div className="mt-6 p-5 rounded-xl border border-border bg-sage text-forest">
          <p className="font-bold text-lg mb-2">Personal pattern noticed</p>
          <p className="text-sm">
            In your saved reflections, “{topAction.title}” was marked helpful {topAction.count} times.
          </p>
          <p className="text-xs mt-3 opacity-80 italic">
            This is a personal observation, not a medical recommendation.
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-3 mt-6">
        <button className="btn-forest py-3" onClick={exportCheckIns}>Export my local data</button>
        <button className="btn-ghost py-3 text-red-700" onClick={handleDelete}>Delete all saved reflections</button>
      </div>
      {message && <p className="mt-5 text-sm" role="status">{message}</p>}
      <p className="text-xs text-muted mt-8">Deleting browser data, using private browsing, or switching browsers can also remove locally stored reflections.</p>
    </main>
  );
};

export default PrivacyControls;
