from django.db import migrations, models


def seed_demo_testimonials(apps, schema_editor):
    HomeTestimonial = apps.get_model("cms", "HomeTestimonial")
    if HomeTestimonial.objects.exists():
        return
    demos = [
        {
            "client_name": "Sarah Chen",
            "role_title": "VP Operations, FinSight Analytics",
            "quote": (
                "Helix Prime shipped a dashboard our US execs actually trust—fast loads, "
                "clear roles, and communication that never went dark."
            ),
            "stars": 5,
            "order": 0,
        },
        {
            "client_name": "James Okonkwo",
            "role_title": "Founder, Northline Health",
            "quote": (
                "They treated HIPAA and UX as one problem, not two. Patient scheduling went "
                "live on time and our clinic staff finally has one system."
            ),
            "stars": 5,
            "order": 1,
        },
        {
            "client_name": "Maria Santos",
            "role_title": "Marketing Director, B2B SaaS",
            "quote": (
                "Technical SEO and site speed moved the needle in weeks. Reports we can "
                "explain to leadership—no jargon shield."
            ),
            "stars": 5,
            "order": 2,
        },
        {
            "client_name": "David Park",
            "role_title": "COO, Pulse Retail",
            "quote": (
                "Mobile app and loyalty flows were delivered with the polish our brand "
                "needed. Async updates made the eight-hour time gap irrelevant."
            ),
            "stars": 5,
            "order": 3,
        },
        {
            "client_name": "Elena Volkov",
            "role_title": "Head of Ops, Atlas Logistics",
            "quote": (
                "Automation cut manual handoffs dramatically. When something breaks, "
                "we know before customers do—that was the real win."
            ),
            "stars": 4,
            "order": 4,
        },
    ]
    for row in demos:
        HomeTestimonial.objects.create(**row)


def unseed(apps, schema_editor):
    HomeTestimonial = apps.get_model("cms", "HomeTestimonial")
    HomeTestimonial.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ("cms", "0002_service_detail_images"),
    ]

    operations = [
        migrations.CreateModel(
            name="HomeTestimonial",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("client_name", models.CharField(max_length=120)),
                (
                    "role_title",
                    models.CharField(
                        blank=True,
                        help_text="Role or company, e.g. VP Ops, Acme Inc.",
                        max_length=200,
                    ),
                ),
                ("quote", models.TextField()),
                (
                    "stars",
                    models.PositiveSmallIntegerField(
                        default=5,
                        help_text="1–5 (shown as star rating).",
                    ),
                ),
                ("is_published", models.BooleanField(default=True)),
                ("order", models.PositiveIntegerField(default=0)),
            ],
            options={
                "verbose_name": "Home — Testimonial",
                "verbose_name_plural": "Home — Testimonials",
                "ordering": ["order", "id"],
            },
        ),
        migrations.RunPython(seed_demo_testimonials, unseed),
    ]
