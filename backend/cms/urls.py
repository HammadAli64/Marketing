from django.urls import path

from . import views

urlpatterns = [
    path("home/", views.home_payload, name="cms_home"),
    path("services/slugs/", views.service_slugs, name="cms_service_slugs"),
    path("services/<slug:slug>/", views.service_detail, name="cms_service_detail"),
    path("services/", views.services_list, name="cms_services"),
    path("projects/", views.projects_list, name="cms_projects"),
    path("projects/slugs/", views.project_slugs, name="cms_project_slugs"),
    path("projects/<slug:slug>/", views.project_detail, name="cms_project_detail"),
    path("about/", views.about_payload, name="cms_about"),
    path("blogs/slugs/", views.blog_slugs, name="cms_blog_slugs"),
    path("blogs/<slug:slug>/", views.blog_detail, name="cms_blog_detail"),
    path("blogs/", views.blogs_list, name="cms_blogs"),
]
