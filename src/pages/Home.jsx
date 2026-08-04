
import { Link } from 'react-router-dom';

const Home = () => <main className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
  <section className="max-w-3xl">
    <p className="text-forest font-bold uppercase tracking-[.14em] text-sm">Private by default</p>
    <h1 className="font-heading text-5xl sm:text-6xl text-ink leading-tight mt-4">Check in with yourself. Choose one manageable next step.</h1>
    <p className="text-lg text-muted leading-relaxed mt-6">MindCheck is a local-first wellbeing reflection space for difficult weeks. It does not diagnose you or send your standard check-in answers to a server.</p>
    <div className="flex flex-wrap gap-3 mt-8"><Link className="btn-forest px-6 py-3" to="/check-in">Start a private check-in</Link><Link className="btn-ghost px-6 py-3" to="/privacy">See the privacy model</Link></div>
  </section>
  <section className="grid md:grid-cols-3 gap-4 mt-20">
    {[['1. Reflect','Answer a short set of non-diagnostic reflection prompts.'],['2. Notice','See a Friction Map based only on your own selected answers.'],['3. Choose','Pick one small action that feels possible today.']].map(([number, text]) => <article key={number} className="editorial-card p-6"><h2 className="font-heading text-2xl text-forest">{number}</h2><p className="text-muted leading-relaxed mt-3">{text}</p></article>)}
  </section>
  <aside className="mt-12 border border-amber-200 bg-amber-50 rounded-2xl p-6 text-amber-950"><h2 className="font-bold">Clear boundary</h2><p className="mt-2 text-sm leading-relaxed">MindCheck is not a crisis response service. If you may harm yourself or are in immediate danger, contact local emergency services, someone nearby, or a crisis support service now.</p></aside>
</main>;
export default Home;
