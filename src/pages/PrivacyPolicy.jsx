import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => <main className="max-w-3xl mx-auto px-6 py-14">
  <p className="text-forest font-bold uppercase tracking-[.14em] text-sm">Privacy model</p>
  <h1 className="font-heading text-4xl text-ink mt-3">Your check-in is local by default.</h1>
  <div className="mt-8 space-y-7 text-muted leading-relaxed">
    <section><h2 className="font-heading text-2xl text-ink">Standard check-in</h2><p className="mt-2">MindCheck does not require an account, name, email address, server-side session ID, device identifier, or cloud profile. The standard check-in runs in your browser. This app does not send normal check-in answers to a MindCheck API.</p></section>
    <section><h2 className="font-heading text-2xl text-ink">Optional local history</h2><p className="mt-2">After a non-safety check-in, you may choose to save a reflection in IndexedDB on this browser. You can export or delete all saved local reflections from <Link className="text-forest underline" to="/my-data">My data</Link>. Browser data may disappear if you clear browser storage, use private browsing, change device, or use another browser.</p></section>
    <section><h2 className="font-heading text-2xl text-ink">Safety answers</h2><p className="mt-2">MindCheck shows support information when a safety-related answer is selected. It does not automatically save that entry to local history, contact anyone, or assess an emergency. If someone may be in immediate danger, they should use local emergency services or contact a trusted person nearby.</p></section>
    <section><h2 className="font-heading text-2xl text-ink">Do not add this</h2><p className="mt-2">Do not add answer-level analytics, advertising pixels, third-party behaviour recording, URL query parameters containing answers, or server logging of check-in content without a new privacy, consent, retention, deletion and safety review.</p></section>
  </div>
</main>;
export default PrivacyPolicy;
