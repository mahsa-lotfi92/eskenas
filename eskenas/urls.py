from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
     url(r'^admin/', include(admin.site.urls)),

     url(r'^$', 'myprofile.views.index'),
     url(r'^home/$', 'myprofile.views.myLogin'),
     url(r'^home/register/$', 'myprofile.views.register'),
     
     url(r'^transaction/$', 'transaction.views.transaction'),
     url(r'^transaction/add/$', 'transaction.views.addTransaction'),
     url(r'^transaction/delete/$', 'transaction.views.deleteTransaction'),
     url(r'^transaction/edit/$', 'transaction.views.editTransaction'),
     url(r'^transaction/addBankAccount/$', 'transaction.views.bankAccountAdd'),
     url(r'^transaction/delBankAccount/$', 'transaction.views.bankAccountDel'),
     url(r'^transaction/editBankAccount/$', 'transaction.views.bankAccountEdit'),

     url(r'^auto_transaction/add/$', 'transaction.views.addAutoTransaction'),
     url(r'^auto_transaction/delete/$', 'transaction.views.deleteAutoTransaction'),
     url(r'^auto_transaction/edit/$', 'transaction.views.editAutoTransaction'),
     
     url(r'^logout/$', 'myprofile.views.logout_view'),
     url(r'^profile/edit/$', 'myprofile.views.edit'),
     url(r'^profile/ertegha/$', 'myprofile.views.ertegha'),
     url(r'^profile/tamdid/$', 'myprofile.views.tamdid'),
     url(r'^profile/changepass/$', 'myprofile.views.changePass'),
     url(r'^profile/$', 'myprofile.views.profile'),
     
     url(r'^report/$', 'report.views.general'),
     url(r'^ajax/monthly_report/$', 'report.views.monthly'),
     url(r'^ajax/transaction_report/$', 'report.views.getTransaction'),
     
     url(r'^budget/$', 'budget.views.budgetForm'),
     url(r'^budget/add/$', 'budget.views.budgetAdd'),
     url(r'^budget/del/$', 'budget.views.budgetDel'),
     url(r'^budget/edit/$', 'budget.views.budgetEdit'),


     url(r'^auto_transaction/$', 'transaction.views.autoTransCheck'),
     
)

