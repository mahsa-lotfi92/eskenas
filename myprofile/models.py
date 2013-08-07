from django.db import models
from django.contrib.auth.models import User

class userCredit(models.Model):

    isGolden=models.BooleanField();
    credit = models.DateField('date published')
    user= models.ForeignKey(User)
