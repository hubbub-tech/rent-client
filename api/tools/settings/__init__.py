from flask_recaptcha import ReCaptcha

from .transact import exp_decay
from .utils import login_required, login_user
from .utils import generate_proposed_period
from .utils import search_items
from .config import AWSConfig

AWS = AWSConfig.get_instance()
#recaptcha = ReCaptcha()
