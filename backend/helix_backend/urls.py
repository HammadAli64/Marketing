from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve

from inquiries.views import health

urlpatterns = [
    # Probes often hit `/` (Railway, load balancers). Avoid 404 here.
    path("", health, name="root_health"),
    path("admin/", admin.site.urls),
    path("api/", include("inquiries.urls")),
    path("api/cms/", include("cms.urls")),
]

_use_cloudinary = getattr(settings, "USE_CLOUDINARY_MEDIA", False)

if settings.DEBUG and not _use_cloudinary:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
elif not _use_cloudinary:
    # Local / disk media in production — use a Railway volume on MEDIA_ROOT for persistence.
    urlpatterns += [
        re_path(
            r"^media/(?P<path>.*)$",
            serve,
            {"document_root": settings.MEDIA_ROOT},
        ),
    ]
# Cloudinary: ImageField.url is a full https://res.cloudinary.com/... URL; no /media/ route needed.
