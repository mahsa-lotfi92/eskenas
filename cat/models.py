from django.db import models
from django.contrib.auth.models import User


class Cat(models.Model):
    name = models.CharField(max_length=50)
    isSub = models.BooleanField(default = False)
    parentCat = models.ForeignKey('self', default = None, null=True, blank=True)
    user = models.ForeignKey(User)
    
    def __unicode__ (self):
        return self.name

class BankAccount(models.Model):
    user = models.ForeignKey('User')
    name = models.CharField(100)

    def __unicode__(self):
        return self.name
