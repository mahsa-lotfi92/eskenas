from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
     url(r'^admin/', include(admin.site.urls)),
     url(r'^cat/$', 'cat.views.catForm'),
     url(r'^transaction/$', 'page.views.mainTran'),
)