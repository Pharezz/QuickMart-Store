Quickmart — Store App

One-liner: Full-stack e-commerce demo with product listing, cart, checkout, admin store management: add, delete, update products.

Live demo: https://quick-mart-store.vercel.app
Repo: https://github.com/Pharezz/QuickMart-Store.git




Tech

React 

Next.js

MongoDB (Atlas)

Vercel

GitHub Actions for CI


Features

Product listing, search,

Cart, checkout

User authentication (NextAuth)

Admin product CRUD (protected routes)


Quickstart (3 commands)
git clone https://github.com/pharezz/QuickMart-Store.git
cd quickmart-store
cp .env.example .env
npm install && npm run dev


Architecture

Frontend (Next.js) calls backend API routes for products, cart, auth, and orders.

Backend uses Next.js API routes and MongoDB, exposes /api/products, /api/auth, /api/orders.

Considered trade-offs: serverless vs traditional server (chose serverless for easier deployment/demo).


Tests & CI

npm test runs unit tests for backend and frontend components where applicable.

GitHub Actions workflow runs lint, tests, and builds on every PR.


Learnings & notes

Implemented optimistic UI updates in the cart to improve UX.


License

MIT — see LICENSE file.

Contact

Found a bug? Open an issue or contact oguegbuikechukwu@gmail.com.
