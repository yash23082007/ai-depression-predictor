import { describe, expect, it } from 'vitest';
import { buildFrictionMap } from './frictionMap';

describe('buildFrictionMap', () => {
  it('handles absent answers without crashing or inventing concern', () => {
    expect(buildFrictionMap([]).every((area) => area.level === 'steady')).toBe(true);
  });
  it('maps only the user-selected response frequency deterministically', () => {
    const map = buildFrictionMap([3, 0, 2, 1, 0, 0, 0, 0, 0]);
    expect(map.find((area) => area.id === 'mood').level).toBe('needs-attention');
    expect(map.find((area) => area.id === 'sleep').level).toBe('worth-noticing');
    expect(map.find((area) => area.id === 'energy').level).toBe('slight-friction');
  });
});
