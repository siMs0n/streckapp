import { expect, test } from 'vitest';
import { parseCreatePurchaseDto } from './create-purchase';

test('Parsing a valid object works', () => {
  expect(
    parseCreatePurchaseDto({
      quantity: 2,
      product: 'product123',
      person: '123',
      instance: '123',
    }),
  ).toStrictEqual({
    quantity: 2,
    product: 'product123',
    person: '123',
    instance: '123',
  });
});

test('Parsing a invalid object throws an error', () => {
  expect(() =>
    parseCreatePurchaseDto({
      quantity: 100,
      person: '123',
      instance: '123',
    }),
  ).toThrowError('Required');
});

test('Parsing exceeding max amount throws an error', () => {
  expect(() =>
    parseCreatePurchaseDto({
      quantity: 100,
      product: 'product123',
      person: '123',
      instance: '123',
    }),
  ).toThrowError('too_big');
});
