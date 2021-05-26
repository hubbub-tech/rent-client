import os
import boto3

#SUPPORTING CONFIGS------------------------------

class AWSConfig:
    _instance = None
    S3_OBJECT = None
    S3_LINK = None
    AWS_ACCESS_KEY_ID = None
    AWS_SECRET_ACCESS_KEY = None

    def __init__(self):
        if AWSConfig._instance:
            #TODO: log that this problem happened
            raise Exception("AWS Connection should only be created once in the app.")
        else:
            AWSConfig.S3_LINK = "https://{}.s3.amazonaws.com".format(os.environ['S3_BUCKET'])
            AWSConfig.AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
            AWSConfig.AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
            AWSConfig.S3_BUCKET = os.environ['S3_BUCKET']
            AWSConfig.set_s3()

            AWSConfig._instance = self

    @staticmethod
    def get_instance():
        if AWSConfig._instance is None:
            AWSConfig()
        return AWSConfig._instance

    @staticmethod
    def set_s3():
        if AWSConfig.S3_OBJECT is None:
            s3 = boto3.client(
                's3',
                aws_access_key_id=AWSConfig.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=AWSConfig.AWS_SECRET_ACCESS_KEY
            )
            AWSConfig.S3_OBJECT = s3

    @staticmethod
    def get_url(path):
        url = "/".join([AWS.S3_LINK, path])
        return url
#
# class MailConfig:
#     #Mail configurations
#     MAIL_SERVER  = os.environ['MAIL_SERVER']
#     MAIL_PORT  = int(os.environ['MAIL_PORT']) #587?
#
#     if os.environ['MAIL_USE_TLS'] == '1':
#         MAIL_USE_TLS = True
#     else:
#         MAIL_USE_TLS = False #gmail: false
#
#     if os.environ['MAIL_USE_SSL'] == '1':
#         MAIL_USE_SSL = True
#     else:
#         MAIL_USE_SSL = False #gmail: true
#
#     MAIL_USERNAME  = os.environ['MAIL_USERNAME']
#     MAIL_PASSWORD  = os.environ['MAIL_PASSWORD']
#     MAIL_DEFAULT_SENDER  = ('Hubbub', os.environ['MAIL_DEFAULT_SENDER'])
#     MAIL_MAX_EMAILS  = None
#     MAIL_ASCII_ATTACHMENTS  = False
#
# class ReCaptchaConfig:
#     #ReCAPTCHA
#     RECAPTCHA_SITE_KEY = os.environ['RECAPTCHA_PUBLIC_KEY']
#     RECAPTCHA_SECRET_KEY = os.environ['RECAPTCHA_PRIVATE_KEY']
#
# #FLASK CONFIGS------------------------------------
#
# class Config(MailConfig, ReCaptchaConfig):
#     #DB and Session configurations
#     SQLALCHEMY_TRACK_MODIFICATIONS = False
#     SQLALCHEMY_DATABASE_URI = 'sqlite:///schema.db'
#
#     CELERY_BROKER_URL = os.environ['CLOUDAMQP_URL']
#     BROKER_POOL_LIMIT = 1
#     #CELERY_RESULT_BACKEND = os.environ['CELERY_RESULT_BACKEND']
#
#     DEBUG = False
#     TESTING  =  False
#
#     #Upload management
#     ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
#
# class DevelopmentConfig(Config):
#     DEBUG = True
#     TESTING = False
#     SECRET_KEY = 'dev'
#
# class ProductionConfig(Config):
#     DEBUG = False
#
#     #DB and Session configurations
#     SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
#     SECRET_KEY = os.environ['SECRET_KEY']
#
#     CELERY_BROKER_URL = os.environ['CLOUDAMQP_URL']
#
# class TestingConfig(Config):
#     TESTING = True
#     SECRET_KEY = 'dev'
