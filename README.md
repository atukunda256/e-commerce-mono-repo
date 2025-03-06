# Sellhub E-commerce Platform

A monorepo e-commerce platform built with Next.js, tRPC, Turborepo, PostgreSQL, and DrizzleORM.

## Project Structure

This project uses a monorepo structure with the following applications:

- **Dashboard (Seller App)**: For managing products, orders, and customer interactions
- **Store (Customer App)**: The customer-facing store where users can browse products and make orders
- **Service**: A tRPC service that allows both apps to create, update, read, and delete products

## Features

### Dashboard App
- Login page (mock)
- Product management (CRUD operations)
- Responsive UI with Tailwind CSS

### Store App
- Product browsing
- Shopping cart functionality (in-memory)
- Order creation

### tRPC Service
- Product CRUD operations
- Order creation
- PostgreSQL database integration with DrizzleORM

## Tech Stack

- **NextJS**: For both web applications
- **tRPC**: For type-safe API calls
- **Turborepo**: For monorepo management
- **PostgreSQL**: For database
- **DrizzleORM**: For database operations
- **Docker Compose**: For running PostgreSQL
- **Tailwind CSS**: For styling

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Docker (for PostgreSQL)

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sellhub
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the PostgreSQL database:
   ```bash
   docker-compose up -d
   ```

4. Run database migrations:
   ```bash
   cd apps/service
   pnpm exec drizzle-kit push:pg
   ```

5. Start the development servers:
   ```bash
   pnpm dev
   ```

The applications will be available at:
- Dashboard App: http://localhost:3001
- Store App: http://localhost:3000

## Assumptions and Limitations

- Authentication is mocked for demonstration purposes
- Cart data is stored in memory and will be lost on page refresh
- The project uses a simple database schema focused on products and orders

## Future Improvements

- Add real authentication
- Implement persistent cart storage
- Add order management in the dashboard
- Add user profiles and account management
- Implement product categories and search functionality
- Add payment processing

## Video Demo

[Link to video demonstration]
