# Generated by Django 5.0.2 on 2024-11-05 06:05

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0005_property_propertygeolocation_propertydevicegeopoint'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='customer',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='property', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
