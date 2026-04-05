from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_GET

from .models import (
    AboutSettings,
    BlogPost,
    HeroSettings,
    HomePillar,
    HomeShowcase,
    HomeStat,
    HomeTestimonial,
    Project,
    Service,
    SocialLink,
)


def _media_url(request, filefield):
    if filefield and getattr(filefield, "name", None):
        return request.build_absolute_uri(filefield.url)
    return None


def _service_dict(request, s: Service):
    return {
        "title": s.title,
        "slug": s.slug,
        "summary": s.summary,
        "bullets": s.bullet_list(),
        "icon_image": _media_url(request, s.icon_image),
        "cover_image": _media_url(request, s.cover_image),
    }


def _project_list_dict(request, p: Project):
    return {
        "title": p.title,
        "slug": p.slug,
        "category": p.category,
        "excerpt": p.excerpt,
        "cover_image": _media_url(request, p.cover_image),
    }


@require_GET
def home_payload(request):
    hero = HeroSettings.objects.first()
    hero_out = None
    if hero:
        hero_out = {
            "eyebrow": hero.eyebrow,
            "headline": hero.headline,
            "subheadline": hero.subheadline,
            "background_image": _media_url(request, hero.background_image),
            "cta_primary_label": hero.cta_primary_label,
            "cta_primary_link": hero.cta_primary_link,
            "cta_secondary_label": hero.cta_secondary_label,
            "cta_secondary_link": hero.cta_secondary_link,
        }

    pillars = [
        {"title": p.title, "body": p.body}
        for p in HomePillar.objects.all()
    ]
    showcases = [
        {
            "title": s.title,
            "body": s.body,
            "image": _media_url(request, s.image),
            "image_alt": s.image_alt or s.title,
            "image_on_right": s.image_on_right,
        }
        for s in HomeShowcase.objects.all()
    ]
    stats = [
        {"value": s.value, "label": s.label}
        for s in HomeStat.objects.all()
    ]
    services = [_service_dict(request, s) for s in Service.objects.all()]

    testimonials = [
        {
            "id": t.id,
            "client_name": t.client_name,
            "role_title": t.role_title,
            "quote": t.quote,
            "stars": min(5, max(1, t.stars)),
        }
        for t in HomeTestimonial.objects.filter(is_published=True)
    ]

    return JsonResponse(
        {
            "hero": hero_out,
            "pillars": pillars,
            "showcases": showcases,
            "stats": stats,
            "services": services,
            "testimonials": testimonials,
        }
    )


@require_GET
def services_list(request):
    data = [_service_dict(request, s) for s in Service.objects.all()]
    return JsonResponse({"services": data})


@require_GET
def service_detail(request, slug: str):
    s = get_object_or_404(Service, slug=slug)
    return JsonResponse(
        {
            "title": s.title,
            "slug": s.slug,
            "summary": s.summary,
            "bullets": s.bullet_list(),
            "icon_image": _media_url(request, s.icon_image),
            "cover_image": _media_url(request, s.cover_image),
            "hero_image": _media_url(request, s.hero_image),
            "body_paragraphs": s.detail_paragraphs(),
        }
    )


@require_GET
def service_slugs(request):
    slugs = list(Service.objects.values_list("slug", flat=True))
    return JsonResponse({"slugs": slugs})


@require_GET
def projects_list(request):
    qs = Project.objects.filter(is_published=True)
    data = [_project_list_dict(request, p) for p in qs]
    return JsonResponse({"projects": data})


@require_GET
def project_detail(request, slug: str):
    p = get_object_or_404(Project, slug=slug, is_published=True)
    gallery = [
        {
            "image": _media_url(request, g.image),
            "caption": g.caption,
        }
        for g in p.gallery_images.all()
    ]
    return JsonResponse(
        {
            "title": p.title,
            "slug": p.slug,
            "category": p.category,
            "excerpt": p.excerpt,
            "body_paragraphs": p.body_paragraphs(),
            "cover_image": _media_url(request, p.cover_image),
            "hero_image": _media_url(request, p.hero_image),
            "gallery": gallery,
        }
    )


@require_GET
def about_payload(request):
    a = AboutSettings.objects.first()
    if not a:
        return JsonResponse({"about": None})

    images = [
        {
            "image": _media_url(request, img.image),
            "caption": img.caption,
        }
        for img in a.images.all()
    ]
    return JsonResponse(
        {
            "about": {
                "hero_title": a.hero_title,
                "hero_subtitle": a.hero_subtitle,
                "hero_background_image": _media_url(request, a.hero_background_image),
                "intro": a.intro,
                "mission_title": a.mission_title,
                "mission_body": a.mission_body,
                "images": images,
            }
        }
    )


@require_GET
def project_slugs(request):
    slugs = list(
        Project.objects.filter(is_published=True).values_list("slug", flat=True)
    )
    return JsonResponse({"slugs": slugs})


def _blog_card_dict(request, b: BlogPost):
    return {
        "title": b.title,
        "slug": b.slug,
        "description": b.description,
        "bullets": b.bullet_list(),
        "cover_image": _media_url(request, b.cover_image),
    }


@require_GET
def blogs_list(request):
    q = (request.GET.get("q") or "").strip()
    qs = BlogPost.objects.filter(is_published=True)
    if q:
        qs = qs.filter(title__icontains=q)
    qs = qs.order_by("order", "-published_at", "-id")
    data = [_blog_card_dict(request, b) for b in qs]
    return JsonResponse({"posts": data})


@require_GET
def blog_detail(request, slug: str):
    b = get_object_or_404(BlogPost, slug=slug, is_published=True)
    out = _blog_card_dict(request, b)
    out["body_paragraphs"] = b.body_paragraphs()
    out["published_at"] = b.published_at.isoformat() if b.published_at else None
    return JsonResponse(out)


@require_GET
def blog_slugs(request):
    slugs = list(
        BlogPost.objects.filter(is_published=True).values_list("slug", flat=True)
    )
    return JsonResponse({"slugs": slugs})


@require_GET
def social_links(request):
    items = [
        {
            "id": s.platform,
            "label": (s.label or "").strip() or s.get_platform_display(),
            "href": s.url,
        }
        for s in SocialLink.objects.filter(is_active=True)
    ]
    return JsonResponse({"social": items})
