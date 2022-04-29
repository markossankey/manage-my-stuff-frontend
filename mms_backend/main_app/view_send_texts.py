import boto3
from django.http.response import JsonResponse
import json


AWS_KEY_ID = 'AWS key'
AWS_SECRET_KEY = 'AWS secret'

def send_text_reminders(request):
    body = json.loads(request.body)
    message = 'This is a message that is sent when the sender has not opted in for one.  You have an appointment on '
    successes = []
    
    for _, customer in body.items():
        print(f'\n\n\n\n\n------{customer}------\n\n\n\n\n')
        personalized_message = message + f"{customer['date']} at {customer['start']}."

        client = boto3.client(
            "sns",
            aws_access_key_id=AWS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_KEY,
            region_name="us-east-1"
        )

        client.publish(
            PhoneNumber=f"+1{customer['phoneNumber']}",
            Message=personalized_message,
        )
        successes.append(customer['fullName'])
    return JsonResponse(data=successes, status=200, safe=False)

