import { useEffect, useCallback, useState } from 'react';
import { Store, Listener } from 'final-state';

/**
 * A react hook to subscribe the changes of state
 *
 * You can do it by yourself. This is just a shortcut hook.
 * @param store specify which store instance you want to subscribe
 * @param listener the listener that will be triggered when state is changed
 */
export function useSubscription(store: Store, listener: Listener) {
  useEffect(() => store.subscribe(listener), [store, listener]);
}

/**
 * A function to get value from state
 * @param {K} state
 * @template T the type of the state that you are tracking
 * @template K the type of the state
 */
export type Criteria<T, K> = (state: K) => T;

/**
 * A react hook to help you tracking a state by criteria.
 * @param store specify which store instance you want to track state
 * @param {Criteria} criteriaFn a getter function of the property to track.
 * @template T the type of the state that you are tracking
 * @template K the type of the whole state
 */
export function useCriteria<T, K>(store: Store<K>, criteriaFn: Criteria<T, K>) {
  const getCriteria = useCallback(() => {
    return criteriaFn(store.getState());
  }, [store, criteriaFn]);

  const [criteria, setCriteria] = useState(getCriteria());

  useEffect(() => {
    setCriteria(getCriteria());
  }, [getCriteria]);

  const listener = useCallback(() => setCriteria(getCriteria()), [getCriteria]);
  useSubscription(store, listener);

  return criteria;
}
