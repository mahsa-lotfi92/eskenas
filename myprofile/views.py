# Create your views here.
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from myprofile.models import userCredit

def profile(request):
        c = userCredit.objects.filter(user=request.user)[0]
        return  render(request, 'profile.html', {"credit":c })
   
def myLogin(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect('/transaction/') 
       # else:
            # Return a 'disabled account' error message
        else:
            return  render(request, 'home.html', {})
        
    return  render(request, 'home.html', {})

def changePass(request):
    return redirect('/profile/')

    
