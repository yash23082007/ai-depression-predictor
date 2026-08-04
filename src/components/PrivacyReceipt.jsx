const PrivacyReceipt = () => (
  <section className="mt-7 p-5 rounded-xl bg-emerald-50 border border-emerald-200" aria-labelledby="privacy-receipt-title">
    <h2 id="privacy-receipt-title" className="font-bold text-emerald-950">MindCheck Privacy Receipt</h2>
    <ul className="mt-3 space-y-2 text-sm text-emerald-900">
      <li>✓ No account used</li>
      <li>✓ No check-in answers sent to server</li>
      <li>✓ No cloud profile created</li>
      <li>✓ No server-side history created</li>
      <li>✓ This reflection is saved only if you explicitly choose Save</li>
      <li>✓ You can export/delete local data</li>
    </ul>
  </section>
);

export default PrivacyReceipt;
