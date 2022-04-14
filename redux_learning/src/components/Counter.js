import { useDispatch, useSelector } from 'react-redux';

import classes from './Counter.module.css';

const Counter = () => {
  const counter = useSelector(state => state.counter);
  const show = useSelector(state => state.showCounter)
  const dispitch = useDispatch()

  const incrementHandler = () => {
    dispitch({ type: 'increment'})
  }

  const decrementHandler = () => {
    dispitch({ type: 'decrement'})
  }

  const increaseHandler = () => {
    dispitch({ type: 'increase', amount: 5})
  }

  const toggleCounterHandler = () => {
    dispitch({type: 'toggle'})
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
      <button onClick={incrementHandler}> increase </button>
      <button onClick={decrementHandler}> decrease </button>
      <button onClick={increaseHandler}> increase 5 </button>
      </div>
   
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;