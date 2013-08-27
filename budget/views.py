from django.shortcuts import render, redirect
from cat.models import Cat
from budget.models import Bug
from transaction.models import Transaction
from myprofile.models import userCredit
from django.db.models import Q
from django.http import HttpResponseRedirect


def budgetForm(req):
    if not req.user.is_authenticated():
        return HttpResponseRedirect("/home/")
    bugs = Bug.objects.all()
    for i in bugs:
        i.cost = 0
        i.res= 0

        for j in Transaction.objects.filter(Q(Category=i.bugCat, isIncome=False, date__gte=i.startDate) | Q(Category__parentCat=i.bugCat, isIncome=False, date__lt=i.endDate)):
            i.cost += j.cost

        i.per = i.cost * 100.0 / i.limit
        if i.per > 100:
            i.per = 100
        i.per = int (i.per)
        i.res= i.limit - i.cost
        if (i.res <0):
            i.plusRes= -i.res

    return render(req, 'budget.html', {'cats': Cat.objects.filter(isSub=False, user=req.user), 'bugs': bugs, 'myUser': userCredit.objects.get(user=req.user)})


def budgetAdd(req):
    if not req.user.is_authenticated():
        return HttpResponseRedirect("/home/")
    new = Bug(limit=req.POST['limit'], bugCat=Cat.objects.get(id=req.POST['catList']), startDate= req.POST['start'], endDate= req.POST['end'])
    new.save()
    return redirect('/budget/') 


def budgetDel(req):
    if not req.user.is_authenticated():
        return HttpResponseRedirect("/home/")
    Bug.objects.filter(id=req.POST['id']).delete()
    return redirect('/budget/')


def budgetEdit(req):
    if not req.user.is_authenticated():
        return HttpResponseRedirect("/home/")
    p = Bug.objects.get(id=req.POST['id'])
    p.limit = req.POST['newLimit']
    p.startDate= req.POST['newStart']
    p.endDate= req.POST['newEnd']
    p.save()
    return redirect('/budget/')
