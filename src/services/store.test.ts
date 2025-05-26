import store, { rootReducer, RootState } from '../services/store';
import { configureStore } from '@reduxjs/toolkit';

describe('rootReducer tests', () => {
  test('rootReducer should handle unknown action and return initial state', () => {
    const expected = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(expected).toEqual(store.getState());
  });
  
  test('rootReducer should maintain correct structure', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    
    // Проверяем наличие всех слайсов в состоянии
    expect(initialState).toHaveProperty('constructorBurger');
    expect(initialState).toHaveProperty('ingredient');
    expect(initialState).toHaveProperty('user');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('feed');
    
    // Проверяем что состояние имеет правильную структуру
    expect(initialState.constructorBurger).toHaveProperty('constructorItems');
    expect(initialState.constructorBurger.constructorItems).toHaveProperty('bun');
    expect(initialState.constructorBurger.constructorItems).toHaveProperty('ingredients');
    expect(initialState.ingredient).toHaveProperty('ingredients');
    expect(initialState.user).toHaveProperty('userData');
  });
  
  test('rootReducer should be correctly integrated in store', () => {
    // Создаем тестовый store с нашим rootReducer
    const testStore = configureStore({
      reducer: rootReducer
    });
    
    // Проверяем, что стор инициализируется с теми же данными, что и наш основной стор
    expect(testStore.getState()).toEqual(store.getState());
    
    // Проверяем типы
    type TestState = ReturnType<typeof testStore.getState>;
    const typeCheck: TestState extends RootState ? true : false = true;
    expect(typeCheck).toBe(true);
  });
});
