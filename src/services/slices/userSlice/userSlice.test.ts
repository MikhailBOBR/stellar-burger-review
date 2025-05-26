import userSlice, {
  getUser,
  getOrdersAll,
  initialState,
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
  getUserState,
  resetError
} from './userSlice';

describe('тестирование редьюсера userSlice', () => {
  describe('начальное состояние редьюсера', () => {
    test('должен возвращать начальное состояние', () => {
      expect(userSlice(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('тестирование асинхронного GET экшена getUser', () => {
    const actions = {
      pending: {
        type: getUser.pending.type,
        payload: undefined
      },
      rejected: {
        type: getUser.rejected.type,
        error: { message: 'Error fetching user' }
      },
      fulfilled: {
        type: getUser.fulfilled.type,
        payload: { user: { name: 'someName', email: 'someEmail' } }
      }
    };

    test('тест синхронного экшена getUser.pending', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.loginUserRequest).toBe(true);
    });

    test('тест синхронного экшена getUser.rejected', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(false);
      expect(state.loginUserRequest).toBe(false);
    });

    test('тест синхронного экшена getUser.fulfilled', () => {
      const nextState = userSlice(initialState, actions.fulfilled);
      expect(nextState.isAuthenticated).toBe(true);
      expect(nextState.loginUserRequest).toBe(false);
      expect(nextState.isAuthChecked).toBe(false);
      expect(nextState.userData).toEqual(actions.fulfilled.payload.user);
    });
  });
  
  describe('тестирование асинхронного GET экшена getOrdersAll', () => {
    const actions = {
      pending: {
        type: getOrdersAll.pending.type,
        payload: undefined
      },
      rejected: {
        type: getOrdersAll.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: getOrdersAll.fulfilled.type,
        payload: ['order1', 'order2']
      }
    };

    test('тест синхронного экшена getOrdersAll.pending', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.request).toBe(true);
      expect(state.error).toBe(null);
    });

    test('тест синхронного экшена getOrdersAll.rejected', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.request).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });

    test('тест синхронного экшена getOrdersAll.fulfilled', () => {
      const nextState = userSlice(initialState, actions.fulfilled);
      expect(nextState.request).toBe(false);
      expect(nextState.error).toBe(null);
      expect(nextState.userOrders).toEqual(actions.fulfilled.payload);
    });
  });

  describe('тестирование асинхронного POST экшена registerUser', () => {
    const actions = {
      pending: {
        type: registerUser.pending.type,
        payload: undefined
      },
      rejected: {
        type: registerUser.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: registerUser.fulfilled.type,
        payload: { user: { name: 'someName', email: 'someEmail' } }
      }
    };

    test('тест синхронного экшена registerUser.pending', () => {
      const nextState = userSlice(initialState, actions.pending);
      expect(nextState.request).toBe(true);
      expect(nextState.error).toBe(null);
      expect(nextState.isAuthChecked).toBe(true);
      expect(nextState.isAuthenticated).toBe(false);
    });
    
    test('тест синхронного экшена registerUser.rejected', () => {
      const nextState = userSlice(initialState, actions.rejected);
      expect(nextState.request).toBe(false);
      expect(nextState.error).toBe(actions.rejected.error.message);
      expect(nextState.isAuthChecked).toBe(false);
    });
    
    test('тест синхронного экшена registerUser.fulfilled', () => {
      const nextState = userSlice(initialState, actions.fulfilled);
      expect(nextState.request).toBe(false);
      expect(nextState.error).toBe(null);
      expect(nextState.response).toBe(actions.fulfilled.payload.user);
      expect(nextState.userData).toBe(actions.fulfilled.payload.user);
      expect(nextState.isAuthChecked).toBe(false);
      expect(nextState.isAuthenticated).toBe(true);
    });
  });
  
  describe('тестирование асинхронного POST экшена loginUser', () => {
    const actions = {
      pending: {
        type: loginUser.pending.type,
        payload: undefined
      },
      rejected: {
        type: loginUser.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: loginUser.fulfilled.type,
        payload: { user: { name: 'someName', email: 'someEmail' } }
      }
    };

    test('тест синхронного экшена loginUser.pending', () => {
      const nextState = userSlice(initialState, actions.pending);
      expect(nextState.loginUserRequest).toBe(true);
      expect(nextState.isAuthChecked).toBe(true);
      expect(nextState.isAuthenticated).toBe(false);
      expect(nextState.error).toBe(null);
    });
    
    test('тест синхронного экшена loginUser.rejected', () => {
      const nextState = userSlice(initialState, actions.rejected);
      expect(nextState.isAuthChecked).toBe(false);
      expect(nextState.isAuthenticated).toBe(false);
      expect(nextState.loginUserRequest).toBe(false);
      expect(nextState.error).toBe(actions.rejected.error.message);
    });
    
    test('тест синхронного экшена loginUser.fulfilled', () => {
      const nextState = userSlice(initialState, actions.fulfilled);
      expect(nextState.isAuthChecked).toBe(false);
      expect(nextState.isAuthenticated).toBe(true);
      expect(nextState.loginUserRequest).toBe(false);
      expect(nextState.error).toBe(null);
      expect(nextState.userData).toBe(actions.fulfilled.payload.user);
    });
  });
  
  describe('тестирование асинхронного PATCH экшена updateUser', () => {
    const actions = {
      pending: {
        type: updateUser.pending.type,
        payload: undefined
      },
      rejected: {
        type: updateUser.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: updateUser.fulfilled.type,
        payload: { user: { name: 'someName', email: 'someEmail' } }
      }
    };

    test('тест синхронного экшена updateUser.pending', () => {
      const nextState = userSlice(initialState, actions.pending);
      expect(nextState.request).toBe(true);
      expect(nextState.error).toBe(null);
    });
    
    test('тест синхронного экшена updateUser.rejected', () => {
      const nextState = userSlice(initialState, actions.rejected);
      expect(nextState.request).toBe(false);
      expect(nextState.error).toBe(actions.rejected.error.message);
    });
    
    test('тест синхронного экшена updateUser.fulfilled', () => {
      const nextState = userSlice(initialState, actions.fulfilled);
      expect(nextState.request).toBe(false);
      expect(nextState.error).toBe(null);
      expect(nextState.response).toBe(actions.fulfilled.payload.user);
    });
  });
  
  describe('тестирование асинхронного POST экшена logoutUser', () => {
    const actions = {
      pending: {
        type: logoutUser.pending.type,
        payload: undefined
      },
      rejected: {
        type: logoutUser.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: logoutUser.fulfilled.type,
        payload: undefined
      }
    };

    test('тест синхронного экшена logoutUser.pending', () => {
      const nextState = userSlice(initialState, actions.pending);
      expect(nextState.request).toBe(true);
      expect(nextState.isAuthChecked).toBe(true);
      expect(nextState.isAuthenticated).toBe(true);
      expect(nextState.error).toBe(null);
    });
    
    test('тест синхронного экшена logoutUser.rejected', () => {
      const nextState = userSlice(initialState, actions.rejected);
      expect(nextState.isAuthChecked).toBe(false);
      expect(nextState.isAuthenticated).toBe(true);
      expect(nextState.request).toBe(false);
      expect(nextState.error).toBe(actions.rejected.error.message);
    });
    
    test('тест синхронного экшена logoutUser.fulfilled', () => {
      const nextState = userSlice(initialState, actions.fulfilled);
      expect(nextState.isAuthChecked).toBe(false);
      expect(nextState.isAuthenticated).toBe(false);
      expect(nextState.request).toBe(false);
      expect(nextState.error).toBe(null);
      expect(nextState.userData).toBe(null);
    });
  });

  // Тесты для синхронных экшенов
  describe('тестирование синхронных экшенов', () => {
    test('resetError должен сбрасывать ошибку', () => {
      // Создаем состояние с ошибкой
      const stateWithError = {
        ...initialState,
        error: 'Some error message'
      };
      
      // Применяем экшен resetError
      const newState = userSlice(stateWithError, resetError());
      
      // Проверяем, что ошибка сброшена
      expect(newState.error).toBe(null);
    });
  });

  describe('тестирование последовательных операций', () => {
    test('должен корректно обрабатывать логин и выход пользователя', () => {
      let state = initialState;
      
      state = userSlice(state, {
        type: loginUser.pending.type,
        payload: undefined
      });
      expect(state.loginUserRequest).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
      
      const userData = { name: 'Test User', email: 'test@example.com' };
      state = userSlice(state, {
        type: loginUser.fulfilled.type,
        payload: { user: userData }
      });
      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.userData).toEqual(userData);
      
      const updatedUserData = { name: 'Updated User', email: 'test@example.com' };
      state = userSlice(state, {
        type: updateUser.fulfilled.type,
        payload: { user: updatedUserData }
      });
      expect(state.request).toBe(false);
      expect(state.response).toEqual(updatedUserData);
      
      state = userSlice(state, {
        type: logoutUser.pending.type,
        payload: undefined
      });
      expect(state.request).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(true);
      
      state = userSlice(state, {
        type: logoutUser.fulfilled.type,
        payload: undefined
      });
      expect(state.request).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.userData).toBe(null);
    });
  });
});
