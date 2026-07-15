# Deployment Guide

This guide covers deploying the College Food Choices Analytics application with Flask backend to various platforms.

## Table of Contents

1. [Local Development](#local-development)
2. [Docker Local](#docker-local)
3. [Heroku](#heroku)
4. [Railway](#railway)
5. [AWS](#aws)
6. [Google Cloud](#google-cloud)
7. [Production Checklist](#production-checklist)

## Local Development

### Quick Start

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Initialize database
python -c "from app import app, db; app.app_context().push(); db.create_all()"

# Run development server
python app.py
```

Visit `http://localhost:5000`

### Database Setup

For local PostgreSQL:

```bash
# Create database
createdb food_choices_db

# Update .env
DATABASE_URL=postgresql://localhost/food_choices_db
```

## Docker Local

### Using Docker Compose

```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f web

# Stop services
docker-compose down

# Reset database
docker-compose down -v
docker-compose up -d
```

Services:
- **API**: http://localhost:5000
- **Database**: localhost:5432

## Heroku

### Prerequisites

```bash
# Install Heroku CLI
brew install heroku  # macOS
# Or download from https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login
```

### Deployment Steps

1. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

2. **Add PostgreSQL Add-on**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev -a your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set SECRET_KEY=your-secret-key-here -a your-app-name
   heroku config:set FLASK_ENV=production -a your-app-name
   ```

4. **Deploy**
   ```bash
   git push heroku flask-backend:main
   ```

5. **Verify Deployment**
   ```bash
   heroku logs --tail -a your-app-name
   heroku open -a your-app-name
   ```

### Heroku Tips

- Database URL is automatically set by Heroku
- Use `heroku run bash` for remote shell
- View logs: `heroku logs --tail`
- Scale dynos: `heroku ps:scale web=2`

## Railway

### Prerequisites

- GitHub account connected to Railway
- Railway account at https://railway.app

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git push origin flask-backend
   ```

2. **Create Railway Project**
   - Go to https://railway.app/dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize and select your repository

3. **Configure Services**
   - Add PostgreSQL plugin
   - Configure environment variables
   - Set start command: `cd backend && gunicorn -w 4 -b 0.0.0.0:$PORT app:app`

4. **Deploy**
   - Railway auto-deploys on push

### Railway Configuration

Environment variables in `railway.toml`:

```toml
[build]
builder = "dockerfile"
dockerfilePath = "./backend/Dockerfile"

[deploy]
startCommand = "cd backend && gunicorn -w 4 -b 0.0.0.0:$PORT app:app"
```

## AWS

### Using Elastic Beanstalk

1. **Install AWS CLI and EB CLI**
   ```bash
   pip install awsebcli
   ```

2. **Initialize Elastic Beanstalk**
   ```bash
   eb init -p python-3.11 food-choices-api
   ```

3. **Create Environment**
   ```bash
   eb create production-env
   ```

4. **Configure Environment Variables**
   ```bash
   eb setenv SECRET_KEY=your-secret-key \
             FLASK_ENV=production \
             DATABASE_URL=postgresql://...
   ```

5. **Deploy**
   ```bash
   eb deploy
   ```

### Using ECS + RDS

See AWS documentation for containerized deployment with managed database.

## Google Cloud

### Using Cloud Run

1. **Create GCP Project**
   ```bash
   gcloud projects create food-choices-api
   ```

2. **Build and Push Docker Image**
   ```bash
   gcloud builds submit --tag gcr.io/food-choices-api/backend ./backend
   ```

3. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy food-choices-api \
     --image gcr.io/food-choices-api/backend \
     --platform managed \
     --region us-central1 \
     --set-env-vars DATABASE_URL=postgresql://...,SECRET_KEY=...
   ```

4. **Set Up Cloud SQL**
   - Create PostgreSQL instance
   - Update DATABASE_URL connection

### Using App Engine

```bash
# Create app.yaml
echo "
runtime: python311
env: standard

env_variables:
  FLASK_ENV: production
  SECRET_KEY: YOUR_SECRET_KEY
" > backend/app.yaml

# Deploy
gcloud app deploy backend/app.yaml
```

## Production Checklist

### Security

- [ ] Change `SECRET_KEY` to a strong random value
- [ ] Set `DEBUG=False` in production
- [ ] Use HTTPS only
- [ ] Enable CORS selectively
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets
- [ ] Validate all inputs
- [ ] Enable database encryption
- [ ] Set up Web Application Firewall (WAF)

### Performance

- [ ] Enable database connection pooling
- [ ] Add database indexes for frequently queried columns
- [ ] Set up caching (Redis)
- [ ] Enable gzip compression
- [ ] Use CDN for static files
- [ ] Optimize database queries
- [ ] Configure worker count: `workers = (2 × CPU) + 1`

### Monitoring & Logging

- [ ] Set up error tracking (Sentry)
- [ ] Enable application logging
- [ ] Set up health checks
- [ ] Monitor resource usage
- [ ] Set up alerts
- [ ] Enable database monitoring
- [ ] Configure log retention

### Database

- [ ] Automated backups enabled
- [ ] Test backup restoration
- [ ] Database replication for HA
- [ ] Regular VACUUM and ANALYZE
- [ ] Monitor slow queries
- [ ] Connection limits configured
- [ ] SSL connections enabled

### Deployment

- [ ] CI/CD pipeline configured
- [ ] Automated tests passing
- [ ] Database migrations automated
- [ ] Rollback plan documented
- [ ] Staging environment matches production
- [ ] Load testing completed
- [ ] Documentation updated

### Maintenance

- [ ] Dependency updates scheduled
- [ ] Security patches applied
- [ ] Regular security audits
- [ ] Documentation maintained
- [ ] Disaster recovery plan
- [ ] On-call rotation

## Scaling

### Horizontal Scaling

```bash
# Heroku
heroku ps:scale web=3

# Docker Compose with load balancer
docker-compose scale web=3
```

### Vertical Scaling

- Increase machine size
- Increase worker count
- Add more database connections

### Database Optimization

- Read replicas for analytics queries
- Partitioning for large tables
- Materialized views for dashboards
- Archive old data

## Rollback Procedures

### Heroku
```bash
heroku releases
heroku rollback v10
```

### Git-based
```bash
git revert <commit-hash>
git push
```

## Monitoring Commands

```bash
# Heroku
heroku logs --tail
heroku metrics dyno

# Docker
docker-compose logs -f web
docker stats

# Database
psql -d food_choices_db -c "SELECT * FROM pg_stat_statements;"
```

## Troubleshooting

### Common Issues

**Port already in use**
```bash
lsof -i :5000
kill -9 <PID>
```

**Database connection failed**
- Verify DATABASE_URL
- Check firewall rules
- Ensure database is running

**Out of memory**
- Increase dynos/instances
- Optimize queries
- Enable caching

**Slow queries**
- Add database indexes
- Use EXPLAIN to analyze
- Consider query optimization

## Support

For deployment-specific issues, refer to:
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Gunicorn Documentation](https://gunicorn.org/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- Platform-specific documentation (Heroku, Railway, AWS, GCP)
