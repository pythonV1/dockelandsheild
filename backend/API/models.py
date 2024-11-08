from django.contrib.auth.models import AbstractUser, Group, Permission, User
from django.db import models
from django.conf import settings


class CustomUser(AbstractUser):
    class Meta:
        db_table = 'api_customuser'  # Explicitly set the table name (lowercase)
    
    groups = models.ManyToManyField(
        Group,
        related_name="customuser_set",  # Set a unique related_name to avoid conflicts
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="customuser_permissions_set",  # Set a unique related_name
        blank=True
    )
    mobile_number = models.CharField(max_length=15)
    address = models.TextField()

    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')

    CUSTOMER_TYPE_CHOICES = [
        ('property', 'Property'),
        ('project', 'Project')
    ]
    customer_type = models.CharField(max_length=10, choices=CUSTOMER_TYPE_CHOICES)
    
    CUSTOMER_ROLE_CHOICES = [
        ('django', 'Django Admin'),
        ('super', 'Super'),
        ('manager', 'Manager')
    ]
    customer_role = models.CharField(max_length=10, choices=CUSTOMER_ROLE_CHOICES)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # Reference the user model
        on_delete=models.SET_NULL,  # Set to NULL if the creator is deleted
        null=True,
        blank=True,
        related_name='created_customers'
    )

    def __str__(self):
        return self.username


class DeviceType(models.Model):
    name = models.CharField(max_length=100)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
class Device(models.Model):
    device_id = models.CharField(max_length=100, unique=True)  # Make device_id unique
    device_type = models.ForeignKey(DeviceType, on_delete=models.CASCADE)  # ForeignKey to DeviceType model
    battery_status = models.CharField(max_length=100, default='')
    device_status = models.BooleanField(default=False)  # BooleanField
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='device')
    
    def __str__(self):
        return f"{self.device_id} - {self.device_type.name}"

class Project(models.Model):
    project_id = models.AutoField(primary_key=True)
    project_name = models.CharField(max_length=100)
    project_state = models.CharField(max_length=100)
    project_city = models.CharField(max_length=100)
    project_descriptions = models.CharField(max_length=100)
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='projects')


class ProjectGeolocation(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, to_field='project_id')
    latitude = models.FloatField()
    longitude = models.FloatField()
    refference_name = models.CharField(max_length=100)

    def __str__(self):
        return f"Location for {self.project.project_name}"
    
class DeviceGeoPoint(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, to_field='project_id')
    device = models.OneToOneField(Device, on_delete=models.CASCADE, null=True, blank=True)  # Use OneToOneField instead of ForeignKey
    geolocation = models.ForeignKey(ProjectGeolocation, on_delete=models.CASCADE)
    device_movement = models.IntegerField(default=0)
    last_updated = models.DateField(auto_now=True)

    def __str__(self):
        return f"Location for {self.project.project_name}"

class DeviceGeoPointworkingold(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, to_field='project_id')
    device = models.ForeignKey(Device, on_delete=models.CASCADE, null=True, blank=True)
    geolocation = models.ForeignKey(ProjectGeolocation, on_delete=models.CASCADE)
    device_movement = models.IntegerField(default=0)
    last_updated = models.DateField(auto_now=True)

    def __str__(self):
        return f"Location for {self.project.project_name}"
   
class DeviceStatus(models.Model):
    device_id = models.CharField(max_length=100)
    battery_status = models.CharField(max_length=100, default='')
    device_status = models.BooleanField(default=False)  # BooleanField
    device_log = models.CharField(max_length=100)
    device_lat = models.CharField(max_length=100)
    device_gforce = models.CharField(max_length=100)
    device_movement = models.IntegerField(default=0)
   
class District(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Taluk(models.Model):
    name = models.CharField(max_length=100)
    district = models.ForeignKey(District, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
class Village(models.Model):
    name = models.CharField(max_length=100)
    taluk = models.ForeignKey('Taluk', on_delete=models.CASCADE)
    district = models.ForeignKey('District', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
############### Property start    
    
class Property(models.Model):
    property_id = models.AutoField(primary_key=True)
    property_name = models.CharField(max_length=100)
    district = models.ForeignKey(District, on_delete=models.CASCADE)
    village = models.ForeignKey(Village, on_delete=models.CASCADE)
    taluk = models.ForeignKey(Taluk, on_delete=models.CASCADE)
    survey_number = models.CharField(max_length=100)
    survey_sub_division = models.CharField(max_length=100)
    patta_number = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    fmb = models.FileField(upload_to='fmb_pdfs')
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='property')
  
   
class PropertyGeolocation(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, to_field='property_id')
    latitude = models.FloatField()
    longitude = models.FloatField()
    refference_name = models.CharField(max_length=100)

    def __str__(self):
        return f"Location for {self.property.property_name}" 
    

class PropertyDeviceGeoPoint(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, to_field='property_id')
    device = models.OneToOneField(Device, on_delete=models.CASCADE, null=True, blank=True)  # Use OneToOneField instead of ForeignKey
    geolocation = models.ForeignKey(PropertyGeolocation, on_delete=models.CASCADE)
    device_movement = models.IntegerField(default=0)
    last_updated = models.DateField(auto_now=True)

    def __str__(self):
        return f"Location for {self.property.property_name}"
    
    
############### Property end



class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, null=True, blank=True)
    mobile_number = models.CharField(max_length=15)
    address = models.TextField()
    aadhar_number = models.CharField(max_length=12, unique=True)

    def __str__(self):
        return self.name
    


class PropertyRegistration(models.Model):
    property_id = models.CharField(max_length=100)
    property_name = models.CharField(max_length=100)
    district = models.ForeignKey(District, on_delete=models.CASCADE)
    village = models.ForeignKey(Village, on_delete=models.CASCADE)
    taluk = models.ForeignKey(Taluk, on_delete=models.CASCADE)
    survey_number = models.CharField(max_length=100)
    survey_sub_division = models.CharField(max_length=100)
    patta_number = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    fmb = models.FileField(upload_to='fmb_pdfs')

    def save(self, *args, **kwargs):
        if not self.property_id:
            last_property = PropertyRegistration.objects.order_by('-id').first()
            if last_property:
                last_property_id = int(last_property.property_id)
                self.property_id = str(last_property_id + 1000)
            else:
                self.property_id = '1000'

        super(PropertyRegistration, self).save(*args, **kwargs)

    def __str__(self):
        return self.property_id
       
class Geolocation(models.Model):
    property_registration = models.ForeignKey(PropertyRegistration, related_name='geolocations', on_delete=models.CASCADE)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return f"Location for {self.property_registration.property_name}"
    
    
class PropertyDevice(models.Model):
    property_id = models.ForeignKey(PropertyRegistration, on_delete=models.CASCADE)
    customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    devices = models.ManyToManyField(Device, through='PropertyDeviceDevice')
    updated = models.DateField(auto_now=True)  # Add this line
    last_updated = models.DateField(auto_now=True)  # Add this line
    
class PropertyDeviceDevice(models.Model):
    property_device = models.ForeignKey(PropertyDevice, on_delete=models.CASCADE)
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    device_state = models.CharField(max_length=100)
    device_location = models.ForeignKey(PropertyGeolocation, on_delete=models.CASCADE)

    class Meta:
        db_table = 'api_propertydevicedevice'  # Set the lowercase table name