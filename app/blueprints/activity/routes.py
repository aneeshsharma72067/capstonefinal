from flask import request, jsonify
from app.blueprints.activity import activity

from app.models import db,User
# @activity.route('/')
@activity.route('/api/signup', methods=['POST'])  # Accepting POST requests
def signup():
    if request.method == 'POST':
        data = request.get_json()  # Retrieve JSON data from the request body
        if data:
            # Extract required data fields from the JSON
            username = data.get('username')
            img_base64 = data.get('imgBase64')
            full_name = data.get('fullName')
            password = data.get('password')
            email=data.get('email')
            print(username, full_name,email)
            # Process user data and save to the database

            user = User(full_name=full_name,img_base64=img_base64,username=username,password=password,email=email)
            db.session.add(user)
            db.session.commit()
            # Create a JSON response to send back
            response_data = {
                'success': True,
                'message': 'Signup successful',  # Optionally, include a success message
                # You can include more data in the response if needed
            }
            return jsonify(response_data), 200
        else:
            error_message = 'Invalid JSON data'
            return jsonify({'error': error_message}), 400
    
@activity.route('/api/')
def index():
    return jsonify({'msg':'hello'})

@activity.route('/api/getdata')
def get_all_users():
    try:
        # Query all rows from the User table
        users = User.query.all()

        # Convert the list of User objects to a list of dictionaries
        users_data = [
            {
                'id': user.id,
                'full_name': user.full_name,
                'img_base64': user.img_base64,
                'username': user.username,
                'email': user.email,
                'created_on': user.created_on.isoformat()  # Convert to ISO format for better readability
            }
            for user in users
        ]

        # Return the data as JSON
        return jsonify({'users': users_data}), 200

    except Exception as e:
        # Handle any exceptions (e.g., database connection error)
        return jsonify({'error': str(e)}), 500
