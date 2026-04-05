import json
import logging

from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Inquiry

logger = logging.getLogger(__name__)

MAX_MESSAGE = 8000


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def contact_submit(request):
    if request.method == "OPTIONS":
        return JsonResponse({})

    try:
        data = json.loads(request.body.decode("utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"ok": False, "error": "Invalid JSON."}, status=400)

    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    company = (data.get("company") or "").strip()[:200]
    phone = (data.get("phone") or "").strip()[:50]
    service = (data.get("service") or "").strip()[:120]
    message = (data.get("message") or "").strip()

    if not name or not email or not message:
        return JsonResponse(
            {"ok": False, "error": "Name, email, and message are required."},
            status=400,
        )

    if len(message) > MAX_MESSAGE:
        return JsonResponse(
            {"ok": False, "error": f"Message must be under {MAX_MESSAGE} characters."},
            status=400,
        )

    inquiry = Inquiry.objects.create(
        name=name[:200],
        email=email[:254],
        company=company,
        phone=phone,
        service=service,
        message=message,
    )

    subject = f"[Helix Prime] Inquiry from {name}"
    body = (
        f"Name: {inquiry.name}\n"
        f"Email: {inquiry.email}\n"
        f"Company: {inquiry.company or '—'}\n"
        f"Phone: {inquiry.phone or '—'}\n"
        f"Service interest: {inquiry.service or '—'}\n\n"
        f"Message:\n{inquiry.message}\n"
    )
    recipient = settings.CONTACT_RECIPIENT_EMAIL

    if settings.EMAIL_HOST_USER and settings.EMAIL_HOST_PASSWORD:
        try:
            send_mail(
                subject,
                body,
                settings.DEFAULT_FROM_EMAIL,
                [recipient],
                fail_silently=False,
            )
        except Exception:
            logger.exception("Failed to send inquiry email")
            return JsonResponse(
                {
                    "ok": False,
                    "error": "We could not send your message. Please try again or email us directly.",
                },
                status=500,
            )
    else:
        logger.warning(
            "EMAIL_HOST_USER/PASSWORD not set — inquiry saved but no email sent."
        )

    return JsonResponse({"ok": True, "id": inquiry.id})
