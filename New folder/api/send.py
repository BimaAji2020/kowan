import smtplib
import ssl
import json

def handler(request):
    if request.method != "POST":
        return {"statusCode": 405, "body": "Method not allowed"}

    data = request.json()

    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    # Email tujuan (milik kamu)
    RECEIVER = "emailkamu@gmail.com"

    # Email pengirim (akun Gmail)
    SENDER = "emailkamu@gmail.com"
    PASSWORD = "YOUR_APP_PASSWORD"  # pakai "App Password" Gmail

    email_message = f"""
    Subject: New Contact Form Message

    From: {name} <{email}>
    Message:
    {message}
    """

    context = ssl.create_default_context()

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(SENDER, PASSWORD)
            server.sendmail(SENDER, RECEIVER, email_message)

        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Message sent successfully!"})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": f"Error: {str(e)}"})
        }
