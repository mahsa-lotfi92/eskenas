#encoding: utf8
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from myprofile.models import userCredit, user_plan
from datetime import date

def profile(request):
        c = userCredit.objects.filter(user=request.user)[0]
        #plan=user_plan.objects.order_by('-plan_end').filter(user=request.user)[0]
        plan = user_plan.objects.order_by('-plan_begin').filter(user=request.user)
        
        return  render(request, 'profile.html', {"plan":plan, "credit":c})
   
def edit(request):
    user=request.user
    if request.POST['formID']=="1":
        user.first_name = request.POST['first_name']
        user.save() 
    if request.POST['formID']=="2":
        user.last_name = request.POST['last_name']
        user.save()
           
    if request.POST['formID']=="3":
        user.email = request.POST['email']
        user.save()
    return redirect('/profile')
    
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
            return  render(request, 'home.html', {'error':'err' ,'login_error':'نام کاربری یا رمز عبور اشتباه است!'})
    return  render(request, 'home.html', {})


def register(request):
    if request.method == "POST":
        u = User()
        u.first_name = request.POST['first_name']
        u.last_name = request.POST['last_name']
        u.username = request.POST['username']
        if User.objects.filter(username=u.username).count():
            return  render(request, 'home.html', {'error':'err','reg_error':"قبلا ثبت شده"})
            
        u.email = request.POST['email']
        u.set_password(request.POST['password'])
        u.save()
        uc=userCredit()
        uc.registerDate=date.today()
        uc.credit=date.today()
        uc.user=u
        uc.save()
            
        
    return redirect('/home/') 

def logout_view(request):
    logout(request)
    return redirect('/home/')
    

def changePass(request):
    
    return redirect('/profile/')

def index(request):
    if request.user.is_authenticated():
        return redirect('/transaction/')
    else:
        return redirect('/home/')

