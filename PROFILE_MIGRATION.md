# Profile Feature - Database Migration Instructions

## Run the migration to add profile fields

To add the `location` and `avatar_url` fields to the database, run:

```bash
cd Final-Lumen
alembic upgrade head
```

This will add the following fields to both `users_consumer` and `users_business` tables:
- `location` (String, nullable)
- `avatar_url` (String, nullable)

## If you need to rollback:

```bash
alembic downgrade -1
```

## Restart the backend server after migration:

```bash
python main.py
```
