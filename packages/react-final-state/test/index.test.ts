/* eslint-disable no-console,no-param-reassign,react/jsx-one-expression-per-line */
import { renderHook, act } from '@testing-library/react-hooks';
import { createStore, ActionMap } from 'final-state';
import { useCriteria, useSubscription, Criteria } from '../src';

interface State {
  a: number;
  b: string;
  c: boolean;
}

const initialState: State = {
  a: 1,
  b: 'good',
  c: true,
};

const actions: ActionMap = {
  setA(draftState, n) {
    draftState.a = n;
  },
  increaseA(draftState) {
    draftState.a += 1;
  },
  setB(draftState, s) {
    draftState.b = s;
  },
  setC(draftState, b) {
    draftState.c = b;
  },
};

test('`useCriteria(store, criteria)` works', () => {
  const store = createStore(initialState, actions, 'react-final-state-test');
  const criteriaA: Criteria<State['a'], State> = state => state.a;
  const criteriaB: Criteria<State['b'], State> = state => state.b;
  const { result: a } = renderHook(() => useCriteria(store, criteriaA));
  const newA = initialState.a + 1;
  expect(a.current).toBe(initialState.a);
  act(() => {
    store.dispatch('setA', newA);
  });
  expect(a.current).toBe(newA);
  act(() => {
    store.dispatch('increaseA');
  });
  expect(a.current).toBe(newA + 1);

  const { result: b } = renderHook(() => useCriteria(store, criteriaB));
  const newB = 'bad';
  expect(b.current).toBe(initialState.b);
  act(() => {
    store.dispatch('setB', newB);
  });
  expect(b.current).toBe(newB);

  const { result: c } = renderHook(() => useCriteria(store, state => state.c));
  const newC = !initialState.c;
  expect(c.current).toBe(initialState.c);
  act(() => {
    store.dispatch('setC', newC);
  });
  expect(c.current).toBe(newC);
});
describe('Test `useSubscription`', () => {
  test('it works', () => {
    let count = 0;
    const store = createStore(initialState, actions, 'react-final-state-test');
    renderHook(() =>
      useSubscription(store, () => {
        count += 1;
      }),
    );
    act(() => {
      store.dispatch('setA');
    });
    expect(count).toBe(1);
    act(() => {
      store.dispatch('setB');
    });
    expect(count).toBe(2);
    act(() => {
      store.dispatch('setC');
    });
    expect(count).toBe(3);
  });
});
