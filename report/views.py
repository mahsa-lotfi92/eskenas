#encoding: utf-8

# Create your views here.
import decimal
from dateutil import rrule
from django.shortcuts import render, redirect

from django.db.models import Sum
from django.utils.encoding import smart_str
from django.utils.timezone import is_aware
import math
from cat.models import Cat, BankAccount
from transaction.models import Transaction

from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt

import json
from django.core.serializers.json import DjangoJSONEncoder
from django.utils import simplejson

import datetime
from datetime import timedelta
import time
#from dateutil.relativedelta import relativedelta


from budget.models import Bug
from myprofile.models import userCredit


class DjangoJSONEncoder(simplejson.JSONEncoder):
    """
    JSONEncoder subclass that knows how to encode date/time and decimal types.
    """
    def default(self, o):
        # See "Date Time String Format" in the ECMA-262 specification.
        if isinstance(o, datetime.datetime):
            return time.mktime(o.timetuple()) * 1000
        elif isinstance(o, datetime.date):
            return time.mktime(o.timetuple()) * 1000
        elif isinstance(o, datetime.time):
            if is_aware(o):
                raise ValueError("JSON can't represent timezone-aware times.")
            r = o.isoformat()
            if o.microsecond:
                r = r[:12]
            return r
        elif isinstance(o, decimal.Decimal):
            return str(o)
        else:
            return super(DjangoJSONEncoder, self).default(o)


def general(request):
    if not request.user.is_authenticated():
        return HttpResponseRedirect("/home/")

    usr = request.user
    account = BankAccount.objects.filter(user = usr)

    s = first_day_of_month(datetime.date.today())
    e = next_month(s)

    current = dict()
    for isIncome in [True, False]:
        name = isIncome and u'درآمد' or u'هزینه'
        current[name] = (Transaction.objects.filter(user=usr, isIncome = isIncome, date__range = [s, e]).aggregate(Sum('cost')))['cost__sum']
    #-----------------------------------
    avg = dict(); total = dict()
    for isIncome in [True, False]:
        name = isIncome and u'درآمد' or u'هزینه'
        avg[name] = dict()
        sum = 0; cnt = 0
        for dt in rrule.rrule(rrule.MONTHLY, dtstart=first_day_of_year(datetime.date(2012, 1, 1)), until=datetime.date.today()):
            val = (Transaction.objects.filter(user=usr, isIncome = isIncome, date__range = [dt, next_month(dt)]).aggregate(Sum('cost')))['cost__sum']
            if val > 0 :
                print dt.month
                sum += val
                cnt += 1
        total[name] = (Transaction.objects.filter(user=usr, isIncome = isIncome).aggregate(Sum('cost')))['cost__sum']
        if cnt == 0:
            avg[name] = 0
        else:
            avg[name] = math.floor(sum / cnt)
    data = {"account": account, "current": current, "avg": avg, "total": total}
    #------------------------------------
    bugs = Bug.objects.all()
    for i in bugs:
        i.cost = 0
        for j in Transaction.objects.filter(Category__parentCat=i.bugCat , isIncome=False):
            i.cost += j.cost
        i.per= i.cost * 100.0 / i.limit

    data.update({'cats': Cat.objects.filter(isSub=False, user= usr), 'bugs': bugs, 'myUser': userCredit.objects.get(user= usr)})
    #-------------------------------------
    # print total
    # print avg
    # print current
    return  render(request, 'report.html', data)


def first_day_of_month(d):
    return datetime.date(d.year, d.month, 1)
def next_month(d):
    if d.month == 12:
        return datetime.date(d.year+1, 1, 1)
    else:
        return datetime.date(d.year, d.month+1, 1)

def first_day_of_year(d):
    return datetime.date(d.year, 1, 1)
def next_year(d):
    return datetime.date(d.year+1, 1, 1)


def getTransaction(request):
    print request.POST
    #------------------------------------------------------
    if not request.user.is_authenticated():
        s = json.dumps({'result': 'ERROR', 'usr' : 'not logged in'}, cls=DjangoJSONEncoder)
        return HttpResponse(s, mimetype='application/json')
    #------------------------------------------------------
    usr = request.user
    isIncome = request.POST['isIncome'] == 'true' and True or False
    accountID = int(request.POST['account'])
    catID = int(request.POST['category'])
    startDate = datetime.datetime.fromtimestamp(float(request.POST['startDate']))
    endDate   = datetime.datetime.fromtimestamp(float(request.POST['endDate']))

    baseTran = Transaction.objects.filter(user=usr, isIncome = isIncome, Category__parentCat= catID, date__range= [startDate, endDate])
    if accountID != -1:
        baseTran = baseTran.filter(bankAccount__id = accountID)

    print baseTran

    obj = list(baseTran.order_by('-date').values('isIncome', 'date', 'cost', 'Category__name', 'description', 'bankAccount__name'))
    s = json.dumps({'result': 'OK', 'data' : obj}, cls=DjangoJSONEncoder)

    return HttpResponse(s, mimetype='application/json')


# @csrf_exempt
def monthly(request):
    # print request.POST

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
    accountID = int(request.POST['account'])
    rType = request.POST['type']
    
    startDate = datetime.datetime.fromtimestamp(float(request.POST['startDate']))
    endDate   = datetime.datetime.fromtimestamp(float(request.POST['endDate']))


    # print dir(delta)    
    # print isIncome
    # for t in Transaction.objects.all():
    #     print t.isIncome
    # print startDate
    # print endDate

    baseTran = Transaction.objects.filter(user=usr)
    if accountID != -1:
        baseTran = baseTran.filter(bankAccount__id = accountID)
    if rType == 'category':
        baseTran = baseTran.filter(isIncome = isIncome)

    obj = dict() 
    if rType == 'category':
        for cat in Cat.objects.all():
            val = (baseTran.filter(Category__parentCat= cat, date__range= [startDate, endDate]).aggregate(Sum('cost')))['cost__sum']
            if val > 0:
                obj[cat.name] = val
    else:
        delta = endDate - startDate
        if delta.days <= 31:
            for isIncome in [True, False]:
                name = isIncome and u'درآمد' or u'هزینه'
                obj[name] = dict()
                for dt in (startDate + timedelta(n+1) for n in range(delta.days)):
                    val = (baseTran.filter(isIncome = isIncome, date__range = [dt, dt]).aggregate(Sum('cost')))['cost__sum']
                    obj[name][time.mktime(dt.timetuple()) * 1000] = val
        elif delta.days <= 365 + 185 :
            for isIncome in [True, False]:
                name = isIncome and u'درآمد' or u'هزینه'
                obj[name] = dict()
                for dt in rrule.rrule(rrule.MONTHLY, dtstart=next_month(first_day_of_month(startDate)), until=first_day_of_month(endDate)):
                    print dt, next_month(dt)
                    val = (baseTran.filter(isIncome = isIncome, date__range = [dt, next_month(dt)]).aggregate(Sum('cost')))['cost__sum']
                    obj[name][time.mktime(dt.timetuple()) * 1000] = val
        else:
            first = dict()
            for isIncome in [True, False]:
                name = isIncome and u'درآمد' or u'هزینه'
                obj[name] = dict()
                isFirst = True
                for dt in rrule.rrule(rrule.YEARLY, dtstart=first_day_of_year(startDate), until=first_day_of_year(endDate)):
                    val = (baseTran.filter(isIncome = isIncome, date__range = [dt, next_year(dt)]).aggregate(Sum('cost')))['cost__sum']
                    obj[name][time.mktime(dt.timetuple()) * 1000] = val
                    if val > 0 and isFirst :
                        isFirst = False
                        first[name] = time.mktime(dt.timetuple()) * 1000
            #TOFF
            f = min(first.values())
            for k, d in obj.iteritems():
                for kk in obj[k].keys():
                    if kk < f:
                        del obj[k][kk]

    #------------------------------------------------------
    # print obj
    s = json.dumps({'result': 'OK', 'data' : obj}, cls=DjangoJSONEncoder)
    return HttpResponse(s, mimetype='application/json')
