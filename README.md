# Food Ordering Frontend

## Project Overview

Food Ordering Frontend is a Vite + React + TypeScript application for an online food ordering platform. It includes customer-facing browsing and checkout flows, authentication pages, and admin dashboards for managing foods, categories, orders, and users.


## Tech Stack

- React 19 + TypeScript
- React Router DOM 7
- Axios
- Tailwind CSS
- Vite

---

## Getting Started

### Prerequisites

- Node.js (LTS)
- npm

### Installation & Run

```bash
git clone https://github.com/Ama-Dombawela/food-ordering-frontend.git

cd food-ordering-frontend

npm install
npm run dev
```

The app will be available at `http://localhost:5173`

> Backend must be running at `http://localhost:8080`

---

## Features

- Sign in / Sign up / Forgot password
- Browse and filter food items
- Cart management and order placement
- Order history and payment pages
- User profile page
- Admin dashboards for foods, categories, orders, and users
- JWT-based auth with protected and admin-only routes


## Project Structure

```text
food-ordering-frontend/
|-- eslint.config.js
|-- index.html
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- public/
|-- README.md
|-- src/
|   |-- api/
|   |   |-- apiResponse.ts
|   |   |-- axiosInstance.ts
|   |-- App.css
|   |-- App.tsx
|   |-- components/
|   |   |-- admin/
|   |   |   |-- AdminCategoryCard.tsx
|   |   |   |-- AdminFoodCard.tsx
|   |   |   |-- AdminOrderCard.tsx
|   |   |   `-- AdminUserCard.tsx
|   |   |-- auth/
|   |   |   |-- SignInForm.tsx
|   |   |   `-- SignUpForm.tsx
|   |   |-- cart/
|   |   |   `-- CartItem.tsx
|   |   |-- common/
|   |   |   |-- Footer.tsx
|   |   |   |-- Modal.tsx
|   |   |   |-- Navbar.tsx
|   |   |   |-- Sidebar.tsx
|   |   |   `-- Spinner.tsx
|   |   |-- food/
|   |   |   |-- FoodCard.tsx
|   |   |   `-- FoodFilter.tsx
|   |   |-- layout/
|   |   |   `-- PageHeader.tsx
|   |   |-- order/
|   |   |   `-- OrderCard.tsx
|   |   |-- payment/
|   |   |   `-- PaymentSummary.tsx
|   |   |-- routes/
|   |   |   |-- AdminRoute.tsx
|   |   |   `-- ProtectedRoute.tsx
|   |   `-- ui/
|   |       |-- Badge.tsx
|   |       |-- Button.tsx
|   |       |-- Card.tsx
|   |       |-- FormField.tsx
|   |       |-- Input.tsx
|   |       |-- Modal.tsx
|   |       |-- Spinner.tsx
|   |       |-- Table.tsx
|   |       `-- index.ts
|   |-- constants/
|   |   |-- apiUrls.ts
|   |   |-- index.ts
|   |   `-- roles.ts
|   |-- context/
|   |   `-- AuthContext.tsx
|   |-- hooks/
|   |   |-- index.ts
|   |   |-- useAuth.ts
|   |   |-- useCart.ts
|   |   |-- useCategories.ts
|   |   |-- useFoods.ts
|   |   |-- useForm.ts
|   |   `-- useOrders.ts
|   |-- index.css
|   |-- main.tsx
|   |-- pages/
|   |   |-- Landing.tsx
|   |   |-- admin/
|   |   |   |-- categories/
|   |   |   |   |-- AdminCategoryForm.tsx
|   |   |   |   `-- AdminCategoryList.tsx
|   |   |   |-- foods/
|   |   |   |   |-- AdminFoodForm.tsx
|   |   |   |   `-- AdminFoodList.tsx
|   |   |   |-- orders/
|   |   |   |   `-- AdminOrderList.tsx
|   |   |   `-- users/
|   |   |       `-- AdminUserList.tsx
|   |   |-- auth/
|   |   |   |-- ForgotPassword.tsx
|   |   |   |-- ResetPassword.tsx
|   |   |   |-- SignIn.tsx
|   |   |   `-- SignUp.tsx
|   |   |-- cart/
|   |   |   `-- Cart.tsx
|   |   |-- food/
|   |   |   |-- FoodDetail.tsx
|   |   |   `-- FoodList.tsx
|   |   |-- orders/
|   |   |   |-- OrderDetail.tsx
|   |   |   `-- OrderHistory.tsx
|   |   |-- payment/
|   |   |   `-- Payment.tsx
|   |   `-- user/
|   |       `-- UserProfile.tsx
|   |-- services/
|   |   |-- authService.ts
|   |   |-- cartService.ts
|   |   |-- categoryService.ts
|   |   |-- foodService.ts
|   |   |-- orderService.ts
|   |   |-- paymentService.ts
|   |   `-- userService.ts
|   |-- types/
|   |   |-- Cart.ts
|   |   |-- Category.ts
|   |   |-- FoodItem.ts
|   |   |-- index.ts
|   |   |-- Order.ts
|   |   |-- Payment.ts
|   |   `-- User.ts
|   `-- utils/
|       |-- formatCurrency.ts
|       |-- formatDate.ts
|       |-- index.ts
|       `-- validators.ts
|-- tailwind.config.js
|-- tsconfig.app.json
|-- tsconfig.json
|-- tsconfig.node.json
`-- vite.config.ts
```

## Backend

This frontend connects to the [Food Ordering Backend](https://github.com/Ama-Dombawela/food-ordering-backend.git) Spring Boot REST API.