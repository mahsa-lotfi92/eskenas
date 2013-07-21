from django.db import models
from cat.models import Cat
class Transaction(models.Model):

    isIncome=models.BooleanField();
    date = models.DateField('date published')
    cost=models.IntegerField()
    Category= models.ForeignKey(Cat)
    description=models.CharField(max_length=500)
# Create your models here.
