import {Container} from '../../../container/Container';

describe('Container tests', () => {
  it('should register an object and return it', async () => {
    class TestObject {}

    const container = new Container();
    const testTag = 'test';

    container.register(new TestObject(), 'test', [testTag]);

    expect(container.get('test')).toBeInstanceOf(TestObject);
    expect(container.getByTags([testTag]).length).toBe(1);
    expect(container.getByTags([testTag])[0]).toBeInstanceOf(TestObject);
  });

  it('should register multiple objects and return it by tag', async () => {
    class TestObject {}

    const container = new Container();
    const testName1 = 'test1';
    const testName2 = 'test2';
    const testTag = 'test';

    container.register(new TestObject(), testName1, [testTag]);
    container.register(new TestObject(), testName2, [testTag]);

    expect(container.get(testName1)).toBeInstanceOf(TestObject);
    expect(container.get(testName2)).toBeInstanceOf(TestObject);
    expect(container.getByTags([testTag]).length).toBe(2);
    expect(container.getByTags([testTag])[0]).toBeInstanceOf(TestObject);
    expect(container.getByTags([testTag])[1]).toBeInstanceOf(TestObject);
  });

  it('should override an existing object in the container with a new one with the same name', async () => {
    class TestObject1 {}

    class TestObject2 {}

    const container = new Container();
    const testName = 'test';
    const testTag = 'test';

    container.register(new TestObject1(), testName, [testTag]);
    container.register(new TestObject2(), testName, [testTag]);

    expect(container.get(testName)).toBeInstanceOf(TestObject2);
  });
});
