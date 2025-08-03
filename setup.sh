function info() {
  echo -e "\033[1;34m[INFO]\033[0m $1"
}
function error() {
  echo -e "\033[1;31m[ERROR]\033[0m $1"
}

info "🚀 Starting application setup..."


info "Granting execution permissions to the script..."
chmod +x "$0"

# 1. Install Node.js LTS
info "Installing Node.js LTS..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v && npm -v

# 2. Install MySQL
info "Installing MySQL Server..."
sudo apt-get update
sudo apt-get install -y mysql-server

info "Starting MySQL service..."
sudo systemctl enable mysql
sudo systemctl start mysql

# 3. Create database and user
info "Creating development database and user..."

sudo mysql <<EOF
CREATE DATABASE IF NOT EXISTS notesdb;
CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EOF

# 4. Backend
info "Installing backend dependencies..."
cd backend || { error "Backend folder not found"; exit 1; }
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  info "Creating backend/.env file..."
  cat <<EOF > .env
URL=3005
DATABASE_URL="mysql://user:1234@localhost:3306/notesdb"
JWT_SECRET=secreto
JWT_TIME=30
EOF
fi

# Run migrations
info "🏗️ Running migrations..."
npx prisma migrate dev --name create_tables_user_note || { error "Migration execution failed"; exit 1; }

# Run seeders
info "🌱 Running seeders..."
npm run seed || { error "Seeder execution failed"; exit 1; }

cd ..

# 5. Frontend
info "Installing frontend dependencies..."
cd frontend || { error "Frontend folder not found"; exit 1; }
npm install

# Create .env file if it doesn't exist
if [ ! -f .env.local ]; then
  info "Creating frontend/.env.local file..."
  cat <<EOF > .env.local
NEXT_PUBLIC_API_URL=http://localhost:3005
EOF
fi

cd ..


info "🚀 Starting backend and frontend..."

cd backend && npm run build && npm run start:prod & cd .. & cd frontend && npm run build && npm start

info "✅ Installation and execution completed."

