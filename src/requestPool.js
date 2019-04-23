class RequestPool {
  constructor() {
    this.pool = [];
    this.id = 0;
  }

  add(request) {
    const { method, url, headers } = request;

    this.pool.push({
      method,
      url,
      headers: {
        host: headers.host,
        'user-agent': headers['user-agent'],
      },
      date: new Date(),
      id: this.id++,
    });
  }

  delete(id) {
    const deletedItem = this.pool.find(req => req.id === id);
    this.pool = this.pool.filter(req => req.id !== id);

    return !!deletedItem ? deletedItem : 'Not found'; 
  }

  get(id) {
    if (!id && id !== 0) {
      return this.pool;
    }

    const item = this.pool.find(req => req.id === id);
    return !!item ? item : null;
  }
}

module.exports = RequestPool;