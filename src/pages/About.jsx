

const About = () => <main className="max-w-3xl mx-auto px-6 py-14">
  <p className="text-forest font-bold uppercase tracking-[.14em] text-sm">Method and limits</p>
  <h1 className="font-heading text-4xl text-ink mt-3">MindCheck is reflection, not assessment.</h1>
  <div className="mt-8 space-y-7 text-muted leading-relaxed">
    <section><h2 className="font-heading text-2xl text-ink">What MindCheck does</h2><p className="mt-2">It presents user-selected reflection prompts, groups responses into a simple Friction Map, and offers a few small, non-medical next-step cards. The grouping is deterministic code, not an AI model, diagnosis, or causal explanation.</p></section>
    <section><h2 className="font-heading text-2xl text-ink">What MindCheck does not do</h2><ul className="mt-2 list-disc pl-5 space-y-2"><li>Diagnose depression, anxiety, or any health condition.</li><li>Predict self-harm, crisis risk, treatment outcomes, or medical severity.</li><li>Replace a qualified clinician, counsellor, emergency service, or trusted person.</li><li>Create a cloud profile from normal check-in answers.</li></ul></section>
    <section><h2 className="font-heading text-2xl text-ink">Why no AI score?</h2><p className="mt-2">A precise-looking score can create false certainty in a sensitive context. MindCheck deliberately prioritises user control, clear limits, and practical next steps over a predictive claim.</p></section>
  </div>
</main>;
export default About;
