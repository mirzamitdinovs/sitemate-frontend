
---

### 2. **README for the Client**

```markdown
# Issue Tracker - Client

This is the frontend for the Issue Tracker application. It interacts with the backend server to perform CRUD operations on issues. The frontend is built using **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**.

## What I Did

- Set up a Next.js frontend with server-side rendering and API integration to handle issues (tasks).
- Created a reusable modal component for creating and editing issues using React's state and props.
- Integrated **SWR** for client-side data fetching, caching, and revalidation.
- Used **Tailwind CSS** for styling the components and modals.
- Implemented functionality for creating, reading, updating, and deleting issues.

## Technologies Used

- **Next.js**: React framework for building server-side rendered applications.
- **React**: JavaScript library for building user interfaces.
- **SWR**: Data fetching library for React with built-in caching and revalidation.
- **TypeScript**: Provides static typing to improve code quality and maintainability.
- **Tailwind CSS**: Utility-first CSS framework for styling the frontend.

## Environment Variables

Make sure to create a `.env.local` file in the root of the project with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
