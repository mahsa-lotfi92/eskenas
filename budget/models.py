from django.db import models
from cat.models import Cat

class Bug(models.Model):
    limit=models.IntegerField()
    bugCat= models.ForeignKey(Cat)
#    startDate = models.DateField()
#    startDate = models.DateField()
    def __unicode__ (self):
        return unicode(self.bugCat) + " " + unicode(self.limit)