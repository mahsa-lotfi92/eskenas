DEBUG = True

#import warnings
#warnings.filterwarnings(
#        'error', r"DateTimeField received a naive datetime",
#        RuntimeWarning, r'django\.db\.models\.fields')

import os
PROJ_DIR = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')).replace('\\', '/') + '/'
PROJ_ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../..')).replace('\\', '/') + '/'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': PROJ_ROOT_DIR + 'eskenas.sqlite',                      # Or path to database file if using sqlite3.
        'USER': 'root',                      # Not used with sqlite3.
        'PASSWORD': '',                  # Not used with sqlite3.
        'HOST': '127.0.0.1',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
    }
}

MEDIA_ROOT = PROJ_ROOT_DIR + 'media/'
MEDIA_URL = '/media/'

STATIC_ROOT = PROJ_ROOT_DIR + 'static/'
STATIC_URL = '/static/'

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'fpga4'
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

TEMPLATE_STRING_IF_INVALID = "INV"
TEMPLATE_DEBUG = True
