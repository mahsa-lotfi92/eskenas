# Create your views here.
from django.shortcuts import render
from cat.models import Cat
def budgetForm (req):
    return render(req, 'budget.html', {'cats': Cat.objects.filter(isSub=False)})