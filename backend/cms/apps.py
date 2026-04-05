from django.apps import AppConfig


class CmsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "cms"
    verbose_name = "Website content"

    def ready(self):
        from django.contrib import admin

        admin.site.site_header = "Helix Prime CMS"
        admin.site.site_title = "Helix CMS"
        admin.site.index_title = "Manage website content"
