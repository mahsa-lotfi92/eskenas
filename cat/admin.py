from django.contrib import admin
from cat.models import Cat
from transaction.models import Transaction
from budget.models import Bug

admin.site.register(Cat)
admin.site.register(Transaction)
admin.site.register(Bug)
