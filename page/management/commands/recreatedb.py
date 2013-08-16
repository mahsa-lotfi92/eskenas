#adapted from: http://djangosnippets.org/snippets/828/

from django.conf import settings
from django.core.management.base import CommandError
import logging
from django.core.management.base import BaseCommand
from django.db import connection
        
class Command(BaseCommand):
    help = "Resets a database."

    def handle(self, *args, **options):
        db = settings.DATABASES['default']
    
        engine = db['ENGINE'].split('.')[-1]
    
        if engine == 'sqlite3':
            import os
            try:
                logging.info("Unlinking sqlite3 database")
                os.unlink(db['NAME'])
            except OSError:
                pass
        elif engine == 'mysql':
            import MySQLdb as Database
            kwargs = {
                'user': db['USER'],
                'passwd': db['PASSWORD'],
            }
            if db['HOST'].startswith('/'):
                kwargs['unix_socket'] = db['HOST']
            else:
                kwargs['host'] = db['HOST']
            if db['PORT']:
                kwargs['port'] = int(db['PORT'])
            connection = Database.connect(**kwargs)
            drop_query = 'DROP DATABASE IF EXISTS %s' % db['NAME']
            create_query = 'CREATE DATABASE %s COLLATE utf8_unicode_ci' % db['NAME']
            logging.info('Executing... "' + drop_query + '"')
            connection.query(drop_query)
            logging.info('Executing... "' + create_query + '"')
            connection.query(create_query)
    
        logging.info("Reset success")