#encoding: utf-8
from django.shortcuts import render, redirect
from cat.models import Cat, BankAccount
from transaction.models import Transaction, AutoTransaction
from datetime import date


def addTransaction(request):
    t = Transaction()
    t.description = request.POST["description"]
    t.isIncome = request.POST["isIncome"] == '1' 
    
    if request.POST["subcatId"]!="":
        sbcid= request.POST["subcatId"]
        c = Cat.objects.get(id=sbcid)
    else:
        cid = request.POST["catId"]
        c = Cat.objects.get(id=cid)
    bid = request.POST["BAId"]
    ba = BankAccount.objects.get(id=bid)
    t.Category = c
    t.bankAccount = ba
    t.user = request.user 
    t.date=date.today()
    
    try:
        t.cost = request.POST["cost"]
        t.save()
    except :
        return transaction(request, {'error':'مبلغ را به عدد وارد کنید.', 'error_cost':'1'})
    
    try:
        t.date = request.POST["date"]
        print t.date
        t.save()
    except:
        t.delete()
        return transaction(request, {'error':'فرمت تاریخ نادرست است. YYYY-MM-DD', 'error_date':'1'})
    
    
    
    t.save()
    return redirect('/transaction/')

def transaction(req, extra={}):
    if req.method == "POST" and 'formID' in req.POST:
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
    T = Transaction.objects.all().filter(user=req.user).order_by('-date')
    TT = AutoTransaction.objects.all().filter(user=req.user).order_by('-date')
    a = {"Tran":T, "AutoTran": TT, 'cats': Cat.objects.filter(isSub=False , user=req.user), 'bankAccounts': BankAccount.objects.filter(user=req.user)}
    a.update(extra)
    return  render(req, 'transaction.html', a)


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
    ba = BankAccount.objects.get(id=request.POST['BAId'])
    t.Category = c
    t.bankAccount = ba
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




def addAutoTransaction(request):
    t = AutoTransaction()
    t.description = request.POST["description"]
    t.isIncome = request.POST["isIncome"] == '1'

    if request.POST["subcatId"]!="":
        sbcid= request.POST["subcatId"]
        c = Cat.objects.get(id=sbcid)
    else:
        cid = request.POST["catId"]
        c = Cat.objects.get(id=cid)

    bid = request.POST["BAId"]
    ba = BankAccount.objects.get(id=bid)
    t.Category = c
    t.bankAccount = ba
    t.user = request.user
    t.date=date.today()

    t.interval = request.POST["interval"]

    try:
        t.cost = request.POST["cost"]
        t.save()
    except :
        t.delete()
        return transaction(request, {'error':'مبلغ را به عدد وارد کنید.', 'error_cost':'1'})

    try:
        t.date = request.POST["date"]
        print t.date
        t.save()
    except:
        t.delete()
        return transaction(request, {'error':'فرمت تاریخ نادرست است. YYYY-MM-DD', 'error_date':'1'})

    t.save()
    return redirect('/transaction/')

def editAutoTransaction(request):
    id = request.POST["id"]
    t = AutoTransaction.objects.get(id=id)
    t.interval = request.POST["interval"]
    t.date = request.POST["date"]
    t.description = request.POST["description"]
    t.cost = request.POST["cost"]
    if request.POST["isIncome"] == '1':
      t.isIncome = True
    else:
      t.isIncome = False
    c = Cat.objects.get(id=request.POST["catId"])
    ba = BankAccount.objects.get(id=request.POST['BAId'])
    t.Category = c
    t.bankAccount = ba
    t.save()
    return redirect('/transaction/')

def deleteAutoTransaction(request):
    id = request.POST["id"]
    T = AutoTransaction.objects.get(id=id)
    T.delete()
    print "@"*20
    return redirect('/transaction/')