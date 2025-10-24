# IdeaChain Hub

IdeaChain is a full-stack MERN application for discovering, forking, and evolving startup ideas with AI-assisted insights.

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT auth, OpenAI SDK, Cloudinary, SendGrid
- **Frontend:** React (Vite), React Router, React Query, TailwindCSS, React Flow, D3 utilities
- **Tooling:** ESLint, Jest, Nodemon, Tailwind CLI, PostCSS

## Project Structure

```
backend/
	config/, controllers/, middleware/, models/, routes/, utils/, cron/
frontend/
	src/components/, pages/, context/, hooks/, services/, styles/
```

## Getting Started

1. Clone the repository and install dependencies in both workspaces:

	 ```bash
	 cd backend && npm install
	 cd ../frontend && npm install
	 ```

2. Create `.env` files for backend and frontend (see the environment variables section).

3. Run development servers:

	 ```bash
	 # Backend (default on http://localhost:8000)
	 cd backend && npm run dev

	 # Frontend (default on http://localhost:5173)
	 cd frontend && npm run dev
	 ```

4. Access the app via `http://localhost:5173`.

## Environment Variables

Backend `.env`:

```
PORT=8000
MONGO_URI=<mongo connection string>
MONGO_DB_NAME=ideachain
JWT_SECRET=<secure secret>
OPENAI_API_KEY=<openai key>
CLOUDINARY_CLOUD_NAME=<cloud name>
CLOUDINARY_API_KEY=<api key>
CLOUDINARY_API_SECRET=<api secret>
SENDGRID_API_KEY=<sendgrid key>
SENDGRID_FROM_EMAIL=<sender address>
SENDGRID_TRENDS_RECIPIENT=<recipient address>
CORS_ORIGIN=http://localhost:5173
```

Frontend `.env`:

```
VITE_API_URL=http://localhost:8000/api/v1
```

## Available Scripts

### Backend

- `npm run dev` – start Express server with Nodemon
- `npm test` – execute Jest tests (to be implemented)
- `npm run lint` – run ESLint checks

### Frontend

- `npm run dev` – start Vite dev server
- `npm run build` – create production build
- `npm run preview` – preview production build
- `npm run lint` – run ESLint checks

## Deployment Targets

- **Backend:** Render (Node service)
- **Frontend:** Vercel (static deployment)
- **Database:** MongoDB Atlas (M0 free tier)

Ensure environment variables are configured on deployment platforms and network access rules allow the backend to reach MongoDB Atlas.

## Testing Roadmap

- Backend unit/integration tests using Jest + Supertest
- Frontend component tests with React Testing Library (future)
- End-to-end coverage with Playwright or Cypress

---

Happy building! Iterate on AI insights, chain visualisations, and community feedback to ship the next unicorn idea.