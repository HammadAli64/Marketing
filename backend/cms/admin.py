from django.contrib import admin
from django.utils.html import format_html

from .models import (
    AboutImage,
    AboutSettings,
    BlogPost,
    HeroSettings,
    HomePillar,
    HomeShowcase,
    HomeStat,
    HomeTestimonial,
    Project,
    ProjectGalleryImage,
    Service,
    SocialLink,
)


@admin.register(HeroSettings)
class HeroSettingsAdmin(admin.ModelAdmin):
    list_display = ("__str__", "updated_at")

    def has_add_permission(self, request):
        return not HeroSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


class AboutImageInline(admin.TabularInline):
    model = AboutImage
    extra = 1


@admin.register(AboutSettings)
class AboutSettingsAdmin(admin.ModelAdmin):
    list_display = ("__str__", "updated_at")
    inlines = [AboutImageInline]

    def has_add_permission(self, request):
        return not AboutSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(HomePillar)
class HomePillarAdmin(admin.ModelAdmin):
    list_display = ("title", "order")
    ordering = ("order", "id")


@admin.register(HomeShowcase)
class HomeShowcaseAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "thumb")
    ordering = ("order", "id")

    @admin.display(description="Image")
    def thumb(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="height:40px;width:auto;border-radius:4px" />',
                obj.image.url,
            )
        return "—"


@admin.register(HomeStat)
class HomeStatAdmin(admin.ModelAdmin):
    list_display = ("value", "label", "order")
    ordering = ("order", "id")


@admin.register(HomeTestimonial)
class HomeTestimonialAdmin(admin.ModelAdmin):
    list_display = ("client_name", "role_title", "stars", "is_published", "order")
    list_filter = ("is_published",)
    ordering = ("order", "id")


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "order")
    ordering = ("order", "id")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "summary", "detail")


class ProjectGalleryInline(admin.TabularInline):
    model = ProjectGalleryImage
    extra = 1


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "is_published", "published_at", "order")
    list_filter = ("is_published",)
    ordering = ("order", "-published_at", "-id")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "description", "body")


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ("platform", "url", "is_active", "order")
    list_filter = ("is_active", "platform")
    list_editable = ("order", "is_active")
    ordering = ("order", "id")
    search_fields = ("url", "label")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "category", "is_published", "order")
    list_filter = ("is_published", "category")
    ordering = ("order", "-id")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "excerpt", "body")
    inlines = [ProjectGalleryInline]
