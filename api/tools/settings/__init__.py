from flask_recaptcha import ReCaptcha

from .utils import login_required, login_user
from .config import AWSConfig

AWS = AWSConfig.get_instance()
recaptcha = ReCaptcha()
