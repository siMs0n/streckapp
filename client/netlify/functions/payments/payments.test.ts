import { expect, test } from 'vitest';
import { parseCreatePaymentDto } from './create-payment.dto';

test('Parsing a valid object works', () => {
  expect(
    parseCreatePaymentDto({
      amount: 100,
      reference: 'ref123',
      person: '123',
      instance: '123',
    }),
  ).toStrictEqual({
    amount: 100,
    reference: 'ref123',
    person: '123',
    instance: '123',
  });
});

test('Parsing a invalid object throws an error', () => {
  expect(() =>
    parseCreatePaymentDto({
      amount: 100,
      person: '123',
      instance: '123',
    }),
  ).toThrowError('Required');
});

test('Parsing exceeding max amount throws an error', () => {
  expect(() =>
    parseCreatePaymentDto({
      amount: 1500,
      reference: 'ref123',
      person: '123',
      instance: '123',
    }),
  ).toThrowError('too_big');
});
