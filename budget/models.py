from django.db import models
from cat.models import Cat

class Bug(models.Model):
    limit=models.IntegerField()
    bugCat= models.ForeignKey(Cat)
    def __unicode__ (self):
        return self.name;