from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash


# create instance of database
db= SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String, nullable=False)
    img_base64 = db.Column(db.String, nullable=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False )
    password = db.Column(db.String, nullable=False)
    created_on = db.Column(db.DateTime, default=datetime.utcnow())

    def __init__(self, full_name, img_base64, username, password, email):
        self.full_name = full_name
        self.email = email
        self.username = username
        self.img_base64=img_base64
        self.password = generate_password_hash(password)
        



