# redux-learning
自從用完redux去開發react之後，發現真的十分方便，所以在此記錄一下redux用法，之後會寫多一篇關於reduxjs/toolkit，他能解決redux的一些問題。

# redux 的好處
Redux是一個全域的資料管理工具，類似是全域變數，但他是管理整個react中的state，因此components可以直接從 Redux 取得state，不用再透過lifting state。而且在components管理state
亦十分混亂。

1. npm i react-redux
2. 建立store folder
3. 在store中建立index.js
4. 建立一個Reducer，用來管理state，同時負責接收componentaction後的工作。
5. 
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

   
}

const store = redux.createStore(counterReducer);

console.log(store.getState());

const counterSubscriber = () => {
    const latestState = store.getState();
    console.log(latestState);
}

store.subscribe(counterSubscriber)
```

