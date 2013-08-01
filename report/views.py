# Create your views here.
from django.shortcuts import render, redirect

from django.db.models import Sum
from cat.models import Cat
from transaction.models import Transaction

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

import datetime
import time

import json
from django.core.serializers.json import DjangoJSONEncoder
from django.utils import simplejson

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

    obj = dict() 
    for cat in Cat.objects.all():
        val = (Transaction.objects.filter(Category = cat, isIncome = True).aggregate(Sum('cost')))['cost__sum']
        obj[cat.name] = val

    s = json.dumps({'result': 'OK', 'data' : obj}, cls=DjangoJSONEncoder)
    return HttpResponse(s, mimetype='application/json')


