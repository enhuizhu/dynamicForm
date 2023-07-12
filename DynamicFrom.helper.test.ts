/* eslint-disable @typescript-eslint/no-explicit-any */
import { shouldShowField } from './DynamicForm.helper';

describe('form helper', () => {
  it('shouldShowField when value is not array', () => {
    const formData = {
      a: 1,
      b: 2,
      c: true,
      d: false,
      f: 'test',
    };
    let dependencies: any = {
      a: 1,
    };

    expect(shouldShowField(formData, dependencies)).toBe(true);

    dependencies = {
      a: 2,
    };

    expect(shouldShowField(formData, dependencies)).toBe(false);

    dependencies = {
      a: 1,
      b: 2,
    };

    expect(shouldShowField(formData, dependencies)).toBe(true);

    dependencies = {
      a: 1,
      b: 3,
    };

    expect(shouldShowField(formData, dependencies)).toBe(false);

  });

  it('shouldShowField when value is array', () => {
    const formData = {
      a: 1,
      b: 2,
      c: true,
      d: false,
      f: ['test'],
    };
    const dependencies: any = {
      f: ['test'],
    };

    expect(shouldShowField(formData, dependencies)).toBeTruthy();
  });

  it('shouldShowField when value is string, value in config is array', () => {
    const formData = {
      a: 1,
      b: 2,
      c: true,
      d: false,
      f: 'test',
    };
    const dependencies: any = {
      f: ['test', 'test1'],
    };

    expect(shouldShowField(formData, dependencies)).toBeTruthy();
  })

});