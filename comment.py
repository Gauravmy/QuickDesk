from src.models.user import db
from datetime import datetime

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_internal = db.Column(db.Boolean, default=False)  # Internal notes for agents/admins
    
    # Foreign Keys
    ticket_id = db.Column(db.Integer, db.ForeignKey('ticket.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<Comment {self.id} on Ticket {self.ticket_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'is_internal': self.is_internal,
            'ticket_id': self.ticket_id,
            'user_id': self.user_id,
            'user': self.user.to_dict() if self.user else None
        }

