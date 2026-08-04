import { useEffect, useState } from 'react';
import { clearCheckIns, exportCheckIns, getCheckIns } from '../lib/checkinStore';

const PrivacyControls = () => {
  const [count, setCount] = useState(null);
  const [message, setMessage] = useState('');

  const refreshCount = async () => {
    try {
      const entries = await getCheckIns();
      setCount(entries.length);
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
