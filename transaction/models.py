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


class AutoTransaction(models.Model):
    isIncome=models.BooleanField();
    date = models.DateField()
    lastModified = models.DateField(null=True, blank=True)
    cost=models.IntegerField()
    Category= models.ForeignKey(Cat)
    user = models.ForeignKey(User)
    description=models.CharField(max_length=500)
    interval=models.IntegerField()
    bankAccount = models.ForeignKey(BankAccount)
