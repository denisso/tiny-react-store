import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { createStore } from '../src';

describe('useStore', () => {
  it('updates value with hook', () => {
    const { useStore, get, set } = createStore({ count: 0 });
    const { result } = renderHook(() => useStore('count'));

    expect(result.current).toBe(0);

    act(() => {
      set('count', get('count') + 1);
    });

    expect(result.current).toBe(1);
  });

  it('multiple hooks', () => {
    const { useStore, get, set } = createStore({ count: 0 });
    const { result: result1 } = renderHook(() => useStore('count'));
    const { result: result2 } = renderHook(() => useStore('count'));

    expect(result1.current).toBe(0);
    expect(result2.current).toBe(0);

    act(() => {
      set('count', get('count') + 1);
    });

    expect(result1.current).toBe(1);
    expect(result2.current).toBe(1);
  });

  it('unmount hook', () => {
    const { useStore, get, set } = createStore({ count: 0 });
    const { result: result1, unmount } = renderHook(() => useStore('count'));
    const { result: result2 } = renderHook(() => useStore('count'));

    expect(result1.current).toBe(0);
    expect(result2.current).toBe(0);

    act(() => {
      // unmount result1
      unmount();
    });

    act(() => {
      set('count', get('count') + 1);
    });
    // result1 unchanged
    expect(result1.current).toBe(0);
    expect(result2.current).toBe(1);
  });

  it('add listener', () => {
    const { get, set, addListener } = createStore({ count: 0 });

    const listener = vi.fn<(name: string, value: number) => void>();

    addListener('count', listener);

    act(() => {
      set('count', get('count') + 1);
    });

    // 1. must be called
    expect(listener).toHaveBeenCalled();

    // 2. not more one time
    expect(listener).toHaveBeenCalledTimes(1);

    // 3. with right args
    expect(listener).toHaveBeenCalledWith('count', 1);
  });

  it('remove listener', () => {
    const { set, addListener, removeListener } = createStore({ count: 0 });

    const listener = vi.fn<(name: string, value: number) => void>();

    act(() => {
      addListener('count', listener);
      set('count', 1);
    });
    // must be called with args "count", 1
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith('count', 1);
    act(() => {
      removeListener('count', listener);
      set('count', 2);
    });
    // not must be called after removeListener and should remain unchange
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith('count', 1);
  });
});
