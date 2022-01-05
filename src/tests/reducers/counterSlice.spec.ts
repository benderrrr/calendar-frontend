import counterReducer, {
  CounterState,
  increment,
  decrement,
  incrementByAmount,
  incrementByFour,
} from '../../redux/reducers/counter/counterSlice';

describe('counter reducer', () => {
  const initialState: CounterState = {
    value: 3,
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
    });
  });

  it('should handle increment', () => {
    const actual = counterReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });

  it('should handle decrement', () => {
    const actual = counterReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  it('should handle incrementByAmount', () => {
    const actual = counterReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  });

  it('should handle increment By 4', () => {
    const initValue = initialState.value
    const actual = counterReducer(initialState, incrementByFour());
    expect(actual.value).toEqual(initValue + 4);
  });
});
