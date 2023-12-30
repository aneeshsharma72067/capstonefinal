from flask import Flask
from flask_cors import CORS
from config import Config
from .models import db
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)


# importing blueprints
from app.blueprints.activity import activity


# register blueprint
app.register_blueprint(activity)

# if __name__ == '__main__':
# app.run(debug=True)

