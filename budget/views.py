# Create your views here.
from django.shortcuts import render, redirect
from cat.models import Cat
from budget.models import Bug
def budgetForm (req):
    return render(req, 'budget.html', {'cats': Cat.objects.filter(isSub=False), 'bugs': Bug.objects.all()})
def budgetAdd (req):
    new = Bug(limit = req.POST['limit'],bugCat= Cat.objects.get(id=req.POST['catList']))
    new.save()
    return redirect('/budget/') 
def budgetDel (req):
    Bug.objects.filter(id= req.POST['id']).delete()
    return redirect('/budget/')
def budgetEdit (req):
      p= Bug.objects.get(id= req.POST['id'])
      p.limit= req.POST['new']
      p.save()
      return redirect('/budget/')