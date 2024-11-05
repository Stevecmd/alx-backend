#!/usr/bin/env python3
"""This code sets up a Flask web application with
    internationalization (i18n) and localization (L10n)
    features using Flask-Babel.
    It allows users to select their locale and timezone,
    and displays the current time accordingly.
"""
from flask import Flask, render_template, request, g
from flask_babel import Babel, format_datetime
import pytz
from datetime import datetime


# Instantiate the User dictionary
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


# Setting up available languages and default locale and timezone
class Config:
    """Flask Babel configuration"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


# functions to get the current user, locale, and timezone,
# and sets these as global variables before each request.
def get_user():
    """Returns user dictionary or None if not found"""
    login_id = request.args.get('login_as')
    try:
        return users.get(int(login_id)) if login_id else None
    except Exception:
        return None


@app.before_request
def before_request():
    """Set user and time as global"""
    g.user = get_user()
    timezone = get_timezone()
    if timezone:
        tz = pytz.timezone(timezone)
        g.current_time = format_datetime(datetime.now(tz))


@babel.localeselector
def get_locale():
    """Determining best match locale"""
    # 1. Locale from URL parameters
    locale = request.args.get('locale')
    if locale and locale in app.config['LANGUAGES']:
        return locale
    # 2. Locale from user settings
    if g.user and g.user['locale'] in app.config['LANGUAGES']:
        return g.user['locale']
    # 3. Locale from request header
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@babel.timezoneselector
def get_timezone():
    """Determine timezone"""
    try:
        # 1. Find timezone from URL parameters
        timezone = request.args.get('timezone')
        if timezone:
            pytz.timezone(timezone)
            return timezone

        # 2. Find timezone from user settings
        if g.user and g.user['timezone']:
            pytz.timezone(g.user['timezone'])
            return g.user['timezone']

    except pytz.exceptions.UnknownTimeZoneError:
        pass

    # 3. Default to UTC
    return app.config['BABEL_DEFAULT_TIMEZONE']


@app.route('/', strict_slashes=False)
def index():
    """Render index template"""
    return render_template('index.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
