import os
from flask import Flask
from celery import Celery

def make_celery():
    my_celery = Celery(__name__, broker=os.environ["CELERY_BROKER_URL"])
    return my_celery

def create_app():
    # template_dir = os.path.abspath('../public') # or might be another level up, not sure
    # app = Flask(__name__, template_folder=template_dir)
    app = Flask(__name__)

    celery.conf.update(app.config)

    from .routes import main, auth, list, rent, process

    app.register_blueprint(main)
    app.register_blueprint(auth)
    app.register_blueprint(list)
    app.register_blueprint(rent)
    app.register_blueprint(process)
    return app

celery = make_celery()
