from django.db import models


class Cat(models.Model):
    name = models.CharField(max_length=50)
    isSub = models.BooleanField(default = False)
    parentCat= models.ForeignKey('self', default = None, null=True, blank=True)

    def __unicode__ (self):
        return self.name

class BankAccount(models.Model):
    user = models.ForeignKey('User')
    name = models.CharField(100)

    def __unicode__(self):
        return self.name
