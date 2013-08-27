from django.contrib import admin
from cat.models import Cat, BankAccount
from transaction.models import Transaction, AutoTransaction
from budget.models import Bug
from myprofile.models import userCredit
from myprofile.models import user_plan

admin.site.register(Cat)
admin.site.register(Transaction)
admin.site.register(AutoTransaction)
admin.site.register(Bug)
admin.site.register(userCredit)
admin.site.register(user_plan)
admin.site.register(BankAccount)
