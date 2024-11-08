# Generated by Django 5.0.2 on 2024-10-31 15:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectgeolocation',
            name='refference_name',
            field=models.CharField(max_length=100),
        ),
        migrations.CreateModel(
            name='DeviceGeoPoint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('device_movement', models.IntegerField(default=0)),
                ('last_updated', models.DateField(auto_now=True)),
                ('device', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.device')),
                ('geolocation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.projectgeolocation')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.project')),
            ],
        ),
    ]