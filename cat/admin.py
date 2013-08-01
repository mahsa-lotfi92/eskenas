from django.contrib import admin
from cat.models import Cat
from transaction.models import Transaction

admin.site.register(Cat)
admin.site.register(Transaction)