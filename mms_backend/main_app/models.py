from datetime import datetime
from django.db import models
from django.contrib.auth.models import User
from django.forms import ValidationError 
import time


# Create your models here.

def greater_than_today(date):
    unixDate = time.mktime(date.timetuple())
    now = time.mktime((datetime.now()).timetuple())
    print(f'\n\n\n\n\n------given date{unixDate}------\n\n\n\n\n')
    print(f'\n\n\n\n\n------now{now}------\n\n\n\n\n')
    if unixDate > now:
        return date
    else:
        raise(ValidationError("Date must be after today"))

class Customer(models.Model):
    proprietor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="customers")
    first_name = models.CharField(max_length=24, null=False, blank=False)
    last_name = models.CharField(max_length=36, null=False, blank=False)
    phone_number = models.CharField(max_length=10, null=True, blank=False)

    class Meta:
        unique_together = ("proprietor", "first_name", "last_name", "phone_number")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Appointment(models.Model):
    proprietor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='appointments')
    date = models.DateTimeField(validators=[greater_than_today])
