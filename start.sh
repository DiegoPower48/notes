
function info() {
  echo -e "\033[1;34m[INFO]\033[0m $1"
}
function error() {
  echo -e "\033[1;31m[ERROR]\033[0m $1"
}

info "🚀 Starting backend and frontend..."

# 1. Backend
cd backend || { error "Backend folder not found"; exit 1; }

info "🏗️ Building backend..."
npm run build || { error "Backend build failed"; exit 1; }

info "🚀 Starting backend in production mode..."
npm run start:prod &
BACKEND_PID=$!

cd ..

# 2. Frontend
cd frontend || { error "Frontend folder not found"; exit 1; }

info "🏗️ Building frontend..."
npm run build || { error "Frontend build failed"; exit 1; }

info "🚀 Starting frontend..."
npm start &
FRONTEND_PID=$!

cd ..

info "✅ All services started successfully."
info "📌 Backend PID: $BACKEND_PID, Frontend PID: $FRONTEND_PID"

# Keep the script alive to keep services running in foreground
wait $BACKEND_PID $FRONTEND_PID