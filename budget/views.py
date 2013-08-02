# Create your views here.
from django.shortcuts import render
def budgetForm (req):
    return render(req, 'budget.html')