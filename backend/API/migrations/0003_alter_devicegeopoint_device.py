# Generated by Django 5.0.2 on 2024-11-04 12:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0002_alter_projectgeolocation_refference_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='devicegeopoint',
            name='device',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='API.device'),
        ),
    ]