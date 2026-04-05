from django.db import models


class HeroSettings(models.Model):
    """Single record — home hero (headline, background image, CTAs)."""

    eyebrow = models.CharField(
        max_length=160,
        blank=True,
        default="USA-market software partner",
        help_text="Small line above the headline.",
    )
    headline = models.CharField(max_length=400)
    subheadline = models.TextField(blank=True)
    background_image = models.ImageField(
        upload_to="site/hero/",
        blank=True,
        null=True,
        help_text="Full-width hero background (wide image recommended).",
    )
    cta_primary_label = models.CharField(max_length=80, default="Book a Call")
    cta_primary_link = models.CharField(max_length=500, default="/contact")
    cta_secondary_label = models.CharField(max_length=80, blank=True, default="Explore services")
    cta_secondary_link = models.CharField(max_length=500, blank=True, default="/services")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Home — Hero"
        verbose_name_plural = "Home — Hero"

    def __str__(self):
        return "Home hero"


class HomePillar(models.Model):
    """Trust / value cards under the hero."""

    title = models.CharField(max_length=120)
    body = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Home — Pillar card"
        verbose_name_plural = "Home — Pillar cards"

    def __str__(self):
        return self.title


class HomeShowcase(models.Model):
    """Image + copy sections on the home page."""

    title = models.CharField(max_length=200)
    body = models.TextField(blank=True)
    image = models.ImageField(upload_to="site/home/", blank=True, null=True)
    image_alt = models.CharField(max_length=200, blank=True)
    image_on_right = models.BooleanField(
        default=False,
        help_text="If checked, image appears on the right on desktop.",
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Home — Showcase block"
        verbose_name_plural = "Home — Showcase blocks"

    def __str__(self):
        return self.title


class HomeStat(models.Model):
    """Optional metrics row (e.g. 50+ projects)."""

    value = models.CharField(max_length=40, help_text='e.g. "50+" or "99%"')
    label = models.CharField(max_length=120)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Home — Stat"
        verbose_name_plural = "Home — Stats"

    def __str__(self):
        return f"{self.value} {self.label}"


class HomeTestimonial(models.Model):
    """Client quotes for the home page marquee."""

    client_name = models.CharField(max_length=120)
    role_title = models.CharField(
        max_length=200,
        blank=True,
        help_text="Role or company, e.g. VP Ops, Acme Inc.",
    )
    quote = models.TextField()
    stars = models.PositiveSmallIntegerField(
        default=5,
        help_text="1–5 (shown as star rating).",
    )
    is_published = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Home — Testimonial"
        verbose_name_plural = "Home — Testimonials"

    def __str__(self):
        return f"{self.client_name} ({self.stars}★)"


class Service(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=220)
    summary = models.TextField()
    detail = models.TextField(
        blank=True,
        help_text="Detail page: separate paragraphs with a blank line between them.",
    )
    bullets = models.TextField(
        blank=True,
        help_text="One bullet per line (shown on Services page).",
    )
    icon_image = models.ImageField(upload_to="services/icons/", blank=True, null=True)
    cover_image = models.ImageField(
        upload_to="services/covers/",
        blank=True,
        null=True,
        help_text="Card / listing image (recommended).",
    )
    hero_image = models.ImageField(
        upload_to="services/hero/",
        blank=True,
        null=True,
        help_text="Optional wide image on the service detail page.",
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title

    def bullet_list(self) -> list[str]:
        return [b.strip() for b in self.bullets.splitlines() if b.strip()]

    def detail_paragraphs(self) -> list[str]:
        raw = (self.detail or "").strip()
        if raw:
            parts = [p.strip() for p in raw.replace("\r\n", "\n").split("\n\n")]
            return [p for p in parts if p]
        if self.summary:
            return [self.summary.strip()]
        return []


class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=220)
    category = models.CharField(max_length=120)
    excerpt = models.TextField(help_text="Short text for portfolio cards.")
    body = models.TextField(
        help_text="Detail page: separate paragraphs with a blank line between them.",
    )
    cover_image = models.ImageField(upload_to="projects/covers/")
    hero_image = models.ImageField(
        upload_to="projects/hero/",
        blank=True,
        null=True,
        help_text="Optional wide image at top of project detail page.",
    )
    is_published = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-id"]

    def __str__(self):
        return self.title

    def body_paragraphs(self) -> list[str]:
        parts = [p.strip() for p in self.body.replace("\r\n", "\n").split("\n\n")]
        return [p for p in parts if p]


class ProjectGalleryImage(models.Model):
    project = models.ForeignKey(
        Project,
        related_name="gallery_images",
        on_delete=models.CASCADE,
    )
    image = models.ImageField(upload_to="projects/gallery/")
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Project gallery image"
        verbose_name_plural = "Project gallery images"

    def __str__(self):
        return self.caption or f"Image for {self.project_id}"


class AboutSettings(models.Model):
    """Single record — About page hero + copy."""

    hero_title = models.CharField(max_length=300)
    hero_subtitle = models.TextField(blank=True)
    hero_background_image = models.ImageField(
        upload_to="site/about/",
        blank=True,
        null=True,
    )
    intro = models.TextField(blank=True)
    mission_title = models.CharField(max_length=200, default="Our mission")
    mission_body = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "About page"
        verbose_name_plural = "About page"

    def __str__(self):
        return "About page"


class AboutImage(models.Model):
    about = models.ForeignKey(
        AboutSettings,
        related_name="images",
        on_delete=models.CASCADE,
    )
    image = models.ImageField(upload_to="about/gallery/")
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "About gallery image"
        verbose_name_plural = "About gallery images"

    def __str__(self):
        return self.caption or f"Image {self.pk}"


class BlogPost(models.Model):
    """Marketing blog posts — cards on home, full page at /blogs/<slug>/."""

    title = models.CharField(max_length=300)
    slug = models.SlugField(unique=True, max_length=320)
    description = models.TextField(help_text="Short summary for cards and SEO.")
    bullets = models.TextField(
        blank=True,
        help_text="One bullet per line (shown on cards and article intro).",
    )
    body = models.TextField(
        blank=True,
        help_text="Full article: separate paragraphs with a blank line between them.",
    )
    cover_image = models.ImageField(
        upload_to="blog/covers/",
        blank=True,
        null=True,
        help_text="Card / header image (recommended).",
    )
    is_published = models.BooleanField(default=True)
    published_at = models.DateTimeField(
        blank=True,
        null=True,
        help_text="Optional display date on the article.",
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-published_at", "-id"]
        verbose_name = "Blog post"
        verbose_name_plural = "Blog posts"

    def __str__(self):
        return self.title

    def bullet_list(self) -> list[str]:
        return [b.strip() for b in self.bullets.splitlines() if b.strip()]

    def body_paragraphs(self) -> list[str]:
        raw = (self.body or "").strip()
        if not raw:
            return []
        parts = [p.strip() for p in raw.replace("\r\n", "\n").split("\n\n")]
        return [p for p in parts if p]
