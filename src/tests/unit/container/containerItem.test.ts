import {ContainerItem} from '../../../container/ContainerItem';

describe('Container item tests', () => {
  it('should create a container item and return the right values', async () => {
    class TestObjectClass {}

    const testObject = new TestObjectClass();
    const testName = Symbol('test');
    const testTag = 'test';

    const containerItem = new ContainerItem(testObject, testName, [testTag]);

    expect(containerItem.object).toBeInstanceOf(TestObjectClass);
    expect(containerItem.name).toBe(testName);
    expect(containerItem.tags).toBeInstanceOf(Array);
    expect(containerItem.tags.length).toBe(1);
    expect(containerItem.tags[0]).toBe(testTag);
  });
});
