from django.db import models
from cat.models import Cat
from django.contrib.auth.models import User

class Transaction(models.Model):

    isIncome=models.BooleanField();
    date = models.DateField('date published')
    cost=models.IntegerField()
    Category= models.ForeignKey(Cat)
    description=models.CharField(max_length=500)
    user = models.ForeignKey(User)
# Create your models here.
