import time
from flask import Blueprint

bp = Blueprint('main', __name__)

@bp.route('/time')
def get_current_time():
    return {'time': time.time()}
