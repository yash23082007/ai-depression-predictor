import { actionCards } from '../data/actionCards';

export const chooseActions = (areas) => {
  const activeAreaIds = areas
    .filter((area) => area.level !== 'steady')
    .map((area) => area.id);

  const matching = actionCards.filter((card) =>
    card.triggers.some((trigger) => activeAreaIds.includes(trigger))
  );

  // Always give the user a small, non-medical option even if no theme is active.
  return (matching.length ? matching : [actionCards.find((card) => card.id === 'gentle-reset')]).slice(0, 3);
};
