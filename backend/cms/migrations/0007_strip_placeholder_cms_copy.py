from django.db import migrations

_SHOWCASE_SNIPPETS = (
    "\n\nUpload a supporting image in Admin for this block when ready.",
    "\n\nToggle image position or add imagery from Admin to match your brand.",
)

_BLOG_SNIPPETS = (
    "\n\nReplace this article with your own thought leadership anytime in Admin.",
    "\n\nEdit or extend this post from Django Admin when you are ready.",
)


def strip_placeholder_copy(apps, schema_editor):
    HomeShowcase = apps.get_model("cms", "HomeShowcase")
    BlogPost = apps.get_model("cms", "BlogPost")

    for obj in HomeShowcase.objects.all():
        body = obj.body or ""
        new_body = body
        for snippet in _SHOWCASE_SNIPPETS:
            new_body = new_body.replace(snippet, "")
        if new_body != body:
            obj.body = new_body
            obj.save(update_fields=["body"])

    for obj in BlogPost.objects.all():
        body = obj.body or ""
        new_body = body
        for snippet in _BLOG_SNIPPETS:
            new_body = new_body.replace(snippet, "")
        if new_body != body:
            obj.body = new_body
            obj.save(update_fields=["body"])


class Migration(migrations.Migration):
    dependencies = [
        ("cms", "0006_social_link_whatsapp_choices"),
    ]

    operations = [
        migrations.RunPython(strip_placeholder_copy, migrations.RunPython.noop),
    ]
