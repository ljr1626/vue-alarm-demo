function makeAction(type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args);
};

const initNote = {
  id: +new Date(),
  period: '',
  time: '',
  label: '',
  switch: true,
  later: false
};

// 模拟初始化数据
const initData = {
  alarms: [initNote]
};

export const initStore = ({ dispatch }) => {
  dispatch('INIT_STORE', initData);
};

// 添加一个对象
export const newItem = makeAction('NEW_ITEM');

// 删除一个对象
export const deleteItem = makeAction('DELETE_ITEM');
export const editItem = makeAction('EDIT_ITEM');
