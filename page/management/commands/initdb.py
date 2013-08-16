#encoding: utf8
from django.conf import settings
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from cat.models import Cat


class Command(BaseCommand):
	help = "Add some default entries in database"

	def users(self):
		def hash_(x):
			u = User()
			u.set_password(x)
			return u.password
		User.objects.get_or_create(username="admin", defaults={'email': 'a@b.com', 'first_name': 'admin', 'last_name': 'admini', 'password': hash_("admin"), 'is_staff': True, 'is_active': True, 'is_superuser': True})

	def handle(self, *args, **options):
		print 'users...'
		self.users()
		
		print 'categories...'
		cat_khorak, _ = Cat.objects.get_or_create(name = u'خوراک', defaults={'isSub': False, 'parentCat': None})
		cat_pushak, _ = Cat.objects.get_or_create(name = u'پوشاک', defaults={'isSub': False, 'parentCat': None})
		cat_haml, _ = Cat.objects.get_or_create(name = u'حمل و نقل', defaults={'isSub': False, 'parentCat': None})
		Cat.objects.get_or_create(name = u'سایر', defaults={'isSub': False, 'parentCat': None})
		Cat.objects.get_or_create(name = u'رستوران', defaults={'isSub': True, 'parentCat': cat_khorak})
		Cat.objects.get_or_create(name = u'میوه', defaults={'isSub': True, 'parentCat': cat_khorak})
		Cat.objects.get_or_create(name = u'گوشت', defaults={'isSub': True, 'parentCat': cat_khorak})
		Cat.objects.get_or_create(name = u'تی‌شرت', defaults={'isSub': True, 'parentCat': cat_pushak})
		Cat.objects.get_or_create(name = u'لباس مهمونی', defaults={'isSub': True, 'parentCat': cat_pushak})
		Cat.objects.get_or_create(name = u'جوراب', defaults={'isSub': True, 'parentCat': cat_pushak})
		Cat.objects.get_or_create(name = u'تاکسی اتوبوس', defaults={'isSub': True, 'parentCat': cat_haml})
		Cat.objects.get_or_create(name = u'بنزین', defaults={'isSub': True, 'parentCat': cat_haml})
		Cat.objects.get_or_create(name = u'مسافرت', defaults={'isSub': True, 'parentCat': cat_haml})
	

