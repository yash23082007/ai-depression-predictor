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

  const mapData = [
    { id: 'mood', label: 'Mood and enjoyment', score: Math.max(value(0), value(1)), 
      explanation: Math.max(value(0), value(1)) > 0 ? 'You selected a recent difficulty with mood or enjoyment.' : 'No recent mood difficulties selected.' },
    { id: 'sleep', label: 'Sleep rhythm', score: value(2), 
      explanation: value(2) > 0 ? 'You selected a recent sleep-related difficulty.' : 'No recent sleep difficulties selected.' },
    { id: 'energy', label: 'Energy', score: value(3), 
      explanation: value(3) > 0 ? 'You selected a recent low-energy difficulty.' : 'No recent energy difficulties selected.' },
    { id: 'daily-routine', label: 'Daily routine and focus', score: Math.max(value(4), value(6)), 
      explanation: Math.max(value(4), value(6)) > 0 ? 'You selected one or more focus or routine difficulties.' : 'No recent focus or routine difficulties selected.' },
    { id: 'self-worth', label: 'Self-worth', score: value(5), 
      explanation: value(5) > 0 ? 'You selected a recent difficulty with self-worth.' : 'No recent self-worth difficulties selected.' },
  ];

  return mapData.map((area) => ({ ...area, level: responseLevel(area.score) }));
};

export const responseLabel = (score) => {
  if (score === 3) return 'Nearly every day';
  if (score === 2) return 'More than half the days';
  if (score === 1) return 'Several days';
  return 'Not selected';
};
