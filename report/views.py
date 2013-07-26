# Create your views here.
from django.shortcuts import render, redirect
from cat.models import Cat
from transaction.models import Transaction

def general(request):
    return  render(request, 'report.html', {"Name": "behrooz", "Family": "kidding"})



