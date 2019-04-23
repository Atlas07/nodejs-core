const RequestPool = require('../src/requestPool');

it('should create instance of RequestPool', () => {
  const pool = new RequestPool();

  expect(pool.add).toBeDefined();
  expect(pool.get).toBeDefined();
  expect(pool.delete).toBeDefined();
  expect(pool.id).toBe(0);
  expect(pool.pool).toEqual([]);
});

describe('add method', () => {
  it('should add new item to pool', () => {
    const pool = new RequestPool();
    const mockRequest = {
      method: "GET",
      url: "/requests",
      headers: {
          host: "localhost:7000",
          "user-agent": "PostmanRuntime/7.6.1"
      },
      date: "",
      id: 0,
    };

    pool.add(mockRequest);

    const result = pool.get();
    result[0].date = '';

    expect(result).toMatchObject([mockRequest]);
  });
});

describe('get method', () => {
  it('should get all requests', () => {
    const pool = new RequestPool();
    const result = pool.get();
    
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });
  
  it('should get request by id', () => {
    const pool = new RequestPool();
    const mockRequest = {
      method: "GET",
      url: "/requests",
      headers: {
          host: "localhost:7000",
          "user-agent": "PostmanRuntime/7.6.1"
      },
      date: "",
      id: 0
    };
  
    pool.add(mockRequest);
  
    const result = {
      ...pool.get(0),
      date: "",
    }
  
    expect(result).toMatchObject(mockRequest);
    expect(pool.get().length).toBe(1);
  });
});

describe('delete method', () => {
  it('should delete request by id', () => {
    const pool = new RequestPool();
    const mockRequest = {
      method: "GET",
      url: "/requests",
      headers: {
          host: "localhost:7000",
          "user-agent": "PostmanRuntime/7.6.1"
      },
      date: "",
      id: 0,
    };

    pool.add(mockRequest);

    const deletedItem = pool.delete(0);
    const result = pool.get();
    deletedItem.date = ''; // for mock case

    expect(deletedItem).toMatchObject(mockRequest);
    expect(result).toEqual([]);
  });

  it('should return warning if invalid id prodided', () => {
    const pool = new RequestPool();
    const stringId = pool.delete('id');
    const falseId = pool.delete(false);

    const warning = 'Not found';

    expect(stringId).toBe(warning);
    expect(falseId).toBe(warning);
  })
});

describe

