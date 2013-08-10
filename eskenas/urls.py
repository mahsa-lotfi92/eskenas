from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
     url(r'^admin/', include(admin.site.urls)),
	
     url(r'^cat/$', 'cat.views.catForm'),
     url(r'^transaction/$', 'transaction.views.transaction'),
	 url(r'^transaction/add/$', 'transaction.views.addTransaction'),
     url(r'^transaction/delete/$', 'transaction.views.deleteTransaction'),
     url(r'^transaction/edit/$', 'transaction.views.editTransaction'),
	 url(r'^profile/$', 'myprofile.views.profile'),
     url(r'^profile/edit$', 'myprofile.views.edit'),
     url(r'^profile/changepass$', 'myprofile.views.changePass'),
	 url(r'^home/$', 'myprofile.views.myLogin'),
     url(r'^home/register/$', 'myprofile.views.register'),
     url(r'^report/$', 'report.views.general'),
     url(r'^ajax/monthly_report/$', 'report.views.monthly'),
     url(r'^budget/$', 'budget.views.budgetForm'),
     url(r'^budget/add/$', 'budget.views.budgetAdd'),
     url(r'^budget/del/$', 'budget.views.budgetDel'),
     url(r'^budget/edit/$', 'budget.views.budgetEdit'),
)

