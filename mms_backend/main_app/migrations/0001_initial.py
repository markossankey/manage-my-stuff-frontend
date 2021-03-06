# Generated by Django 4.0.4 on 2022-04-16 17:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=24)),
                ('last_name', models.CharField(max_length=36)),
                ('phone_number', models.CharField(max_length=10, null=True)),
                ('proprietor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='customers', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('first_name', 'last_name', 'phone_number')},
            },
        ),
    ]
