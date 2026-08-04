

const levelCopy = {
  steady: 'Feels steadier today',
  'slight-friction': 'A little difficult',
  'worth-noticing': 'Worth noticing',
  'needs-attention': 'May need support',
};

const levelStyle = {
  steady: 'bg-emerald-100 text-emerald-900',
  'slight-friction': 'bg-yellow-100 text-yellow-900',
  'worth-noticing': 'bg-orange-100 text-orange-900',
  'needs-attention': 'bg-red-100 text-red-900',
};

const FrictionMap = ({ areas }) => (
  <section className="mb-8" aria-labelledby="friction-map-title">
    <h2 id="friction-map-title" className="text-lg font-bold mb-2">This week’s friction map</h2>
    <p className="text-sm text-muted mb-4">
      These labels reflect your own answers. They are not a diagnosis or an explanation of why you feel this way.
    </p>

    <div className="grid gap-3 sm:grid-cols-2">
      {areas.map((area) => (
        <article key={area.id} className="border border-border rounded-xl p-4 bg-ivory">
          <p className="font-semibold text-ink">{area.label}</p>
          <span className={`inline-block mt-2 mb-2 text-xs px-2.5 py-1 rounded-full font-semibold ${levelStyle[area.level]}`}>
            {levelCopy[area.level]}
          </span>
          <p className="text-xs text-muted leading-relaxed">
            {area.explanation}
          </p>
        </article>
      ))}
    </div>
  </section>
);

export default FrictionMap;
