web: cd backend && gunicorn --bind 0.0.0.0:$PORT --workers 4 --threads 2 app:app
release: cd backend && python -c "from app import app, db; app.app_context().push(); db.create_all()"
