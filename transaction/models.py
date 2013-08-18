from django.db import models
from cat.models import Cat, BankAccount
from django.contrib.auth.models import User

class Transaction(models.Model):

    isIncome=models.BooleanField();
    date = models.DateField()
    cost=models.IntegerField()
    Category= models.ForeignKey(Cat)
    description=models.CharField(max_length=500)
    user = models.ForeignKey(User)
    bankAccount = models.ForeignKey(BankAccount)
