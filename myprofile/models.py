from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields.related import ForeignKey
import datetime


class userCredit(models.Model):
    isGolden=models.BooleanField();
    credit= models.DateField('credit_Date')
    registerDate = models.DateField('register_Date')
    user= models.ForeignKey(User)

class user_plan(models.Model):
    user=models.ForeignKey(User)
    isTamdid=models.BooleanField()
    #tamdid ya ertegha
    plan_begin = models.DateField('plan_begin')
    plan_duration=models.IntegerField()
    plan_money=models.IntegerField()
    
    @staticmethod
    def getCurrentPlan(user, d=None):
        if not d:
            d = datetime.date.today()
        q = user_plan.objects.filter(user=user, plan_begin__gte=d, plan_end__lte=d)
        if len(q):
            return q[0]
        return None
