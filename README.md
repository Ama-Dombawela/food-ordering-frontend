# Food Ordering Frontend

A Vite + React + TypeScript frontend for a full-featured online food ordering platform. It communicates with the Food Ordering Backend REST API and handles all client-side logic including JWT-based authentication, role-based route protection, and a complete customer flow covering food browsing, cart management, order placement, and order history. Admin users get access to dedicated dashboards for managing foods, categories, orders, and users.

## Tech Stack

- React 19 + TypeScript
- React Router DOM 7
- Axios
- Tailwind CSS
- Vite
- lucide-react (icons)
- react-hot-toast (notifications)

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

## Configuration

The frontend connects to the backend at `http://localhost:8080` by default.
If your backend runs on a different port, update the base URL in:
`src/api/axiosInstance.ts`

---

## Features

- Sign In / Sign Up
- Browse and filter food items by category
- Cart management and order placement
- Order history and payment pages
- User profile page with account termination
- Admin dashboards for foods, categories, orders, and users
- JWT-based auth with protected and admin-only routes
- Role-based redirection after login (ADMIN → dashboard, CUSTOMER → menu)
- Toast notifications for user feedback
- Confirm modals for destructive actions

---

## Authentication & Test Credentials

### Admin Account
Admin accounts cannot be created via the Sign Up page. The admin account must be inserted directly into the database.

To log in as Admin use:

| Field | Value |
|-------|-------|
| Email | admin@gmail.com |
| Password | admin123 |

### Customer Account
To log in as a Customer, you can either:

**Option 1 — Create a new account:**
- Navigate to `/signup`
- Enter your name, email, password and confirm password
- All accounts created via Sign Up are automatically assigned the `CUSTOMER` role

**Option 2 — Use the Admin dashboard:**
- Sign in as Admin
- Go to the Users section in the Admin dashboard
- View all registered customer accounts and use any of their emails to log in

> All new accounts registered through Sign Up are `CUSTOMER` accounts by default.

---

## Role-Based Access

| Feature | CUSTOMER | ADMIN |
|---------|----------|-------|
| Browse menu | ✅ | ✅ |
| Add to cart | ✅ | ❌ |
| Place orders | ✅ | ❌ |
| View order history | ✅ | ✅ |
| User profile | ✅ | ❌ |
| Manage foods | ❌ | ✅ |
| Manage categories | ❌ | ✅ |
| Manage users | ❌ | ✅ |
| Manage orders | ❌ | ✅ |

---

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
|   |-- assets/
|   |   |-- Home/
|   |   |-- Landing/
|   |-- components/
|   |   |-- admin/
|   |   |   |-- AdminCategoryCard.tsx
|   |   |   |-- AdminFoodCard.tsx
|   |   |   |-- AdminOrderCard.tsx
|   |   |   |-- AdminUserCard.tsx
|   |   |   `-- index.ts
|   |   |-- auth/
|   |   |   |-- SignInForm.tsx
|   |   |   |-- SignUpForm.tsx
|   |   |   `-- index.ts
|   |   |-- cart/
|   |   |   |-- CartItem.tsx
|   |   |   `-- index.ts
|   |   |-- common/
|   |   |   |-- ConfirmModal.tsx
|   |   |   |-- Footer.tsx
|   |   |   |-- Modal.tsx
|   |   |   |-- Navbar.tsx
|   |   |   |-- Sidebar.tsx
|   |   |   `-- Spinner.tsx
|   |   |-- food/
|   |   |   |-- FoodCard.tsx
|   |   |   |-- FoodFilter.tsx
|   |   |   `-- index.ts
|   |   |-- icons/
|   |   |-- layout/
|   |   |   |-- PageHeader.tsx
|   |   |   `-- index.ts
|   |   |-- order/
|   |   |   |-- OrderCard.tsx
|   |   |   `-- index.ts
|   |   |-- payment/
|   |   |   |-- PaymentSummary.tsx
|   |   |   `-- index.ts
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
|       |-- foodImage.ts
|       |-- formatCurrency.ts
|       |-- formatDate.ts
|       |-- formatStatus.ts
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