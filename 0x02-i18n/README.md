# 0x02-i18n

## Resources
- [Flask-Babel](https://web.archive.org/web/20201111174034/https://flask-babel.tkte.ch/)
- [Flask i18n tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-xiii-i18n-and-l10n)

- [pytz](https://pypi.org/project/pytz/)
This library allows accurate and cross platform timezone calculations using Python 2.4 or higher.

### Learning Objectives

- Learn how to parametrize Flask templates to display different languages
- Learn how to infer the correct locale based on URL parameters, user settings or request headers
- Learn how to localize timestamps

## Tasks
0. Basic Flask app

First you will setup a basic Flask app in `0-app.py`. Create a single / route and an `index.html` template that simply outputs “Welcome to Holberton” as page title (`<title>`) and “Hello world” as header (`<h1>`).

```sh

alx-backend/0x02-i18n$ FLASK_APP=0-app.py flask run
 * Serving Flask app '0-app.py'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
127.0.0.1 - - [05/Nov/2024 15:11:33] "GET / HTTP/1.1" 200 -

```

File: `0-app.py`, `templates/0-index.html`