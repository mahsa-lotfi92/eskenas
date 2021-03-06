#encoding: utf8
from django.conf import settings
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from cat.models import Cat, BankAccount
import datetime
from transaction.models import Transaction
from myprofile.models import userCredit
from budget.models import Bug

class Command(BaseCommand):
    help = "Add some default entries in database"

    def handle(self, *args, **options):
        print 'users...'
        def hash_(x):
            u = User()
            u.set_password(x)
            return u.password
        user_admin, _ = User.objects.get_or_create(username="admin", defaults={'email': 'a@b.com', 'first_name': 'admin', 'last_name': 'admini', 'password': hash_("admin"), 'is_staff': True, 'is_active': True, 'is_superuser': True})
        userCredit.objects.create(user=user_admin, isGolden=True, registerDate=datetime.date.today(), credit=datetime.date.today() + datetime.timedelta(days=+10))

        print 'categories...'
        cat_khorak, _ = Cat.objects.get_or_create(user=user_admin, name=u'خوراک', defaults={'isSub': False, 'parentCat': None})
        cat_pushak, _ = Cat.objects.get_or_create(user=user_admin, name=u'پوشاک', defaults={'isSub': False, 'parentCat': None})
        cat_haml, _ = Cat.objects.get_or_create(user=user_admin, name=u'حمل و نقل', defaults={'isSub': False, 'parentCat': None})

        Cat.objects.get_or_create(user=user_admin, name=u'رستوران', defaults={'isSub': True, 'parentCat': cat_khorak})
        cat_mive, _ = Cat.objects.get_or_create(user=user_admin, name=u'میوه', defaults={'isSub': True, 'parentCat': cat_khorak})
        Cat.objects.get_or_create(user=user_admin, name=u'گوشت', defaults={'isSub': True, 'parentCat': cat_khorak})
        Cat.objects.get_or_create(user=user_admin, name=u'تی‌شرت', defaults={'isSub': True, 'parentCat': cat_pushak})
        cat_mehmuni, _ = Cat.objects.get_or_create(user=user_admin, name=u'لباس مهمونی', defaults={'isSub': True, 'parentCat': cat_pushak})
        Cat.objects.get_or_create(user=user_admin, name=u'جوراب', defaults={'isSub': True, 'parentCat': cat_pushak})
        cat_taxi, _ = Cat.objects.get_or_create(user=user_admin, name=u'تاکسی اتوبوس', defaults={'isSub': True, 'parentCat': cat_haml})
        cat_benzin, _ = Cat.objects.get_or_create(user=user_admin, name=u'بنزین', defaults={'isSub': True, 'parentCat': cat_haml})
        Cat.objects.get_or_create(user=user_admin, name=u'مسافرت', defaults={'isSub': True, 'parentCat': cat_haml})

        cat_huquq, _ = Cat.objects.get_or_create(user=user_admin, name=u'حقوق', defaults={'isSub': False, 'parentCat': None})
        cat_huquq1, _ = Cat.objects.get_or_create(user=user_admin, name=u'بنیاد', defaults={'isSub': True, 'parentCat': cat_huquq})
        cat_huquq2, _ = Cat.objects.get_or_create(user=user_admin, name=u'شرکت', defaults={'isSub': True, 'parentCat': cat_huquq})

        cat_sayer, _ = Cat.objects.get_or_create(user=user_admin, name=u'سایر', defaults={'isSub': False, 'parentCat': None})
        cat_sayer1, _ = Cat.objects.get_or_create(user=user_admin, name=u'متفرقه', defaults={'isSub': True, 'parentCat': cat_sayer})


        print 'budgets...'
        baseDate = datetime.date(2013, 8, 10)
        bug_khorak, _ = Bug.objects.get_or_create(limit=70 * 1000, bugCat=cat_khorak, startDate= baseDate + datetime.timedelta(days=0), endDate = baseDate + datetime.timedelta(days=60))
        bug_haml, _ = Bug.objects.get_or_create(limit=30 * 1000, bugCat=cat_haml, startDate= baseDate + datetime.timedelta(days=-10), endDate = baseDate + datetime.timedelta(days=30))
        bug_pushak, _ = Bug.objects.get_or_create(limit=23 *  1000, bugCat=cat_pushak, startDate= baseDate + datetime.timedelta(days=-30), endDate = baseDate + datetime.timedelta(days=20))

        
        print 'bank account...'


        account_kif, _ = BankAccount.objects.get_or_create(user=user_admin, name=u'کیف پول' )
        account_saman, _ = BankAccount.objects.get_or_create(user=user_admin, name=u'بانک سامان')
        account_parsian, _ =  BankAccount.objects.get_or_create(user=user_admin, name=u'پارسیان')

    
        if Transaction.objects.filter(user=user_admin).count() == 0:
            print 'transactions...'
            baseDate = datetime.date(2013, 8, 18)
            
            Transaction.objects.create(bankAccount=account_kif, user = user_admin, date = baseDate + datetime.timedelta(days=0), Category = cat_sayer1, isIncome = False, cost = 10 * 1000, description='خرج اضافی')
            Transaction.objects.create(bankAccount=account_kif, user = user_admin, date = baseDate + datetime.timedelta(days=0), Category = cat_sayer1, isIncome = True, cost = 40 * 1000, description='پول توجیبی')
            Transaction.objects.create(bankAccount=account_kif, user = user_admin, date = baseDate + datetime.timedelta(days=1), Category = cat_taxi, isIncome = False, cost = 2 * 1000, description='')
            Transaction.objects.create(bankAccount=account_kif, user = user_admin, date = baseDate + datetime.timedelta(days=2), Category = cat_taxi, isIncome = False, cost = 2 * 1000, description='')
            Transaction.objects.create(bankAccount=account_kif, user = user_admin, date = baseDate + datetime.timedelta(days=3), Category = cat_taxi, isIncome = False, cost = 2 * 1000, description='')
            Transaction.objects.create(bankAccount=account_kif, user = user_admin, date = baseDate + datetime.timedelta(days=3), Category = cat_mive, isIncome = False, cost = 22 * 1000, description='گیلاس و هلو انجیری :X')
            Transaction.objects.create(bankAccount=account_kif, user = user_admin, date = baseDate + datetime.timedelta(days=4), Category = cat_taxi, isIncome = False, cost = 2 * 1000, description='')
            Transaction.objects.create(bankAccount=account_kif, user = user_admin, date = baseDate + datetime.timedelta(days=4), Category = cat_benzin, isIncome = False, cost = 15 * 1000, description='')
            Transaction.objects.create(bankAccount=account_kif, user = user_admin, date = baseDate + datetime.timedelta(days=4), Category = cat_huquq1, isIncome = True, cost = 80 * 1000, description='')
            Transaction.objects.create(bankAccount=account_kif, user = user_admin, date = baseDate + datetime.timedelta(days=6), Category = cat_mehmuni, isIncome = False, cost = 12 * 1000, description='پیرهن سبزه')
