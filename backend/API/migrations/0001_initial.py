# Generated by Django 5.0.2 on 2024-10-31 07:56

import django.contrib.auth.models
import django.contrib.auth.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('customer_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('email', models.EmailField(blank=True, max_length=255, null=True)),
                ('mobile_number', models.CharField(max_length=15)),
                ('address', models.TextField()),
                ('aadhar_number', models.CharField(max_length=12, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='DeviceStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('device_id', models.CharField(max_length=100)),
                ('battery_status', models.CharField(default='', max_length=100)),
                ('device_status', models.BooleanField(default=False)),
                ('device_log', models.CharField(max_length=100)),
                ('device_lat', models.CharField(max_length=100)),
                ('device_gforce', models.CharField(max_length=100)),
                ('device_movement', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='DeviceType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('status', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='District',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Geolocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('project_id', models.AutoField(primary_key=True, serialize=False)),
                ('project_name', models.CharField(max_length=100)),
                ('project_state', models.CharField(max_length=100)),
                ('project_city', models.CharField(max_length=100)),
                ('project_descriptions', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Device',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('device_id', models.CharField(max_length=100)),
                ('battery_status', models.CharField(default='', max_length=100)),
                ('device_status', models.BooleanField(default=False)),
                ('device_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.devicetype')),
            ],
        ),
        migrations.CreateModel(
            name='ProjectGeolocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('refference_name', models.FloatField()),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.project')),
            ],
        ),
        migrations.CreateModel(
            name='PropertyDevice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('updated', models.DateField(auto_now=True)),
                ('last_updated', models.DateField(auto_now=True)),
                ('customer_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.customer')),
            ],
        ),
        migrations.CreateModel(
            name='PropertyDeviceDevice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('device_movement', models.IntegerField(default=0)),
                ('last_updated', models.DateField(auto_now=True)),
                ('device', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.device')),
                ('geolocation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.geolocation')),
                ('property_device', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.propertydevice')),
            ],
        ),
        migrations.AddField(
            model_name='propertydevice',
            name='devices',
            field=models.ManyToManyField(through='API.PropertyDeviceDevice', to='API.device'),
        ),
        migrations.CreateModel(
            name='PropertyRegistration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('property_id', models.CharField(max_length=100)),
                ('property_name', models.CharField(max_length=100)),
                ('survey_number', models.CharField(max_length=100)),
                ('survey_sub_division', models.CharField(max_length=100)),
                ('patta_number', models.CharField(max_length=100)),
                ('area', models.CharField(max_length=100)),
                ('fmb', models.FileField(upload_to='fmb_pdfs')),
                ('district', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.district')),
            ],
        ),
        migrations.AddField(
            model_name='propertydevice',
            name='property_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.propertyregistration'),
        ),
        migrations.AddField(
            model_name='geolocation',
            name='property_registration',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='geolocations', to='API.propertyregistration'),
        ),
        migrations.CreateModel(
            name='Taluk',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('district', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.district')),
            ],
        ),
        migrations.AddField(
            model_name='propertyregistration',
            name='taluk',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.taluk'),
        ),
        migrations.CreateModel(
            name='Village',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('district', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.district')),
                ('taluk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.taluk')),
            ],
        ),
        migrations.AddField(
            model_name='propertyregistration',
            name='village',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.village'),
        ),
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('mobile_number', models.CharField(max_length=15)),
                ('address', models.TextField()),
                ('customer_type', models.CharField(choices=[('property', 'Property'), ('project', 'Project')], max_length=10)),
                ('customer_role', models.CharField(choices=[('django', 'Django Admin'), ('super', 'Super'), ('manager', 'Manager')], max_length=10)),
                ('status', models.CharField(choices=[('active', 'Active'), ('inactive', 'Inactive')], default='active', max_length=10)),
                ('groups', models.ManyToManyField(blank=True, related_name='customuser_set', to='auth.group')),
                ('user_permissions', models.ManyToManyField(blank=True, related_name='customuser_permissions_set', to='auth.permission')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='projects', to=settings.AUTH_USER_MODEL),
        ),
    ]
