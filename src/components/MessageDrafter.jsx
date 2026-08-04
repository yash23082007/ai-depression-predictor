import { useState } from 'react';

const MessageDrafter = ({ onClose }) => {
  const defaultMessage = 'I have been having a difficult week. Could we talk sometime today or tomorrow?';
  const [message, setMessage] = useState(defaultMessage);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-5" role="dialog" aria-modal="true" aria-labelledby="drafter-title">
      <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow-2xl">
        <h2 id="drafter-title" className="font-heading text-xl text-ink mb-2">Draft a message</h2>
        <p className="text-sm text-muted mb-4">Edit this text until it sounds like you. This app will not send the message for you.</p>
        <textarea
          className="w-full h-32 p-3 border border-border rounded-lg bg-ivory text-ink focus:outline-none focus:border-forest resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex gap-3 mt-5">
          <button className="flex-1 btn-forest py-2" onClick={handleCopy}>
            {copied ? '✓ Copied' : 'Copy to clipboard'}
          </button>
          <button className="flex-1 btn-ghost py-2" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageDrafter;
