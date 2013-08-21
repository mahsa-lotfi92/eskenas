# Create your views here.
from django.shortcuts import render, redirect
from cat.models import Cat, BankAccount
from transaction.models import Transaction


def addTransaction(request):
    t = Transaction()
    t.date = request.POST["date"]
    t.description = request.POST["description"]
    t.cost = request.POST["cost"]
    t.isIncome = request.POST["isIncome"] == '1' 
    cid = request.POST["catId"]
    bid = request.POST["BAId"]
    c = Cat.objects.get(id=cid)
    ba = BankAccount.objects.get(id=bid)
    t.Category = c
    t.bankAccount = ba
    t.user = request.user 
    t.save()
    
    return redirect('/transaction/')

def transaction(req):
    if req.method == "POST":
        if req.POST['formID'] == "1":
            new = Cat(name=req.POST['name'], isSub=False, parentCat=None, user=req.user)
            new.save()
        if req.POST['formID'] == "2":
            new = Cat(name=req.POST['name'], isSub=True , parentCat=Cat.objects.get(id=req.POST['parent']), user=req.user)
            new.save()
        if req.POST['formID'] == "3":
            Cat.objects.filter(id=req.POST['id'], user=req.user).delete()
        if req.POST['formID'] == "4":
            p = Cat.objects.get(id=req.POST['id'], user=req.user)
            p.name = req.POST['new']
            p.save()
    T = Transaction.objects.all().order_by('-date')
    return  render(req, 'transaction.html', {"Tran":T, 'cats': Cat.objects.filter(isSub=False , user=req.user), 'bankAccounts': BankAccount.objects.filter(user=req.user)})


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
    c = Cat.objects.get(id=request.POST["catId"])
    ba=BankAccount.objects.get(id=request.POST['BAId'])
    t.Category = c
    t.bankAccount=ba
    t.save()
    return redirect('/transaction/')
def bankAccountAdd (req):
    new = BankAccount(name=req.POST['name'], user=req.user)
    new.save()
    return redirect('/transaction/') 
def bankAccountDel (req):
    BankAccount.objects.filter(id=req.POST['id']).delete()
    return redirect('/transaction/')
def bankAccountEdit (req):
    p = BankAccount.objects.get(id=req.POST['id'])
    p.name = req.POST['new']
    p.save()
    return redirect('/transaction/')


