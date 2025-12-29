import { describe, it, expect } from 'vitest';
import { Subject } from '../src/subject';

describe('Subject', () => {
  it('notifies subscribers', () => {
    const subj = new Subject('', 1);
    let value = 0;

    subj.subscribe((v) => {
      value = v;
    });

    expect(value).toBe(1);

    subj.notify(1);

    expect(value).toBe(1);
  });
});
