import { beforeEach, describe, expect, it } from 'vitest';
import { useExampleCounterStore } from './example-counter-store';

describe('example counter store', () => {
  beforeEach(() => useExampleCounterStore.setState({ count: 0 }));

  it('increments and resets shared state', () => {
    useExampleCounterStore.getState().increment();
    useExampleCounterStore.getState().increment();
    expect(useExampleCounterStore.getState().count).toBe(2);

    useExampleCounterStore.getState().reset();
    expect(useExampleCounterStore.getState().count).toBe(0);
  });
});
