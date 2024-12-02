# Generated by Django 4.2 on 2024-11-19 07:21

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


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
            name='Device',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('device_id', models.CharField(max_length=100, unique=True)),
                ('battery_status', models.CharField(default='', max_length=100)),
                ('device_status', models.BooleanField(default=False)),
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
            name='Property',
            fields=[
                ('property_id', models.AutoField(primary_key=True, serialize=False)),
                ('property_name', models.CharField(max_length=100)),
                ('survey_number', models.CharField(max_length=100)),
                ('survey_sub_division', models.CharField(max_length=100)),
                ('patta_number', models.CharField(max_length=100)),
                ('area', models.CharField(max_length=100)),
                ('fmb', models.FileField(upload_to='fmb_pdfs')),
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
            name='Taluk',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('district', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.district')),
            ],
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
                ('company_name', models.CharField(blank=True, max_length=15, null=True)),
                ('company_address', models.TextField(blank=True, null=True)),
                ('address', models.TextField()),
                ('status', models.CharField(choices=[('active', 'Active'), ('inactive', 'Inactive')], default='active', max_length=10)),
                ('customer_type', models.CharField(choices=[('property', 'Property'), ('project', 'Project')], max_length=10)),
                ('customer_role', models.CharField(choices=[('django', 'Django Admin'), ('super', 'Super'), ('manager', 'Manager')], max_length=10)),
                ('created_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='created_customers', to=settings.AUTH_USER_MODEL)),
                ('groups', models.ManyToManyField(blank=True, related_name='customuser_set', to='auth.group')),
                ('user_permissions', models.ManyToManyField(blank=True, related_name='customuser_permissions_set', to='auth.permission')),
            ],
            options={
                'db_table': 'api_customuser',
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
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
                ('taluk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.taluk')),
                ('village', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.village')),
            ],
        ),
        migrations.CreateModel(
            name='PropertyGeolocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('refference_name', models.CharField(max_length=100)),
                ('property', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.property')),
            ],
        ),
        migrations.CreateModel(
            name='PropertyDeviceGeoPoint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('device_movement', models.IntegerField(default=0)),
                ('last_updated', models.DateField(auto_now=True)),
                ('device', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='API.device')),
                ('geolocation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.propertygeolocation')),
                ('property', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.property')),
            ],
        ),
        migrations.CreateModel(
            name='PropertyDeviceDevice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('device_state', models.CharField(default='1', max_length=100)),
                ('device', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='API.device')),
                ('device_location', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='API.propertygeolocation')),
                ('property_device', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.propertydevice')),
            ],
            options={
                'db_table': 'api_propertydevicedevice',
            },
        ),
        migrations.AddField(
            model_name='propertydevice',
            name='devices',
            field=models.ManyToManyField(through='API.PropertyDeviceDevice', to='API.device'),
        ),
        migrations.AddField(
            model_name='propertydevice',
            name='property_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.propertyregistration'),
        ),
        migrations.AddField(
            model_name='property',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='property', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='property',
            name='district',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.district'),
        ),
        migrations.AddField(
            model_name='property',
            name='taluk',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.taluk'),
        ),
        migrations.AddField(
            model_name='property',
            name='village',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.village'),
        ),
        migrations.CreateModel(
            name='Projectpipeline',
            fields=[
                ('pipeline_id', models.AutoField(primary_key=True, serialize=False)),
                ('pipeline_name', models.CharField(max_length=100)),
                ('pipeline_descriptions', models.CharField(max_length=100)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='projectpipelines_as_customer', to=settings.AUTH_USER_MODEL)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.project')),
                ('users', models.ManyToManyField(blank=True, related_name='projectpipelines_as_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ProjectGeolocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('refference_name', models.CharField(max_length=100)),
                ('projectpipeline', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='API.projectpipeline')),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='projects', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Geolocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('property_registration', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='geolocations', to='API.propertyregistration')),
            ],
        ),
        migrations.CreateModel(
            name='DeviceGeoPointworkingold',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('device_movement', models.IntegerField(default=0)),
                ('last_updated', models.DateField(auto_now=True)),
                ('device', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='API.device')),
                ('geolocation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.projectgeolocation')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.project')),
            ],
        ),
        migrations.CreateModel(
            name='DeviceGeoPoint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('device_movement', models.IntegerField(default=0)),
                ('last_updated', models.DateField(auto_now=True)),
                ('device', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='API.device')),
                ('geolocation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.projectgeolocation')),
                ('projectpipeline', models.ForeignKey(blank=True, default=1, null=True, on_delete=django.db.models.deletion.CASCADE, to='API.projectpipeline')),
            ],
        ),
        migrations.AddField(
            model_name='device',
            name='Projectpipeline',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='API.projectpipeline'),
        ),
        migrations.AddField(
            model_name='device',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='device', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='device',
            name='device_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.devicetype'),
        ),
    ]
