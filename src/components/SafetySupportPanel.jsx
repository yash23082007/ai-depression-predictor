import React from 'react';
import { supportResources } from '../data/supportResources';

const SafetySupportPanel = ({ compact = false }) => (
  <section
    className={`bg-red-950 text-white rounded-2xl shadow-lg ${compact ? 'p-5' : 'p-6'}`}
    role="alert"
    aria-live="assertive"
  >
    <h2 className={`${compact ? 'text-lg' : 'text-xl'} font-bold mb-3`}>
      Please pause and get support now.
    </h2>
    <p className="text-sm leading-relaxed mb-4 text-red-50">
      You indicated thoughts of harming yourself or feeling better off dead. If you may act on
      these thoughts or are in immediate danger, contact local emergency services now. If
      possible, move near someone you trust and let them know you need support.
    </p>

    <div className="space-y-2 text-sm font-semibold">
      <a className="block underline underline-offset-2" href={supportResources.global.href} target="_blank" rel="noopener noreferrer">
        {supportResources.global.label}
      </a>
      <a className="block underline underline-offset-2" href={supportResources.india.href} target="_blank" rel="noopener noreferrer">
        {supportResources.india.label}
      </a>
      <a className="block underline underline-offset-2" href={supportResources.usCanada.href} target="_blank" rel="noopener noreferrer">
        {supportResources.usCanada.label}
      </a>
    </div>

    <p className="text-xs leading-relaxed text-red-100 mt-5">
      This website cannot assess emergencies or replace urgent professional care. Resource links
      are reviewed periodically; use local emergency services if there is immediate danger.
    </p>
  </section>
);

export default SafetySupportPanel;
