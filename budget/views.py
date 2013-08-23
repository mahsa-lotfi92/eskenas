# Create your views here.
from django.shortcuts import render, redirect
from cat.models import Cat
from budget.models import Bug
from transaction.models import Transaction
from django.db.models.aggregates import Sum
from myprofile.models import userCredit



def budgetForm (req):
    bugs = Bug.objects.all()
    for i in bugs:
        i.cost = 0
        for j in Transaction.objects.filter(Category__parentCat=i.bugCat , isIncome=False ):
            i.cost += j.cost
        for j in Transaction.objects.filter(Category=i.bugCat , isIncome=False ):
            i.cost += j.cost
        i.per= i.cost * 100.0 / i.limit
        if (i.per>100):
            i.per=100
        
    return render(req, 'budget.html', {'cats': Cat.objects.filter(isSub=False, user= req.user), 'bugs': bugs, 'myUser': userCredit.objects.get(user= req.user)})


def budgetAdd (req):
    new = Bug(limit=req.POST['limit'], bugCat=Cat.objects.get(id=req.POST['catList']))
    new.save()
    return redirect('/budget/') 


def budgetDel (req):
    Bug.objects.filter(id=req.POST['id']).delete()
    return redirect('/budget/')


def budgetEdit (req):
    p = Bug.objects.get(id=req.POST['id'])
    p.limit = req.POST['new']
    p.save()
    return redirect('/budget/')
