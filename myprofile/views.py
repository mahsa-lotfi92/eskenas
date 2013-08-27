#encoding: utf8
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from myprofile.models import userCredit, user_plan
from datetime import date
import datetime


def profile(request,extra={}):
        if not request.user.is_authenticated():
            return HttpResponseRedirect("/home/")
        c = userCredit.objects.filter(user=request.user)[0]
        #plan=user_plan.objects.order_by('-plan_end').filter(user=request.user)[0]
        plan = user_plan.objects.order_by('plan_begin').filter(user=request.user)
        for p in plan:
            p.duration = (p.plan_end - p.plan_begin).days / 31
        if c.isGolden:
            c.remain = (c.credit - date.today()).days
        a={"plan":plan, "credit":c}
        a.update(extra)
        return  render(request, 'profile.html',a )
   
def edit(request):
    if not request.user.is_authenticated():
        return HttpResponseRedirect("/home/")
    user = request.user
    if request.POST['formID'] == "1":
        user.first_name = request.POST['first_name']
        user.save() 
    if request.POST['formID'] == "2":
        user.last_name = request.POST['last_name']
        user.save()
           
    if request.POST['formID'] == "3":
        user.email = request.POST['email']
        user.save()
    return redirect('/profile/')
    
def myLogin(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect('/transaction/') 
            else:
                return  render(request, 'home.html', {'error': 'user suspended'})
        else:
            return  render(request, 'home.html', {'error':'err' , 'login_error':'نام کاربری یا رمز عبور اشتباه است!'})
    return  render(request, 'home.html', {})


def register(request):
    if request.method == "POST":
        u = User()
        u.first_name = request.POST['first_name']
        u.last_name = request.POST['last_name']
        u.username = request.POST['username']
        if User.objects.filter(username=u.username).count():
            return  render(request, 'home.html', {'error':'err', 'reg_error':"قبلا ثبت شده"})
            
        u.email = request.POST['email']
        u.set_password(request.POST['password'])
        u.save()
        uc = userCredit()
        uc.registerDate = date.today()
        uc.credit = date.today()
        uc.user = u
        uc.save()
            
        
    return  render(request, 'home.html', {'success':"1"})

def logout_view(request):
    logout(request)
    return redirect('/home/')
    

def changePass(request):
    if not request.user.is_authenticated():
        return HttpResponseRedirect("/home/")
    if request.user.check_password(request.POST['last_pass']):
        request.user.set_password(request.POST['new_pass'])
        request.user.save()
        
        return  render(request, 'profile.html', {'sabt':'هوراا'})
    else:
        return  render(request, 'profile.html', {'error':'err', 'change_pass_err':"رمز عبور نادرست است."})
    return redirect('/profile/')

def index(request):
    if request.user.is_authenticated():
        return redirect('/transaction/')
    else:
        return redirect('/home/')
def ertegha(request):
    if not request.user.is_authenticated():
        return HttpResponseRedirect("/home/")
    up = user_plan()
    up.user = request.user
    up.plan_begin = date.today()
    if request.POST['ertegha_info'] == '1':
        up.plan_end = date.today() + datetime.timedelta(days=31 * 2)
        up.plan_money = 10000
    if request.POST['ertegha_info'] == '2':
        up.plan_end = date.today() + datetime.timedelta(days=31 * 5)
        up.plan_money = 20000
    if request.POST['ertegha_info'] == '3':
        up.plan_end = date.today() + datetime.timedelta(days=31 * 12)
        up.plan_money = 40000
    up.save()
    uc = userCredit.objects.get(user=request.user)
    uc.isGolden = True
    uc.credit = up.plan_end
    uc.save()
    return  profile(request,{'success':'1'})     

def tamdid(request):
    if not request.user.is_authenticated():
        return HttpResponseRedirect("/home/")
    last_plan = user_plan.objects.order_by('-plan_begin').filter(user=request.user)[0]
    up = user_plan()
    up.isTamdid = True
    up.user = request.user
    up.plan_begin = last_plan.plan_end
    if request.POST['tamdid_info'] == '1':
        up.plan_end = up.plan_begin + datetime.timedelta(days=31 * 2)
        up.plan_money = 10000
    if request.POST['tamdid_info'] == '2':
        up.plan_end = up.plan_begin + datetime.timedelta(days=31 * 5)
        up.plan_money = 20000
    if request.POST['tamdid_info'] == '3':
        up.plan_end = up.plan_begin + datetime.timedelta(days=31 * 12)
        up.plan_money = 40000
    up.save()
    uc = userCredit.objects.get(user=request.user)
    uc.credit = up.plan_end
    uc.save()
    
    return  profile(request,{'success':'1'})  

        
