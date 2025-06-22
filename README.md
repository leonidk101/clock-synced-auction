# Auction System

## Architecture Overview

The repository demonstrates how to maintain global consistency and real-time updates across multiple backend nodes using advanced synchronization algorithms.

- **Frontend:** Vue.js app displays auction items, current highest bids, and bid history in a globally consistent order.
- **Backend:** Multiple Node.js/TypeScript instances simulate separate bidding servers.
- **Database:** PostgreSQL is used by each backend node to persist bids.
- **Synchronization Mechanisms:** Implements Clock-Bound Wait, Hybrid Clock, and Lamport Clock algorithms for distributed consistency.

## High-Level System Design

### Backend

- Each Node.js instance acts as a bidding server and maintains:
  - A Lamport Clock (logical counter per node)
  - A Hybrid Clock (physical time + logical counter)
  - A pending bid queue with Clock-Bound Wait logic
- Servers communicate via an internal peer-to-peer messaging layer (WebSocket or gRPC) to exchange bid metadata (e.g., bid timestamp, logical clock, etc.)

### Frontend

- Real-time dashboard (using WebSocket or Server-Sent Events):
  - Live bids in consistent order
  - Per-item bid history
  - Status per node

---

## Database Migrations

This project uses [dbMate](https://github.com/amacneil/dbmate) for database schema migrations.

- Migration files are located in `apps/server/migrations/`.
- Migrations are written in SQL and follow the dbMate format.

### Running Migrations

**With Docker Compose:**

- To run migrations as a one-off job:
  ```sh
  docker compose --profile migrations up dbmate
  ```
- By default, migrations are not run automatically on startup for faster development cycles.

### Configuration

- The database connection is configured via environment variables in `apps/server/.env`.
- Example connection string:
  ```
  DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}?sslmode=disable
  ```

---

This project demonstrates distributed systems concepts (logical/physical clocks, distributed queues, and real-time updates) in a modern web application context.
