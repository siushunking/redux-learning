# redux-learning
自從用完redux去開發react之後，發現真的十分方便，所以在此記錄一下redux用法，後面是關於reduxjs/toolkit，他能解決redux的一些問題，讓開發人員更好開發。

# branch react-redux 才是使用react-redux，
# main branch 是使用javascript redux

# redux 的好處
Redux是一個全域的資料管理工具，類似是全域變數，但他是管理整個react中的state，因此components可以直接從 Redux 取得state，不用再透過lifting state。而且在components管理state
亦十分混亂。

1. npm i react-redux
2. 建立store folder
3. 在store中建立index.js
4. 在indexjs中 加入 provider同時在<App 加入 store>

```
import {Provider} from 'react-reduc'
import store from './store/index>
<Provider>
<App store={store} />
</Provider>
```

5. 在store中建立index.js中建立redux 
```
const redux =  require('redux')

const counterReducer = (state={counter: 1}, action) => {
    if (action.type === 'increment'){
        return{
        counter: state.counter + 1
    } 
    }
    if (action.type === 'decrement'){
        return{
        counter: state.counter + 1
    } 
    }

    return state
}

const store = createStore(counterReducer);

export default store;
```


# 在 components 中 取用state
1. 首先要建立連立連接
```
import { useDispatch, useSelector } from 'react-redux';

 const counter = useSelector(state => state.counter);
  const show = useSelector(state => state.showCounter)
  const dispitch = useDispatch()

```
2. 之後好像switch那樣 寫handler dom
```
const incrementHandler = () => {
    dispitch({ type: 'increment'})
  }
  <button onClick={toggleCounterHandler}>Toggle Counter</button>
```

# 在 redux_learning project 成功後畫面
<img width="646" alt="螢幕截圖 2022-04-15 上午4 28 18" src="https://user-images.githubusercontent.com/85872659/163470273-55fd1946-422b-4a37-9ffd-791279eb7f32.png">






# toolkit
```
import { createSlice, configureStore } from '@reduxjs/toolkit';
```
1. 建立 store 初始化 state
```
const initialState = { counter: 0, showCounter: true };
```

2. createSlice
```
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    }
  }
});
```

3. 成立slice 並匯出createslice
```
const store = configureStore({
  reducer: counterSlice.reducer
});

export const counterActions = counterSlice.actions;

export default store;
```

# 在components 中取用store 
1. 建立連接
```
import { useSelector, useDispatch } from 'react-redux';

import { counterActions } from '../store/index';
import classes from './Counter.module.css';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const show = useSelector((state) => state.showCounter);
```

2. 設定條件
```
 const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(10)); // { type: SOME_UNIQUE_IDENTIFIER, payload: 10 }
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };
```



# slice

以toolkit實作購物者

1.建立 slice
```
import { createSlice, configureStore } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {cartIsVisible: false},
    reducers: {
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible;
        }
    }
})

export const uiActions = uiSlice.actions;

export default uiSlice;

```
2.  匯出slice
```
import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: { ui: uiSlice.reducer}
})

export default store;
```

3. 建立組件和store 連接
```
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch()
  const toggleCartHandler = () =>{
    dispatch(uiActions.toggle())
  }

  return (
    <button className={classes.button}  onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
```

4. 在app 動作
```
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux'


function App() {
  const showCart = useSelector(state =>  
    state.ui.cartIsVisible
  )
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
```
顯示購物車
<img width="992" alt="螢幕截圖 2022-04-15 下午7 50 17" src="https://user-images.githubusercontent.com/85872659/163567467-5d2609be-c161-40d0-bc79-f317022a4f35.png">
收起購物車
<img width="1051" alt="螢幕截圖 2022-04-15 下午7 50 09" src="https://user-images.githubusercontent.com/85872659/163567470-361cd4e0-86de-4f15-a4f2-1684a153d25d.png">


