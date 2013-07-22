# Create your views here.
from django.shortcuts import render
from cat.models import Cat


def catForm(req):
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
    return render(req, 'catForm.html', {'cats': Cat.objects.filter(isSub=False)})