# Pinklet

Pinklet is a full-stack gift customization platform with a React frontend and a .NET API backend.

## Repository Layout

- `frontend/` - React + Vite app
- `backend/` - ASP.NET Core API
- `.gitignore` - repo-wide ignore rules for generated files and local secrets

## Frontend Structure

- `frontend/src/Components/` - reusable UI and feature components
- `frontend/src/Pages/` - route-level pages
- `frontend/src/config/` - runtime config such as API helpers
- `frontend/src/assets/` - static images and media
- `frontend/src/Styles/` - shared styling files

## Backend Structure

- `backend/Controllers/` - API endpoints
- `backend/Models/` - entity and DTO classes
- `backend/data/` - database context
- `backend/Services/` - infrastructure services such as Cloudinary integration
- `backend/Migrations/` - EF Core migration history

## Environment Files

Use the example files as the source of truth for local setup:

- `backend/.env.example`
- `frontend/.env.example`

## Local Run Notes

- The frontend points to `VITE_API_BASE_URL`.
- The backend loads values from `backend/.env` at startup.
- `pinklet.db` is created locally for the backend and is ignored by git.

## Current Status

The frontend builds successfully. The backend code is structured to start with local configuration, but you still need a machine with the .NET SDK installed to run it.

