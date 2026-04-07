"""
Verify SMTP from the same settings the contact form uses.

  python manage.py test_contact_email

If this fails, fix EMAIL_* in backend/.env (or Railway variables) before
debugging the browser form.
"""

from django.conf import settings
from django.core.mail import send_mail
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = "Send a test email using Django mail settings (contact form path)."

    def handle(self, *args, **options):
        if not settings.EMAIL_HOST_USER or not settings.EMAIL_HOST_PASSWORD:
            self.stderr.write(
                self.style.ERROR(
                    "EMAIL_HOST_USER and EMAIL_HOST_PASSWORD must be set in the environment."
                )
            )
            self.stderr.write(
                "Inquiry records can still be saved; the form skips SMTP when these are empty."
            )
            return

        to = settings.CONTACT_RECIPIENT_EMAIL
        self.stdout.write(f"SMTP host: {settings.EMAIL_HOST}:{settings.EMAIL_PORT}")
        self.stdout.write(f"From: {settings.DEFAULT_FROM_EMAIL}")
        self.stdout.write(f"To (CONTACT_RECIPIENT_EMAIL): {to}")

        try:
            send_mail(
                subject="[Helix Prime] SMTP test",
                message="If you received this, Django can send mail.",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[to],
                fail_silently=False,
            )
        except Exception as exc:
            raise CommandError(f"SMTP send failed: {exc}") from exc

        self.stdout.write(self.style.SUCCESS(f"Sent. Check inbox (and spam) for {to}."))
