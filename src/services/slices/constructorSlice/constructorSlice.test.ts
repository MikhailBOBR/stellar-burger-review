import constructorSlice, {
  addIngredient,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  orderBurger,
  removeIngredient
} from './constructorSlice';
import { expect, test, describe } from '@jest/globals';

describe('тестирование редьюсера constructorSlice', () => {
  describe('тестирование экшена addIngredient', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const expectedResult = {
      ...initialState,
      constructorItems: {
        bun: {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa0943',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-04-large.png'
          }
        ]
      }
    };

    test('добавление ингредиента в массив ingredients', () => {
      const newState = constructorSlice(
        initialState,
        addIngredient({
          _id: '643d69a5c3f7b9001cfa0943',
          name: 'Соус фирменный Space Sauce',
          type: 'sauce',
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-04-large.png'
        })
      );

      const ingredient = newState.constructorItems.ingredients[0];
      const expectedIngredient = expectedResult.constructorItems.ingredients[0];

      expect(ingredient).toEqual({
        ...expectedIngredient,
        id: expect.any(String)
      });
    });

    test('добавление булки в пустое поле', () => {
      const newState = constructorSlice(
        initialState,
        addIngredient({
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        })
      );

      const bun = newState.constructorItems.bun;
      const expectedBun = expectedResult.constructorItems.bun;

      expect(bun).toEqual({
        ...expectedBun,
        id: expect.any(String)
      });
    });

    test('добавление булки с заменой ранее добавленной', () => {
      const initialStateWithBun = {
        constructorItems: {
          bun: {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            id: 'its so funny =D',
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png'
          },
          ingredients: []
        },
        loading: false,
        orderRequest: false,
        orderModalData: null,
        error: null
      };
      const expectedResultForBuns = {
        ...initialStateWithBun,
        constructorItems: {
          bun: {
            _id: '643d69a5c3f7b9001cfa093d',
            name: 'Флюоресцентная булка R2-D3',
            type: 'bun',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/bun-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-01-large.png'
          },
          ingredients: []
        }
      };
      const newState = constructorSlice(
        initialStateWithBun,
        addIngredient({
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        })
      );

      const bun = newState.constructorItems.bun;
      const expectedBun = expectedResultForBuns.constructorItems.bun;

      expect(bun).toEqual({
        ...expectedBun,
        id: expect.any(String)
      });
    });
  });

  describe('тестирование экшена removeIngredient', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            id: 'funny',
            _id: '643d69a5c3f7b9001cfa0944',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-03-large.png'
          }
        ]
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const expectedResult = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: []
      }
    };

    test('удаление ингредиента из конструктора', () => {
      const newState = constructorSlice(
        initialState,
        removeIngredient('funny')
      );

      const recived = newState.constructorItems.ingredients;
      const expected = expectedResult.constructorItems.ingredients;

      expect(expected).toEqual(recived);
    });
  });

  describe('тестирование экшенов перемещения: moveIngredientUp & moveIngredientDown', () => {
    const initialState = {
      constructorItems: {
        bun: {
          id: 'funBun',
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        ingredients: [
          {
            id: 'funnyPig1',
            _id: '643d69a5c3f7b9001cfa0944',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-03-large.png'
          },
          {
            id: 'funnyPig2',
            _id: '643d69a5c3f7b9001cfa0946',
            name: 'Хрустящие минеральные кольца',
            type: 'main',
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
          },
          {
            id: 'funnyPig3',
            _id: '643d69a5c3f7b9001cfa0947',
            name: 'Плоды Фалленианского дерева',
            type: 'main',
            proteins: 20,
            fat: 5,
            carbohydrates: 55,
            calories: 77,
            price: 874,
            image: 'https://code.s3.yandex.net/react/code/sp_1.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
          }
        ]
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const expectedResult = {
      ...initialState,
      constructorItems: {
        bun: {
          id: 'funBun',
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        ingredients: [
          {
            id: 'funnyPig1',
            _id: '643d69a5c3f7b9001cfa0944',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-03-large.png'
          },
          {
            id: 'funnyPig3',
            _id: '643d69a5c3f7b9001cfa0947',
            name: 'Плоды Фалленианского дерева',
            type: 'main',
            proteins: 20,
            fat: 5,
            carbohydrates: 55,
            calories: 77,
            price: 874,
            image: 'https://code.s3.yandex.net/react/code/sp_1.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
          },
          {
            id: 'funnyPig2',
            _id: '643d69a5c3f7b9001cfa0946',
            name: 'Хрустящие минеральные кольца',
            type: 'main',
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
          }
        ]
      }
    };

    test('перемещение ингредиента на позицию выше', () => {
      const newState = constructorSlice(initialState, moveIngredientUp(2));
      const expected = expectedResult.constructorItems.ingredients;
      const recived = newState.constructorItems.ingredients;

      expect(expected).toEqual(recived);
    });
    test('перемещение ингредиента на позицию ниже', () => {
      const newState = constructorSlice(initialState, moveIngredientDown(1));
      const expected = expectedResult.constructorItems.ingredients;
      const recived = newState.constructorItems.ingredients;

      expect(expected).toEqual(recived);
    });
  });

  describe('тестирование асинхронного экшена orderBurger', () => {
    // Подготавливаем тестовые данные для асинхронного экшена
    const mockOrderResponse = {
      success: true,
      name: 'Test Burger',
      order: {
        _id: "12345",
        status: "done",
        name: "Test Burger",
        createdAt: "2023-01-01T12:00:00.000Z",
        updatedAt: "2023-01-01T12:01:00.000Z",
        number: 12345,
        ingredients: ["id1", "id2"]
      }
    };

    // Тестируем состояние при запуске запроса
    test('orderBurger.pending должен устанавливать orderRequest в true', () => {
      const action = {
        type: orderBurger.pending.type,
        payload: undefined
      };

      const state = constructorSlice(initialState, action);

      expect(state.orderRequest).toBe(true);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    // Тестируем состояние при успешном выполнении запроса
    test('orderBurger.fulfilled должен устанавливать orderRequest в false и сохранять данные заказа', () => {
      const action = {
        type: orderBurger.fulfilled.type,
        payload: mockOrderResponse
      };

      const state = constructorSlice(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.loading).toBe(false);
      expect(state.orderModalData).toEqual(mockOrderResponse.order);
      expect(state.error).toBe(null);
      // После успешного заказа корзина должна быть очищена
      expect(state.constructorItems.bun).toBe(null);
      expect(state.constructorItems.ingredients).toEqual([]);
    });

    // Тестируем состояние при ошибке запроса
    test('orderBurger.rejected должен устанавливать orderRequest в false и сохранять ошибку', () => {
      const errorMessage = 'Test error message';
      const action = {
        type: orderBurger.rejected.type,
        error: { message: errorMessage }
      };

      const state = constructorSlice(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('тестирование сброса состояния', () => {
    // Создаем состояние с заполненным заказом
    const filledState = {
      ...initialState,
      constructorItems: {
        bun: {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          id: 'test-bun-id',
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa0943',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            id: 'test-sauce-id',
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
          }
        ]
      },
      orderModalData: {
        _id: "12345",
        status: "done",
        name: "Test Burger",
        createdAt: "2023-01-01T12:00:00.000Z",
        updatedAt: "2023-01-01T12:01:00.000Z",
        number: 12345,
        ingredients: ["id1", "id2"]
      }
    };

    // Тестируем сброс всего состояния после закрытия модального окна заказа
    test('сброс состояния должен очищать orderModalData при закрытии модального окна', () => {
      const action = {
        type: 'constructorBurger/resetModal'
      };

      const state = constructorSlice(filledState, action);

      expect(state.orderModalData).toBe(null);
      // Остальное состояние должно остаться без изменений
      expect(state.constructorItems).toEqual(filledState.constructorItems);
    });

    // Тестируем очистку корзины
    test('сброс корзины должен очищать все ингредиенты', () => {
      // После анализа редьюсера, видим что прямого экшена для сброса корзины нет,
      // но он происходит после успешного заказа
      const action = {
        type: orderBurger.fulfilled.type,
        payload: {
          success: true,
          order: {
            _id: "12345",
            status: "done",
            name: "Test Burger",
            createdAt: "2023-01-01T12:00:00.000Z",
            updatedAt: "2023-01-01T12:01:00.000Z",
            number: 12345,
            ingredients: ["id1", "id2"]
          }
        }
      };

      const state = constructorSlice(filledState, action);

      expect(state.constructorItems.bun).toBe(null);
      expect(state.constructorItems.ingredients).toEqual([]);
      // Данные заказа должны быть обновлены
      expect(state.orderModalData).toEqual(action.payload.order);
    });
  });
});
