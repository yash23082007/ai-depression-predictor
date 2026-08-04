const responseLevel = (score) => {
  if (score >= 3) return 'needs-attention';
  if (score >= 2) return 'worth-noticing';
  if (score >= 1) return 'slight-friction';
  return 'steady';
};

// This maps answers to reflection areas. It is intentionally deterministic and is
// not a diagnostic model, causal explanation, or medical assessment.
export const buildFrictionMap = (answers) => {
  const safeAnswers = Array.isArray(answers) ? answers : [];
  const value = (index) => Number(safeAnswers[index] ?? 0);

  return [
    { id: 'mood', label: 'Mood and enjoyment', score: Math.max(value(0), value(1)) },
    { id: 'sleep', label: 'Sleep rhythm', score: value(2) },
    { id: 'energy', label: 'Energy', score: value(3) },
    { id: 'daily-routine', label: 'Daily routine and focus', score: Math.max(value(4), value(6)) },
    { id: 'self-worth', label: 'Self-worth', score: value(5) },
  ].map((area) => ({ ...area, level: responseLevel(area.score) }));
};

export const responseLabel = (score) => {
  if (score === 3) return 'Nearly every day';
  if (score === 2) return 'More than half the days';
  if (score === 1) return 'Several days';
  return 'Not selected';
};
