import React from 'react';

const PrivacyReceipt = ({ saved, hasSafetyAnswer }) => (
  <section className="mt-7 p-5 rounded-xl bg-emerald-50 border border-emerald-200" aria-labelledby="privacy-receipt-title">
    <h2 id="privacy-receipt-title" className="font-bold text-emerald-950">MindCheck privacy receipt</h2>
    <ul className="mt-3 space-y-2 text-sm text-emerald-900">
      <li>✓ No account, name, email, device ID, or server profile was used.</li>
      <li>✓ Standard check-in answers were not sent to a MindCheck API.</li>
      <li>✓ No cloud record was created by this check-in.</li>
      <li>{saved ? '✓ You chose to save this reflection only in this browser.' : '✓ This reflection has not been saved in browser history.'}</li>
      {hasSafetyAnswer && <li>✓ This safety-related check-in was not offered for local history saving.</li>}
    </ul>
  </section>
);
export default PrivacyReceipt;
