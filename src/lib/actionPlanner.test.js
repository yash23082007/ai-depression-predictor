import { describe, expect, it } from 'vitest';
import { chooseActions } from './actionPlanner';

describe('chooseActions', () => {
  it('returns a small non-medical action even with no active areas', () => {
    const actions = chooseActions([{ id: 'sleep', level: 'steady' }]);
    expect(actions).toHaveLength(1);
    expect(actions[0].id).toBe('gentle-reset');
  });
  it('returns at most three actions and never invents content', () => {
    const actions = chooseActions([{ id: 'mood', level: 'needs-attention' }, { id: 'energy', level: 'worth-noticing' }]);
    expect(actions.length).toBeLessThanOrEqual(3);
    expect(actions.every((action) => typeof action.instruction === 'string')).toBe(true);
  });
});
