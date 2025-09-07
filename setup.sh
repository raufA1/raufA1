#!/bin/bash

echo "🚀 Rauf Alizada - Profile Setup Script"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    print_error "Python3 is not installed. Please install Python3 first."
    exit 1
fi

print_status "Python3 found"

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

print_status "Git found"

# Create virtual environment (optional)
read -p "Do you want to create a Python virtual environment? (y/n): " create_venv
if [[ $create_venv =~ ^[Yy]$ ]]; then
    print_info "Creating Python virtual environment..."
    python3 -m venv venv
    source venv/bin/activate
    print_status "Virtual environment created and activated"
fi

# Install Python dependencies (if requirements.txt exists)
if [ -f "requirements.txt" ]; then
    print_info "Installing Python dependencies..."
    pip3 install -r requirements.txt
    print_status "Python dependencies installed"
else
    print_info "Installing basic dependencies..."
    pip3 install requests gitpython
    print_status "Basic dependencies installed"
fi

# Make scripts executable
print_info "Making scripts executable..."
chmod +x scripts/*.py
print_status "Scripts are now executable"

# Generate initial README
print_info "Generating initial README..."
python3 scripts/generate-readme.py
print_status "README generated"

# Update stats
print_info "Updating statistics..."
python3 scripts/update-stats.py
print_status "Statistics updated"

# Set up git hooks (optional)
read -p "Do you want to set up git hooks for automatic updates? (y/n): " setup_hooks
if [[ $setup_hooks =~ ^[Yy]$ ]]; then
    mkdir -p .git/hooks
    
    # Pre-commit hook
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "🔄 Running pre-commit updates..."
python3 scripts/update-stats.py
git add data/achievements.json
echo "✅ Stats updated"
EOF
    
    chmod +x .git/hooks/pre-commit
    print_status "Git hooks configured"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
print_info "Available commands:"
echo "  python3 scripts/generate-readme.py  - Generate README"
echo "  python3 scripts/update-stats.py     - Update statistics"
echo "  python3 scripts/update-profile.py   - Update profile"
echo ""
print_info "Next steps:"
echo "  1. Edit data/*.json files with your information"
echo "  2. Customize components/*.md files"
echo "  3. Run 'python3 scripts/generate-readme.py' to regenerate"
echo ""
print_status "Happy coding! 🚀"