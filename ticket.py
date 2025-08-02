from src.models.user import db
from datetime import datetime

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='open')  # open, in_progress, resolved, closed
    priority = db.Column(db.String(10), nullable=False, default='medium')  # low, medium, high, urgent
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    resolved_at = db.Column(db.DateTime)
    
    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    assigned_to = db.Column(db.Integer, db.ForeignKey('user.id'))
    
    # Relationships
    comments = db.relationship('Comment', backref='ticket', lazy=True, cascade='all, delete-orphan')
    attachments = db.relationship('Attachment', backref='ticket', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Ticket {self.id}: {self.subject}>'

    def to_dict(self, include_comments=False):
        result = {
            'id': self.id,
            'subject': self.subject,
            'description': self.description,
            'status': self.status,
            'priority': self.priority,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'resolved_at': self.resolved_at.isoformat() if self.resolved_at else None,
            'user_id': self.user_id,
            'category_id': self.category_id,
            'assigned_to': self.assigned_to,
            'user': self.user.to_dict() if self.user else None,
            'category': self.category.to_dict() if self.category else None,
            'assigned_agent': self.assigned_agent.to_dict() if self.assigned_agent else None,
            'comment_count': len(self.comments) if self.comments else 0
        }
        
        if include_comments:
            result['comments'] = [comment.to_dict() for comment in self.comments]
            result['attachments'] = [attachment.to_dict() for attachment in self.attachments]
        
        return result

