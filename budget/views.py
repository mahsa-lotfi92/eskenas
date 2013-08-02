# Create your views here.
from django.shortcuts import render
from cat.models import Cat
from budget.models import Bug
def budgetForm (req):
    if req.method == "POST":
        if req.POST['formID']=="1":
            new = Bug(limit = req.POST['limit'],bugCat= Cat.objects.get(id=req.POST['catList']))
            new.save()
    return render(req, 'budget.html', {'cats': Cat.objects.filter(isSub=False), 'bugs': Bug.objects.all()})