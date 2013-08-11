#encoding: utf-8
from django import forms
from django.forms.models import ModelForm

from django.core import  validators
from django.contrib.auth.models import User

import re
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

from django.forms.fields import ChoiceField, MultipleChoiceField
from django.forms.widgets import CheckboxSelectMultiple

from helper.models import Month
from contract.models import Contract, CONTRACT_STATUS

class SimpleNamaad(forms.Form):
    namaad = forms.CharField(max_length=15, required=True)
    cid = forms.IntegerField(required=True)
    count = forms.IntegerField(min_value = 1, required=True)
    
    def __init__(self, account, *args, **kwargs):
        super(SimpleContract, self).__init__(*args, **kwargs)
        self.account = account 
    
    def clean_cid(self):
        cid = self.cleaned_data["cid"]
        try:
            Contract.isEnabled.get(pk = cid)
        except:
            raise validators.ValidationError(u'قرارداد انتخابی صحیح نمی‌باشد')
        return cid 
    
    def clean_count(self):
        count = self.cleaned_data["count"]
        if count > Contract.isEnabled.get(pk = self.cleaned_data['cid']).count:
            raise validators.ValidationError(u'تعداد صحیح نمی‌باشد')
        return count
    
    def clean(self):
        cleaned_data = super(SimpleContract, self).clean()
        try:
            Contract.isEnabled.get(pk = cleaned_data['cid'], account = self.account)
        except:
            raise validators.ValidationError(u'به این قرارداد دسترسی ندارید')
        return cleaned_data 

    def get_month(self):
        namaad = self.cleaned_data["namaad"]
        return Month.isEnabled.get(namaad = namaad)
    
# 
# class AddContract(ModelForm):
#     count = forms.IntegerField(min_value = 1, required=True) 
#     open_price  = forms.IntegerField(min_value = 1000, required=True)
#      
#     SL = forms.IntegerField(min_value = 1000, required=False) 
#     TP = forms.IntegerField(min_value = 1000, required=False)
#     
#     type = forms.IntegerField(min_value = 0, max_value = 1, required=True)
#     namaad = forms.CharField(max_length=15, required=True) 
#     
#     desc = forms.CharField(max_length=300, required=False)
#     topList = forms.BooleanField(initial=False, required=False) ;
#     
#     class Meta:
#         model = Contract
#         fields = ('type', 'count', 'open_price', 'SL', 'TP', 'desc' ) 
# 
#     def clean_namaad(self):
#         namaad = self.cleaned_data["namaad"]
#         try:
#             month = Month.isEnabled.get(namaad = namaad)
#         except:
#             raise validators.ValidationError(u'ماه انتخابی صحیح نمی‌باشد')
#         return namaad
#     
#     def get_month(self):
#         namaad = self.cleaned_data["namaad"]
#         return Month.isEnabled.get(namaad = namaad)
#     
#     def isTopList(self):
#         return self.cleaned_data["topList"]
#     
