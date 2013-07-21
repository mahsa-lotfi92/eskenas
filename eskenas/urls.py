from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
     url(r'^admin/', include(admin.site.urls)),
     url(r'^cat/$', 'cat.views.catForm'),
     url(r'^transaction/$', 'transaction.views.transaction'),
	 url(r'^transaction/add/$', 'transaction.views.addTransaction'),
     url(r'^transaction/delete/$', 'transaction.views.deleteTransaction'),
     url(r'^transaction/edit/$', 'transaction.views.editTransaction')
)
