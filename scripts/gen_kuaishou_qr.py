"""Generate Kuaishou QR code placeholder."""
import qrcode
from qrcode.constants import ERROR_CORRECT_H
import os

OUT_DIR = "/home/z/my-project/public/images/qr"
os.makedirs(OUT_DIR, exist_ok=True)

qr = qrcode.QRCode(
    version=None,
    error_correction=ERROR_CORRECT_H,
    box_size=12,
    border=2,
)
qr.add_data("https://www.kuaishou.com/profile/PLACEHOLDER_REPLACE_ME")
qr.make(fit=True)
img = qr.make_image(fill_color="#1a1a1a", back_color="white")
img.save(os.path.join(OUT_DIR, "kuaishou-qr.png"))
print("✓ Generated: public/images/qr/kuaishou-qr.png")
print("  用户可将其替换为真实快手二维码图片")
