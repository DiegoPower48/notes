#!/bin/bash

function info() {
  echo -e "\033[1;34m[INFO]\033[0m $1"
}
function error() {
  echo -e "\033[1;31m[ERROR]\033[0m $1"
}

info "🚀 Iniciando setup de la aplicación..."

# Darse permisos a sí mismo
info "Otorgando permisos de ejecución al script..."
chmod +x "$0"

# 1. Instalar Node.js LTS
info "Instalando Node.js LTS..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v && npm -v

# 2. Instalar MySQL
info "Instalando MySQL Server..."
sudo apt-get update
sudo apt-get install -y mysql-server

info "Iniciando servicio de MySQL..."
sudo systemctl enable mysql
sudo systemctl start mysql

# 3. Crear base de datos y usuario
info "Creando base de datos y usuario para desarrollo..."

sudo mysql <<EOF
CREATE DATABASE IF NOT EXISTS notesdb;
CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EOF

# 4. Backend
info "Instalando dependencias del backend..."
cd backend || { error "No se encontró la carpeta backend"; exit 1; }
npm install

# Crear archivo .env si no existe
if [ ! -f .env ]; then
  info "Creando archivo backend/.env..."
  cat <<EOF > .env
DATABASE_URL="mysql://user:1234@localhost:3306/notesdb"
JWT_SECRET=secreto
JWT_TIME=30
EOF
fi

# Ejecutar migraciones
info "🏗️ Ejecutando migraciones..."
npx prisma migrate dev --name create_tables_user_note || { error "Fallo al ejecutar migraciones"; exit 1; }

# Ejecutar seeders
info "🌱 Ejecutando seeders..."
npm run seed || { error "Fallo al ejecutar seeders"; exit 1; }

cd ..

# 5. Frontend
info "Instalando dependencias del frontend..."
cd frontend || { error "No se encontró la carpeta frontend"; exit 1; }
npm install

# Crear archivo .env si no existe
if [ ! -f .env.local ]; then
  info "Creando archivo frontend/.env.local..."
  cat <<EOF > .env.local
NEXT_PUBLIC_API_URL=http://localhost:3005
EOF
fi

cd ..

# 6. Agregar alias de arranque automático (si no existe)
if ! grep -q "start-notes" ~/.bashrc; then
  info "🔗 Añadiendo alias start-notes a ~/.bashrc"
  echo "alias start-notes='cd ~/notes/backend && npm run build && npm run start:prod & cd ~/notes/frontend && npm run build && npm start'" >> ~/.bashrc
fi

# 7. Recargar bashrc para que el alias funcione de inmediato
info "🔄 Recargando ~/.bashrc..."
source ~/.bashrc

# 8. Ejecutar alias
info "🚀 Iniciando backend y frontend con alias start-notes..."
start-notes

info "✅ Instalación y ejecución completa."
