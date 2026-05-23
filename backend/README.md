# Pinklet Backend

ASP.NET Core API for Pinklet.

## Layout

- `Controllers/` - API endpoints
- `Models/` - entity and DTO classes
- `data/` - database context
- `Services/` - infrastructure services
- `Migrations/` - EF Core migrations
- `Program.cs` - app startup
- `.env.example` - sample runtime config

## Run

1. Copy `.env.example` to `.env`.
2. Set the local connection string and secrets.
3. Run `dotnet restore`.
4. Run `dotnet run`.

## Notes

- The backend now lives directly in `backend/`.
- The old `pinklet/` nesting has been flattened away.
