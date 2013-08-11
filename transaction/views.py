# Create your views here.
from django.shortcuts import render, redirect
from cat.models import Cat
from transaction.models import Transaction

def addTransaction(request):
   t = Transaction()
   t.date = request.POST["date"]
   t.description = request.POST["description"]
   t.cost = request.POST["cost"]
   if request.POST["isIncome"] == '1':
     t.isIncome = True
   else:
     t.isIncome = False
   name = request.POST["Category"]
   c = Cat.objects.get(name=name)
   t.Category = c
   t.user=request.user
   t.save()
   return redirect('/transaction/') 
def transaction(req):
    if req.method == "POST":
        if req.POST['formID']=="1":
            new = Cat(name = req.POST['name'], isSub=False,parentCat= None )
            new.save()
        if req.POST['formID']=="2":
            new = Cat(name = req.POST['name'], isSub=True ,parentCat= Cat.objects.get(id= req.POST['parent']))
            new.save()
        if req.POST['formID']=="3":
            Cat.objects.filter(id= req.POST['id']).delete()
        if req.POST['formID']=="4":
            p= Cat.objects.get(id= req.POST['id'])
            p.name= req.POST['new']
            p.save()
    T = Transaction.objects.all().order_by('-date')
    return  render(req, 'transaction.html', {"Tran":T, 'cats': Cat.objects.filter(isSub=False)})


def deleteTransaction(request):
    id = request.POST["id"]
    T = Transaction.objects.get(id=id)
    T.delete()
    print "@"*20
    return redirect('/transaction/') 


def editTransaction(request):
    id = request.POST["id"]
    t = Transaction.objects.get(id=id)
    t.date = request.POST["date"]
    t.description = request.POST["description"]
    t.cost = request.POST["cost"]
    if request.POST["isIncome"] == '1':
      t.isIncome = True
    else:
      t.isIncome = False
    name = request.POST["Category"]
    c = Cat.objects.filter(name=name)[0]
    t.Category = c;
    t.save()
    return redirect('/transaction/')




