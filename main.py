import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail
from datetime import timedelta

# Import models
from src.models.user import db
from src.models.category import Category
from src.models.ticket import Ticket
from src.models.comment import Comment
from src.models.attachment import Attachment

# Import routes
from src.routes.user import user_bp
from src.routes.auth import auth_bp
from src.routes.ticket import ticket_bp
from src.routes.category import category_bp
from src.routes.comment import comment_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))

# Configuration
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Email configuration (for notifications)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME', '')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD', '')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER', 'noreply@quickdesk.com')

# Initialize extensions
jwt = JWTManager(app)
mail = Mail(app)
CORS(app, origins="*")

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(ticket_bp, url_prefix='/api')
app.register_blueprint(category_bp, url_prefix='/api')
app.register_blueprint(comment_bp, url_prefix='/api')

# Initialize database
db.init_app(app)
with app.app_context():
    db.create_all()
    
    # Create default categories if they don't exist
    if not Category.query.first():
        default_categories = [
            Category(name='Technical Support', description='Technical issues and bugs', color='#dc3545'),
            Category(name='General Inquiry', description='General questions and information', color='#007bff'),
            Category(name='Feature Request', description='New feature suggestions', color='#28a745'),
            Category(name='Account Issues', description='Account and billing related issues', color='#ffc107'),
            Category(name='Other', description='Other issues not covered above', color='#6c757d')
        ]
        for category in default_categories:
            db.session.add(category)
        
        # Create default admin user
        from src.models.user import User
        admin = User(username='admin', email='admin@quickdesk.com', role='admin')
        admin.set_password('admin123')
        db.session.add(admin)
        
        db.session.commit()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
            return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
