const url = require('url');

const RequestPool = require('./requestPool');

const pool = new RequestPool();

module.exports = {
  handleRequests: (req, res) => {
    const { method, url: userUrl } = req;
    const { pathname, query } = url.parse(userUrl);

    let field, value;

    if (query) {
      field = query.split('=')[0];
      value = query.split('=')[1];
    }

    pool.add(req);
    res.writeHead(200);

    switch(`${pathname}-${method}`) {
      case '/requests-GET':
        console.log('/requests-GET');
       
        res.end(
          JSON.stringify(pool.get(+value))
        );
        break;

      case '/requests-DELETE':
        console.log('/requests-DELETE');

        if (field !== 'id' && !value) {
          res.writeHead(404);
          res.end('Invalid id');
        }

        res.end(
          JSON.stringify(pool.delete(+value))
        );
        break;

      default:
        console.log('Not found');
        res.writeHead(404);
        res.end('Not found');
    }

    req.on('error', err => {
      console.error(err);
    })
  },
}

// switch (path) {
//   case '/magic':
//     res.writeHead(404)
//     res.end('Route is not defined. Try another one');
//     break;
//   default:
//     fs.readFile('./static/index.html', (err, data) => {
//       if (err) {
//         console.error(err);
//         res.writeHead(404);
//         res.end('File not found');

//         return;
//       }

//       res.writeHead(200, {
//         'Content-Type': 'text/html',
//       });
//       res.end(data);
//     });
// }