"""
Populate the database with professional Helix Prime Solutions CMS content.

- Default: only fills empty tables (safe for new installs).
- --reset-professional --yes: removes CMS marketing rows (hero, about, home blocks,
  services, blog posts, social links) and recreates professional defaults.
  Does NOT delete Projects or Inquiries.

Canonical copy lives in `cms.content_defaults` (same text the API merges when tables are empty).
"""

from django.core.management.base import BaseCommand

from cms import content_defaults as cd
from cms.models import (
    AboutSettings,
    BlogPost,
    HeroSettings,
    HomePillar,
    HomeShowcase,
    HomeStat,
    HomeTestimonial,
    Service,
    SocialLink,
)


def _create_professional_content() -> list[str]:
    """Insert full professional dataset. Caller must ensure tables are empty or reset."""
    notes: list[str] = []

    HeroSettings.objects.create(**cd.HERO_SEED)
    notes.append("Home - Hero")

    AboutSettings.objects.create(**cd.ABOUT_SEED)
    notes.append("About page")

    HomeStat.objects.bulk_create([HomeStat(**row) for row in cd.STAT_SEEDS])
    notes.append("Home - Stats")

    HomePillar.objects.bulk_create([HomePillar(**row) for row in cd.PILLAR_SEEDS])
    notes.append("Home - Pillar cards")

    HomeShowcase.objects.bulk_create([HomeShowcase(**row) for row in cd.SHOWCASE_SEEDS])
    notes.append("Home - Showcase blocks")

    HomeTestimonial.objects.bulk_create(
        [HomeTestimonial(**row) for row in cd.TESTIMONIAL_SEEDS]
    )
    notes.append("Home - Testimonials")

    for row in cd.SERVICE_SEEDS:
        Service.objects.create(**row)
    notes.append("Services")

    BlogPost.objects.bulk_create([BlogPost(**row) for row in cd.BLOG_POST_SEEDS])
    notes.append("Blog posts")

    SocialLink.objects.bulk_create(
        [
            SocialLink(platform=plat, url=url, label=label, order=order)
            for plat, url, label, order in cd.SOCIAL_SEEDS_ORM
        ]
    )
    notes.append("Social links")

    return notes


def _seed_if_empty_notes() -> list[str]:
    notes: list[str] = []

    if not HeroSettings.objects.exists():
        HeroSettings.objects.create(**cd.HERO_SEED)
        notes.append("Home - Hero")

    if not AboutSettings.objects.exists():
        AboutSettings.objects.create(**cd.ABOUT_SEED)
        notes.append("About page")

    if not HomeStat.objects.exists():
        HomeStat.objects.bulk_create([HomeStat(**row) for row in cd.STAT_SEEDS])
        notes.append("Home - Stats")

    if not HomePillar.objects.exists():
        HomePillar.objects.bulk_create([HomePillar(**row) for row in cd.PILLAR_SEEDS])
        notes.append("Home - Pillar cards")

    if not HomeShowcase.objects.exists():
        HomeShowcase.objects.bulk_create(
            [HomeShowcase(**row) for row in cd.SHOWCASE_SEEDS]
        )
        notes.append("Home - Showcase blocks")

    if not HomeTestimonial.objects.exists():
        HomeTestimonial.objects.bulk_create(
            [HomeTestimonial(**row) for row in cd.TESTIMONIAL_SEEDS]
        )
        notes.append("Home - Testimonials")

    if not Service.objects.exists():
        for row in cd.SERVICE_SEEDS:
            Service.objects.create(**row)
        notes.append("Services")

    if not BlogPost.objects.exists():
        BlogPost.objects.bulk_create([BlogPost(**row) for row in cd.BLOG_POST_SEEDS])
        notes.append("Blog posts")

    if not SocialLink.objects.exists():
        SocialLink.objects.bulk_create(
            [
                SocialLink(platform=plat, url=url, label=label, order=order)
                for plat, url, label, order in cd.SOCIAL_SEEDS_ORM
            ]
        )
        notes.append("Social links")

    return notes


class Command(BaseCommand):
    help = (
        "Seed CMS with professional Helix Prime content. "
        "Use --reset-professional --yes to replace existing marketing data (keeps Projects)."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset-professional",
            action="store_true",
            help="Delete CMS marketing rows and recreate professional defaults.",
        )
        parser.add_argument(
            "--yes",
            action="store_true",
            help="Required with --reset-professional (confirmation).",
        )

    def handle(self, *args, **options):
        reset = options["reset_professional"]
        confirmed = options["yes"]

        if reset and not confirmed:
            self.stderr.write(
                self.style.ERROR(
                    "Refusing to reset without --yes. "
                    "Run: python manage.py seed_cms --reset-professional --yes"
                )
            )
            return

        if reset:
            self.stdout.write(
                self.style.WARNING(
                    "Removing CMS marketing content (Hero, About, home blocks, services, "
                    "blogs, social). Projects and Inquiries are NOT deleted."
                )
            )
            SocialLink.objects.all().delete()
            BlogPost.objects.all().delete()
            Service.objects.all().delete()
            HomeTestimonial.objects.all().delete()
            HomeShowcase.objects.all().delete()
            HomePillar.objects.all().delete()
            HomeStat.objects.all().delete()
            HeroSettings.objects.all().delete()
            AboutSettings.objects.all().delete()

            notes = _create_professional_content()
            self.stdout.write(
                self.style.SUCCESS(
                    "Replaced with professional content: " + ", ".join(notes) + "."
                )
            )
            self.stdout.write(
                "Open http://127.0.0.1:8000/admin/ (CMS section) to review and upload images."
            )
            return

        notes = _seed_if_empty_notes()

        if notes:
            self.stdout.write(
                self.style.SUCCESS("Created: " + ", ".join(notes) + ".")
            )
            self.stdout.write(
                "Open http://127.0.0.1:8000/admin/ (CMS section). "
                "To replace ALL marketing copy with this professional set, run:\n"
                "  python manage.py seed_cms --reset-professional --yes"
            )
        else:
            self.stdout.write(
                self.style.WARNING(
                    "Nothing to seed - CMS already has data. "
                    "Use --reset-professional --yes to replace marketing content, "
                    "or edit rows in admin."
                )
            )
