# serializers.py
from django.contrib.auth import get_user_model

from rest_framework import serializers
from .models import Device,District,Taluk,Village,Customer,PropertyRegistration,Geolocation,PropertyDevice,PropertyDeviceDevice,Project,ProjectGeolocation,DeviceGeoPoint,Property,PropertyGeolocation,PropertyDeviceGeoPoint,CustomUser,Projectpipeline
User = get_user_model()  # Get the actual User model



class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Add write-only password field
    
    class Meta:
        model = CustomUser
        fields = ['id','username', 'email', 'mobile_number', 'address', 'status','company_name', 'customer_type', 'customer_role', 'password', 'created_by']
    
    def create(self, validated_data):
        # Pop the password from validated_data and create the user instance
        password = validated_data.pop('password', None)
        user = super().create(validated_data)
        
        # Set the password and save user
        if password:
            user.set_password(password)
            user.save()
        
        return user

    def update(self, instance, validated_data):
        # Handle password update if provided
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        
        if password:
            user.set_password(password)
            user.save()
        
        return user

        
class DeviceSerializer(serializers.ModelSerializer):
    customer_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), 
        source='customer'
    )
    class Meta:
        model = Device
        fields = ['device_id', 'device_type', 'battery_status','device_status','device_movement','customer_id']
        
class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ['id','name']
        
class TalukSerializer(serializers.ModelSerializer):
    district_name = serializers.SerializerMethodField()

    class Meta:
        model = Taluk
        fields = ['id', 'name', 'district', 'district_name']

    def get_district_name(self, obj):
        return obj.district.name if obj.district else None
    
class VillageSerializer(serializers.ModelSerializer):
    district_name = serializers.SerializerMethodField()
    taluk_name = serializers.SerializerMethodField()


    class Meta:
        model = Village
        fields = ['id', 'name', 'district', 'district_name', 'taluk', 'taluk_name']

    def get_district_name(self, obj):
        return obj.district.name if obj.district else None
    def get_taluk_name(self, obj):
        return obj.taluk.name if obj.taluk else None
    
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['customer_id', 'name', 'email','mobile_number','address','aadhar_number']
        
class GeolocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Geolocation
        fields = ['id', 'latitude', 'longitude']




class ProjectSerializer(serializers.ModelSerializer):
    customer_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), 
        source='customer'
    )
    project_descriptions = serializers.CharField(
        required=False,  # This allows the field to be optional
        allow_null=True,  # This allows the field to accept null values
        allow_blank=True  # This allows the field to accept blank strings
    )

    class Meta:
        model = Project
        fields = ['project_id', 'project_name', 'project_state', 'project_city','project_descriptions', 'customer_id']
        
class ProjectPipelineSerializer(serializers.ModelSerializer):
    # Change to PrimaryKeyRelatedField for write support
    project_id = serializers.IntegerField(source='project.project_id', read_only=True)  # Extract project_id
  
    users = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)
    user_names = serializers.SerializerMethodField()  # Read-only field for user names
    class Meta:
        model = Projectpipeline
        fields = ['project','project_id', 'pipeline_id', 'pipeline_name', 'pipeline_descriptions', 'customer', 'users','user_names']
    def get_user_names(self, obj):
        # Fetch all related users and join their usernames with commas
        return ", ".join([user.username for user in obj.users.all()])
    # Optional validation for pipeline name
    def validate_pipline_name(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("Pipeline name must be at least 3 characters long.")
        return value
    
class ProjectPipelineSerializer__(serializers.ModelSerializer):
    # This will display the user names (assuming `username` is a field in the user model)
    users = serializers.StringRelatedField(many=True)  # This will return the usernames as a list
    user_names = serializers.SerializerMethodField()  # Read-only field for user names

    class Meta:
        model = Projectpipeline
        fields = ['project', 'pipeline_name', 'pipeline_descriptions', 'customer', 'users', 'user_names']
    def get_user_names(self, obj):
        # This method will return a list of user names for the users associated with the pipeline
        return [user.username for user in obj.users.all()]
    # You can add custom validation here if needed
    def validate_pipeline_name(self, value):
        if len(value) < 2:
            raise serializers.ValidationError("Pipeline name must be at least 3 characters long.")
        return value
    
class ProjectGeolocationSerializer(serializers.ModelSerializer):
    pipeline_name = serializers.CharField(source='projectpipeline.pipeline_name', read_only=True)

    class Meta:
        model = ProjectGeolocation
        fields = ['id', 'projectpipeline', 'pipeline_name', 'latitude', 'longitude', 'refference_name']


class PropertyGeolocationSerializer(serializers.ModelSerializer):
    property_name = serializers.CharField(source='property.property_name', read_only=True)

    class Meta:
        model = PropertyGeolocation
        fields = ['id', 'property', 'property_name', 'latitude', 'longitude', 'refference_name']





class DeviceGeoPointSerializer(serializers.ModelSerializer):
    pipeline_name = serializers.CharField(source='projectpipeline.pipeline_name', read_only=True)
    pipeline_id = serializers.CharField(source='projectpipeline.pipeline_id', read_only=True)
    device = serializers.PrimaryKeyRelatedField(queryset=Device.objects.all(), required=False, allow_null=True)  # Allow null and optional
    latitude = serializers.FloatField(source='geolocation.latitude', read_only=True)
    longitude = serializers.FloatField(source='geolocation.longitude', read_only=True)
    device_id = serializers.CharField(source='device.device_id', read_only=True)

    class Meta:
        model = DeviceGeoPoint
        fields = [
            'id',
            'pipeline_name',
            'pipeline_id',
            'device',  # Accept device as a primary key
            'device_id',  # Display the device ID
            'latitude',
            'longitude',
            'device_movement',
            'last_updated'
        ]
        
class PropertyDeviceGeoPointSerializer(serializers.ModelSerializer):
    property_name = serializers.CharField(source='property.property_name', read_only=True)
    device = serializers.PrimaryKeyRelatedField(queryset=Device.objects.all(), required=False, allow_null=True)  # Allow null and optional
    latitude = serializers.FloatField(source='geolocation.latitude', read_only=True)
    longitude = serializers.FloatField(source='geolocation.longitude', read_only=True)
    device_id = serializers.CharField(source='device.device_id', read_only=True)

    class Meta:
        model = PropertyDeviceGeoPoint
        fields = [
            'id',
            'property_name',
            'property_id',
            'device',  # Accept device as a primary key
            'device_id',  # Display the device ID
            'latitude',
            'longitude',
            'device_movement',
            'last_updated'
        ]


class DeviceGeoPointSerializer___working(serializers.ModelSerializer):
    project_name = serializers.CharField(source='project.project_name', read_only=True)
    
    device = serializers.PrimaryKeyRelatedField(queryset=Device.objects.all(), required=False)  # Allow this field to be optional
    latitude = serializers.FloatField(source='geolocation.latitude', read_only=True)
    longitude = serializers.FloatField(source='geolocation.longitude', read_only=True)
    device_id = serializers.CharField(source='device.device_id', read_only=True)
    class Meta:
        model = DeviceGeoPoint
        fields = [
            'id',
            'project_name',
            'device',  # Accept device as a primary key
            'device_id',
            'latitude',
            'longitude',
            'device_movement',
            'last_updated'
        ]


class DeviceGeoPointSerializer11111(serializers.ModelSerializer):
    project_name = serializers.CharField(source='project.project_name', read_only=True)
    device_id = serializers.CharField(source='device.device_id', read_only=True)
   
    latitude = serializers.FloatField(source='geolocation.latitude', read_only=True)
    longitude = serializers.FloatField(source='geolocation.longitude', read_only=True)

    class Meta:
        model = DeviceGeoPoint
        fields = [
            'id', 
            'project_name', 
            'device_id', 
            'latitude', 
            'longitude', 
            'device_movement', 
            'last_updated'
        ]

class PropertySerializer(serializers.ModelSerializer):
    
    district_name = serializers.SerializerMethodField()
    taluk_name = serializers.SerializerMethodField()
    village_name = serializers.SerializerMethodField()
    customer_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), 
        source='customer'
    )
    users = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)
    user_names = serializers.SerializerMethodField()  # Read-only field for user names
    class Meta:
        model = Property
        fields = ['property_id', 'property_name','district', 'district_name', 'taluk', 'taluk_name','village','village_name','survey_number','survey_sub_division','patta_number','area','fmb','customer_id', 'users','user_names']
    def get_user_names(self, obj):
        # Fetch all related users and join their usernames with commas
        return ", ".join([user.username for user in obj.users.all()]) 
    def get_district_name(self, obj):
        return obj.district.name if obj.district else None
    def get_taluk_name(self, obj):
        return obj.taluk.name if obj.taluk else None
    def get_village_name(self, obj):
        return obj.village.name if obj.village else None
  
  
  
class PropertyRegistrationSerializer(serializers.ModelSerializer):
    
    district_name = serializers.SerializerMethodField()
    taluk_name = serializers.SerializerMethodField()
    village_name = serializers.SerializerMethodField()
    geolocations= GeolocationSerializer(many=True, read_only=True)  # Nested serializer for geolocations

    class Meta:
        model = PropertyRegistration
        fields = ['id', 'property_name','district', 'district_name', 'taluk', 'taluk_name','village','village_name','survey_number','survey_sub_division','patta_number','area','fmb', 'geolocations']
         
    def get_district_name(self, obj):
        return obj.district.name if obj.district else None
    def get_taluk_name(self, obj):
        return obj.taluk.name if obj.taluk else None
    def get_village_name(self, obj):
        return obj.village.name if obj.village else None
    
class PropertyDeviceDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyDeviceDevice
        fields = ['id', 'geolocation', 'device', 'property_device']
        # Add 'property_device' to the fields list
        # Explicitly set 'property_device' field to accept nested representations
        # extra_kwargs = {
        #     'property_device': {'write_only': True}
        # }

class PropertyDeviceSerializer(serializers.ModelSerializer):
    
    property_name = serializers.SerializerMethodField()
    survey_number = serializers.SerializerMethodField()
    customer_name = serializers.SerializerMethodField()
    customer_mobile = serializers.SerializerMethodField()
    district_name = serializers.SerializerMethodField()
    taluk_name = serializers.SerializerMethodField()
    village_name = serializers.SerializerMethodField()
    device_names = serializers.SerializerMethodField()  # Change this field name to match the method name
    device_count = serializers.SerializerMethodField()
    devices_info = serializers.SerializerMethodField()

    propertydevice_devices = PropertyDeviceDeviceSerializer(many=True, read_only=True)  

    class Meta:
        model = PropertyDevice
        fields = ['id', 'property_id', 'property_name','survey_number', 'customer_id', 'customer_name', 'customer_mobile', 'taluk_name','district_name', 'village_name', 'device_names',  'device_count', 'devices_info','last_updated','propertydevice_devices']
    
    def get_property_name(self, obj):
        return obj.property_id.property_name if obj.property_id else None
    def get_survey_number(self, obj):
        return obj.property_id.survey_number if obj.property_id else None
     
    def get_customer_name(self, obj):
        try:
            return obj.customer_id.name if obj.customer_id else None
        except AttributeError:
            return None    
    def get_customer_mobile(self, obj):
        return obj.customer_id.mobile_number if obj.customer_id else None
        
    def get_district_name(self, obj):
        return obj.property_id.district.name if obj.property_id else None
    
    def get_taluk_name(self, obj):
        return obj.property_id.taluk.name if obj.property_id else None
    
    def get_village_name(self, obj):
        try:
            return obj.property_id.village.name if obj.property_id and obj.property_id.village else None
        except AttributeError:
            return None


    def get_device_names(self, obj):
        return [device.device_id for device in obj.devices.all()]
    
    def get_device_count(self, obj):
        return obj.devices.count()
    
    def get_devices_info(self, obj):
        devices_info = []
        for device in obj.devices.all():
            devices_info.append({
                'device_id': device.id,
                'device_name': device.device_id,
                # Add other device information fields here as needed
            })
        return devices_info


class PropertyDeviceDeviceSerializerInfo(serializers.ModelSerializer):
    # Define nested serializers for related models
    property_registration = serializers.SerializerMethodField()

    class Meta:
        model = PropertyDeviceDevice
        fields = ['property_device', 'device', 'geolocation', 'last_updated', 'property_registration']

    def get_property_registration1(self, obj):
        # Fetch survey information associated with the property device
        property_registration = PropertyRegistration.objects.get(property_id=obj.property_device.property_id_id)
        return {
            'survey_number': property_registration.survey_number,
            'survey_sub_division': property_registration.survey_sub_division,
            'patta_number': property_registration.patta_number,
            'area': property_registration.area,
            'taluk': property_registration.taluk.name,
            'village': property_registration.village.name,
            'fmb': property_registration.fmb.url  # Assuming you want to include the FMB URL
        }
   


