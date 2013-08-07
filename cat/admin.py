from django.contrib import admin
from cat.models import Cat
from transaction.models import Transaction
from budget.models import Bug
from myprofile.models import userCredit

admin.site.register(Cat)
admin.site.register(Transaction)
admin.site.register(Bug)
admin.site.register(userCredit)
