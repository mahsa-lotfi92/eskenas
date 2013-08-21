# Create your views here.
from django.shortcuts import render, redirect

from django.db.models import Sum
from cat.models import Cat
from transaction.models import Transaction

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

import json
from django.core.serializers.json import DjangoJSONEncoder
from django.utils import simplejson

import datetime
from datetime import timedelta
import time
#from dateutil.relativedelta import relativedelta


class DjangoJSONEncoder(simplejson.JSONEncoder):
    """
    JSONEncoder subclass that knows how to encode date/time and decimal types.
    """
    def default(self, o):
        # See "Date Time String Format" in the ECMA-262 specification.
        if isinstance(o, datetime.datetime):
            return time.mktime(o.timetuple()) * 1000 ;
        elif isinstance(o, datetime.date):
            return time.mktime(o.timetuple()) * 1000 ;
        elif isinstance(o, datetime.time):
            if is_aware(o):
                raise ValueError("JSON can't represent timezone-aware times.")
            r = o.isoformat()
            if o.microsecond:
                r = r[:12]
            return r
        elif isinstance(o, decimal.Decimal):
            print 'salam5'
            return str(o)
        else:
            return super(DjangoJSONEncoder, self).default(o)


def general(request):
    return  render(request, 'report.html', {"Name": "behrooz", "Family": "kidding"})


# @csrf_exempt
def monthly(request):
    print request.POST

    # form = SimpleFilter(request.POST)
    # if not form.is_valid():
    #     return HttpResponse(json.dumps({'error': form.errors}), mimetype = 'application/json')    
    # 
    # account = request.user.account
    # month = form.get_month()
    # obj = list(Contract.isEnabled.filter(account = account, month = month).exclude(status = CONTRACT_STATUS.CLOSED).order_by('-open_time').values('id', 'status', 'type', 'count', 'open_price', 'open_time', 'SL', 'TP', 'stop_price', 'take_price', 'revenu', 'desc' ))

    #------------------------------------------------------
    if not request.user.is_authenticated():
        s = json.dumps({'result': 'ERROR', 'usr' : 'not logged in'}, cls=DjangoJSONEncoder)
        return HttpResponse(s, mimetype='application/json')
    #------------------------------------------------------
    usr = request.user     
    isIncome = request.POST['isIncome'] == 'true' and True or False
    rType = request.POST['type']
    
    startDate = datetime.datetime.fromtimestamp(float(request.POST['startDate']))
    endDate   = datetime.datetime.fromtimestamp(float(request.POST['endDate']))


    # print dir(delta)    
    # print isIncome
    # for t in Transaction.objects.all():
    #     print t.isIncome
    print startDate
    print endDate
    
    obj = dict() 
    if rType == 'category':
        for cat in Cat.objects.all():
            val = (Transaction.objects.filter(Category = cat, isIncome = isIncome, user=usr, date__range = [startDate, endDate]).aggregate(Sum('cost')))['cost__sum']
            obj[cat.name] = val
    else:
        delta = endDate - startDate
        if delta.days <= 31:
            for dt in (startDate + timedelta(n) for n in range(delta.days)):
                val = (Transaction.objects.filter(isIncome = isIncome, user=usr, date__range = [dt, dt]).aggregate(Sum('cost')))['cost__sum']
                obj[time.mktime(dt.timetuple()) * 1000] = val
        else:
            pass 
            # for dt in (startDate + timedelta(n) for n in range(delta.days)):
#                 s = startDate + timedelta(n)
#                 e = startDate + timedelta(n+1)
                # obj[s] = (Transaction.objects.filter(Category = cat, isIncome = isIncome, user=usr, date__range[s, e]).aggregate(Sum('cost')))['cost__sum']
    #------------------------------------------------------
    s = json.dumps({'result': 'OK', 'data' : obj}, cls=DjangoJSONEncoder)
    return HttpResponse(s, mimetype='application/json')


