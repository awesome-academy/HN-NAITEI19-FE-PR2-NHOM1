import jsonServer from 'json-server';
import auth from 'json-server-auth';

const server = jsonServer.create();
const router = jsonServer.router('./server/db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = new Date().toString();
  }
  // Continue to JSON Server router
  next();
});

server.get('/income/months', (req, res, next) => {
  const booking = router.db.getState().bookings;
  const income = booking.reduce((acc, cur) => {
    const date = new Date(cur.createdAt);
    const month = date.getMonth();
    const year = date.getFullYear();
    const currentYear = new Date().getFullYear();
    if (year != currentYear) return acc;
    if (cur.status === 1) acc[month] += cur.total;
    return acc;
  }, Array(12).fill(0));

  res.json(income);
});

server.get('/income/today', (req, res, next) => {
  const booking = router.db.getState().bookings;
  const incomeToday = booking.reduce((total, cur) => {
    const date = new Date(cur.createdAt);
    const year = date.getFullYear();
    const day = date.getDay();
    const month = date.getMonth();
    const currentDay = new Date();
    if (
      day === currentDay.getDay() &&
      month === currentDay.getMonth() &&
      year === currentDay.getFullYear() &&
      cur.status === 1
    )
      total += cur.total;
    return total;
  }, 0);

  res.json(incomeToday);
});

server.db = router.db;

// Use default router
server.use(auth);
server.use(router);
server.listen(8000, () => {
  console.log('JSON Server is running');
});
