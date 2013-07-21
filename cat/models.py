from django.db import models


class Cat(models.Model):
    name = models.CharField(max_length=50)
    isSub = models.BooleanField(default = False)
    parentCat= models.ForeignKey('self', null=True)
    def __unicode__ (self):
        return self.name;