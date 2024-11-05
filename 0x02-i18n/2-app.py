#!/usr/bin/env python3
""" 2. Get locale from request """
from flask import Flask, render_template, request
from flask_babel import Babel

# Instantiate the Babel object
babel = Babel()


class Config(object):
    """
    Babel Configuration
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


# Create the Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Initialize Babel with the Flask app
babel.init_app(app)


@babel.localeselector
def get_locale():
    """
    Determine the best match from the supported languages.
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/', strict_slashes=False)
def index() -> str:
    """
    Handles / route
    """
    return render_template('2-index.html')


if __name__ == "__main__":
    app.run(port="5000", host="0.0.0.0", debug=True)
