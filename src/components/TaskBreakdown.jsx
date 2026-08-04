import { useState } from 'react';

const TaskBreakdown = ({ onClose }) => {
  const [bigTask, setBigTask] = useState('');
  const [smallTask, setSmallTask] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSaveLocally = () => {
    if (!smallTask) return;
    const existing = JSON.parse(localStorage.getItem('mindcheck-task-breakdown') || '[]');
    existing.push({ bigTask, smallTask, date: new Date().toISOString() });
    localStorage.setItem('mindcheck-task-breakdown', JSON.stringify(existing));
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-5" role="dialog" aria-modal="true" aria-labelledby="breakdown-title">
      <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow-2xl">
        <h2 id="breakdown-title" className="font-heading text-xl text-ink mb-2">Make a task smaller</h2>
        <p className="text-sm text-muted mb-4">Define a 15-minute slice of a task that feels overwhelming right now.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-[0.8rem] font-bold text-forest uppercase tracking-wide mb-1">The big task</label>
            <input
              type="text"
              placeholder="e.g. Write my assignment"
              className="w-full p-3 border border-border rounded-lg bg-ivory text-ink focus:outline-none focus:border-forest"
              value={bigTask}
              onChange={(e) => setBigTask(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[0.8rem] font-bold text-forest uppercase tracking-wide mb-1">The 15-minute version</label>
            <input
              type="text"
              placeholder="e.g. Open document and write one heading"
              className="w-full p-3 border border-border rounded-lg bg-ivory text-ink focus:outline-none focus:border-forest"
              value={smallTask}
              onChange={(e) => setSmallTask(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button className="flex-1 btn-forest py-2 disabled:opacity-50" onClick={handleSaveLocally} disabled={!smallTask}>
            {saved ? '✓ Saved locally' : 'Save for later'}
          </button>
          <button className="flex-1 btn-ghost py-2" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskBreakdown;
