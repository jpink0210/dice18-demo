
// 這個檔案只是方便你比較，寫檔案 和 宣告變數要注意差別

export const getState = state => state;
export const getAll = state => state.todos;
export const getDone = state => {
return state.todos.filter((item) => {
    return item.done;
});
}
export const getTodo = state => {
return state.todos.filter((item)=>{
    return !item.done;
});
}