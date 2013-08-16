#encoding: utf8
from django.conf import settings
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from cat.models import Cat
import datetime
from transaction.models import Transaction


class Command(BaseCommand):
	help = "Add some default entries in database"

	def handle(self, *args, **options):
		print 'users...'
		def hash_(x):
			u = User()
			u.set_password(x)
			return u.password
		user_admin, _ = User.objects.get_or_create(username="admin", defaults={'email': 'a@b.com', 'first_name': 'admin', 'last_name': 'admini', 'password': hash_("admin"), 'is_staff': True, 'is_active': True, 'is_superuser': True})
		
		print 'categories...'
		cat_khorak, _ = Cat.objects.get_or_create(name = u'خوراک', defaults={'isSub': False, 'parentCat': None})
		cat_pushak, _ = Cat.objects.get_or_create(name = u'پوشاک', defaults={'isSub': False, 'parentCat': None})
		cat_haml, _ = Cat.objects.get_or_create(name = u'حمل و نقل', defaults={'isSub': False, 'parentCat': None})
		cat_sayer, _ = Cat.objects.get_or_create(name = u'سایر', defaults={'isSub': False, 'parentCat': None})
		Cat.objects.get_or_create(name = u'رستوران', defaults={'isSub': True, 'parentCat': cat_khorak})
		cat_mive, _ = Cat.objects.get_or_create(name = u'میوه', defaults={'isSub': True, 'parentCat': cat_khorak})
		Cat.objects.get_or_create(name = u'گوشت', defaults={'isSub': True, 'parentCat': cat_khorak})
		Cat.objects.get_or_create(name = u'تی‌شرت', defaults={'isSub': True, 'parentCat': cat_pushak})
		cat_mehmuni, _ = Cat.objects.get_or_create(name = u'لباس مهمونی', defaults={'isSub': True, 'parentCat': cat_pushak})
		Cat.objects.get_or_create(name = u'جوراب', defaults={'isSub': True, 'parentCat': cat_pushak})
		cat_taxi, _ = Cat.objects.get_or_create(name = u'تاکسی اتوبوس', defaults={'isSub': True, 'parentCat': cat_haml})
		cat_benzin, _ = Cat.objects.get_or_create(name = u'بنزین', defaults={'isSub': True, 'parentCat': cat_haml})
		Cat.objects.get_or_create(name = u'مسافرت', defaults={'isSub': True, 'parentCat': cat_haml})
		cat_huquq, _ = Cat.objects.get_or_create(name = u'حقوق', defaults={'isSub': False, 'parentCat': None})
		
	
		if Transaction.objects.all().count() == 0:
			print 'transactions...'
			baseDate = datetime.date(2013, 8, 10)
			
			Transaction.objects.create(user = user_admin, date = baseDate + datetime.timedelta(days=0), Category = cat_sayer, isIncome = False, cost = 10 * 1000, description='خرج اضافی')
			Transaction.objects.create(user = user_admin, date = baseDate + datetime.timedelta(days=0), Category = cat_sayer, isIncome = True, cost = 40 * 1000, description='پول توجیبی')
			Transaction.objects.create(user = user_admin, date = baseDate + datetime.timedelta(days=1), Category = cat_taxi, isIncome = False, cost = 2 * 1000, description='')
			Transaction.objects.create(user = user_admin, date = baseDate + datetime.timedelta(days=2), Category = cat_taxi, isIncome = False, cost = 2 * 1000, description='')
			Transaction.objects.create(user = user_admin, date = baseDate + datetime.timedelta(days=3), Category = cat_taxi, isIncome = False, cost = 2 * 1000, description='')
			Transaction.objects.create(user = user_admin, date = baseDate + datetime.timedelta(days=3), Category = cat_mive, isIncome = False, cost = 22 * 1000, description='گیلاس و هلو انجیری :X')
			Transaction.objects.create(user = user_admin, date = baseDate + datetime.timedelta(days=4), Category = cat_taxi, isIncome = False, cost = 2 * 1000, description='')
			Transaction.objects.create(user = user_admin, date = baseDate + datetime.timedelta(days=4), Category = cat_benzin, isIncome = False, cost = 15 * 1000, description='')
			Transaction.objects.create(user = user_admin, date = baseDate + datetime.timedelta(days=4), Category = cat_huquq, isIncome = True, cost = 2 * 1000, description='')
			Transaction.objects.create(user = user_admin, date = baseDate + datetime.timedelta(days=6), Category = cat_mehmuni, isIncome = False, cost = 120 * 1000, description='پیرهن سبزه')
		
		