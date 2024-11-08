from django.http import JsonResponse, HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import parser_classes
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from django.db.models import F
from django.contrib.auth import authenticate
from .models import Device, District,Taluk,Village,Customer,PropertyRegistration,PropertyDevice,Geolocation,PropertyDeviceDevice,Project,ProjectGeolocation,DeviceGeoPoint,Property,PropertyGeolocation,PropertyDeviceGeoPoint,CustomUser
from .serializers import DeviceSerializer,DistrictSerializer,TalukSerializer,VillageSerializer,CustomerSerializer,PropertyRegistrationSerializer,GeolocationSerializer,PropertyDeviceSerializer,PropertyDeviceDeviceSerializer,ProjectSerializer,ProjectGeolocationSerializer,DeviceGeoPointSerializer,PropertySerializer,PropertyGeolocationSerializer,PropertyDeviceGeoPointSerializer,CustomUserSerializer
import json
from json.decoder import JSONDecodeError

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes



@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can create customers
def add_customer(request):
    # Set the `created_by` field to the current logged-in user
    request.data['created_by'] = request.user.id
    request.data['customer_role'] ='manager'
    # Initialize the serializer with request data
    serializer = CustomUserSerializer(data=request.data)
    
    # Validate and save the data if valid
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # Return validation errors if data is not valid
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def customers_list_by_customer(request, user_id):
    if request.method == 'GET':
        # Filter customers where `created_by` matches the provided `user_id`
        customers = CustomUser.objects.filter(created_by_id=user_id)
        serializer = CustomUserSerializer(customers, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
def devices_list(request):
    devices = Device.objects.all()
    data = []
    for device in devices:
        device_data = {
            'tab_id': device.id,
            'device_id': device.device_id,
            'device_type': device.device_type.name,  # Assuming 'device_type' is a ForeignKey to your DeviceType model
            'device_type_id': device.device_type.id,
            'battery_status': device.battery_status,
            'device_status': device.device_status
        }
        data.append(device_data)
    return Response(data)



def check_duplicate_device_id(request):
    device_id = request.GET.get('device_id', None)
    
    if device_id:
        # Check if the device ID exists in the database
        is_duplicate = Device.objects.filter(device_id=device_id).exists()
        
        return JsonResponse({'isDuplicate': is_duplicate})
    
    # If device_id is not provided, return an error
    return JsonResponse({'error': 'Device ID is required'}, status=400)

@api_view(['GET'])
def devices_list_by_customer(request, customer_id):
    devices = Device.objects.filter(customer_id=customer_id)
    data = []
    for device in devices:
        device_data = {
            'tab_id': device.id,
            'device_id': device.device_id,
            'device_type': device.device_type.name,  # Assuming 'device_type' is a ForeignKey to your DeviceType model
            'device_type_id': device.device_type.id,
            'battery_status': device.battery_status,
            'device_status': device.device_status
        }
        data.append(device_data)
    return Response(data)

def devices_list_demo(request):
    devices = Device.objects.all()
    serializer = DeviceSerializer(devices, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_device(request):
    print(request.data)
   
    #serializer = DeviceSerializer(data=request.data)
    serializer = DeviceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT', 'PATCH'])
def update_device(request, pk):
    device = get_object_or_404(Device, pk=pk)
    serializer = DeviceSerializer(device, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_device(request, pk):
    device = get_object_or_404(Device, pk=pk)
    device.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def districts_list(request):
    if request.method == 'GET':
        districts = District.objects.all()
        serializer = DistrictSerializer(districts, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def add_district(request):
    serializer = DistrictSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'PATCH'])
def update_district(request, pk):
    district = get_object_or_404(District, pk=pk)
    serializer = DistrictSerializer(instance=district, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_district(request, pk):
    district = get_object_or_404(District, pk=pk)
    district.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def taluks_list(request, district_id=None):
    if request.method == 'GET':
        # Check if district_id is provided
        if district_id is not None:
            # Filter taluks based on the district ID
            taluks = Taluk.objects.filter(district=district_id)
        else:
            # Get all taluks
            taluks = Taluk.objects.all()

        serializer = TalukSerializer(taluks, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def add_taluk(request):
    serializer = TalukSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'PATCH'])
def update_taluk(request, pk):
    taluk = get_object_or_404(Taluk, pk=pk)
    serializer = TalukSerializer(instance=taluk, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_taluk(request, pk):
    taluk = get_object_or_404(Taluk, pk=pk)
    taluk.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def village_list(request, taluk_id=None):
    if request.method == 'GET':
        if taluk_id is not None:
            
            villages = Village.objects.filter(taluk=taluk_id)
        else:
             villages = Village.objects.all()
            
        serializer = VillageSerializer(villages, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def add_village(request):
    serializer = VillageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'PATCH'])
def update_village(request, pk):
    village = get_object_or_404(Village, pk=pk)
    serializer = VillageSerializer(instance=village, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_village(request, pk):
    village = get_object_or_404(Village, pk=pk)
    village.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)




@api_view(['GET'])
def customers_list(request):
    if request.method == 'GET':
        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data)



@api_view(['PUT', 'PATCH'])
def update_customer(request, pk):
    village = get_object_or_404(Customer, pk=pk)
    serializer = CustomerSerializer(instance=village, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_customer(request, pk):
    village = get_object_or_404(Customer, pk=pk)
    village.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
######################################################################

# views.py
from rest_framework import status
from .models import DeviceGeoPoint, Project
from .serializers import DeviceGeoPointSerializer

@api_view(['GET'])
def device_geopoint_list_by_customer(request, customer_id):
    try:
        # Get all projects associated with the given customer ID
        projects = Project.objects.filter(customer_id=customer_id)
        
        # Fetch all DeviceGeoPoint records for those projects
        device_geopoints = DeviceGeoPoint.objects.filter(project__in=projects)
        
        serializer = DeviceGeoPointSerializer(device_geopoints, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Project.DoesNotExist:
        return Response({'error': 'No projects found for this customer'}, status=status.HTTP_404_NOT_FOUND)
    
    
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db import IntegrityError
from .models import DeviceGeoPoint, Device, ProjectGeolocation
from .serializers import DeviceGeoPointSerializer

@api_view(['POST'])
def create_device_geo_points(request):
    # Check if the request data is a list
    if isinstance(request.data, list):
        response_data = []
        for item in request.data:
            # Fetch the related instances
            try:
                device = Device.objects.get(id=item.get('device')) if item.get('device') else None
                geolocation = ProjectGeolocation.objects.get(id=item.get('geolocation'))

                # Create or update the DeviceGeoPoint instance
                device_geo_point, created = DeviceGeoPoint.objects.update_or_create(
                    project_id=item.get('project_id'),
                    geolocation=geolocation,
                    defaults={
                        'device': device,
                        'device_movement': item.get('device_movement', 0)
                    }
                )
                response_data.append(DeviceGeoPointSerializer(device_geo_point).data)

            except Device.DoesNotExist:
                return Response(
                    {"error": "Device does not exist."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            except ProjectGeolocation.DoesNotExist:
                return Response(
                    {"error": "Geolocation does not exist."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            except IntegrityError as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
            except Exception as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Return all successfully saved data
        return Response(response_data, status=status.HTTP_201_CREATED)

    # If data is not a list, return an error
    return Response(
        {"error": "Expected a list of items."},
        status=status.HTTP_400_BAD_REQUEST
    )



@api_view(['POST'])
def create_device_geo_points222222222(request):
    if isinstance(request.data, list):
        response_data = []
        for item in request.data:
            serializer = DeviceGeoPointSerializer(data=item)
            if serializer.is_valid():
                try:
                    # Fetch the Device instance using the device ID
                    device_instance = None
                    device_id = item.get('device')  # Get the device ID from the item
                    if device_id:
                        # Try to get the device instance
                        device_instance = Device.objects.get(id=device_id)  # Ensure device_id is an integer

                    # Update or create the DeviceGeoPoint instance
                    device_geo_point, created = DeviceGeoPoint.objects.update_or_create(
                        project_id=item['project_id'],  # Assuming project_id is unique
                        geolocation=item['geolocation'],  # Also ensure geolocation is unique or appropriately managed
                        defaults={
                            'device': device_instance,  # Assign the device instance here
                            'device_movement': item.get('device_movement', 0)  # Default to 0 if not provided
                        }
                    )
                    response_data.append(serializer.data)
                except Device.DoesNotExist:
                    return Response(
                        {"error": "Device not found."},
                        status=status.HTTP_404_NOT_FOUND
                    )
                except IntegrityError as e:
                    return Response(
                        {"error": str(e)},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(response_data, status=status.HTTP_201_CREATED)

    return Response(
        {"error": "Expected a list of items."},
        status=status.HTTP_400_BAD_REQUEST
    )



@api_view(['POST'])
def create_device_geo_points333333(request):
    if isinstance(request.data, list):
        response_data = []
        for item in request.data:
            # Retrieve project_id and geolocation from the request item
            project_id = item.get('project_id')
            geolocation = item.get('geolocation')
            
            # Fetch the Project instance using project_id (assuming project_id is the primary key)
            project = get_object_or_404(Project, project_id=project_id)
            
            # Check if an existing record with the same project and geolocation exists
            existing_device_geo_point = DeviceGeoPoint.objects.filter(
                project=project, 
                geolocation=geolocation
            ).first()

            # Assign the Project instance to item for the serializer
            item['project'] = project.project_id  # Replace project_id with actual project object

            # Initialize the serializer with item data
            serializer = DeviceGeoPointSerializer(data=item)

            if serializer.is_valid():
                if existing_device_geo_point:
                    # Update the existing record's fields
                    for attr, value in item.items():
                        if attr != 'project':  # Skip setting project again directly
                            setattr(existing_device_geo_point, attr, value)
                    existing_device_geo_point.project = project  # Assign project instance
                    existing_device_geo_point.save()
                    response_data.append(DeviceGeoPointSerializer(existing_device_geo_point).data)
                else:
                    try:
                        # Create a new record with the Project instance
                        serializer.save(project=project)
                        response_data.append(serializer.data)
                    except IntegrityError as e:
                        return Response(
                            {"error": str(e)},
                            status=status.HTTP_400_BAD_REQUEST
                        )
            else:
                # Return validation errors for each item in the list
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(response_data, status=status.HTTP_201_CREATED)

    return Response(
        {"error": "Expected a list of items."},
        status=status.HTTP_400_BAD_REQUEST
    )



@api_view(['POST'])
def create_device_geo_points_____(request):
    if request.method == 'POST':
        data = request.data  # Expecting a list of DeviceGeoPoint data
        if isinstance(data, list):
            # Check if each entry has the project_id
            for item in data:
                if 'project_id' not in item or item['project_id'] is None:
                    return Response({"error": "project_id cannot be null22"}, status=status.HTTP_400_BAD_REQUEST)

            serializer = DeviceGeoPointSerializer(data=data, many=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Invalid data format'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_device_geo_points222(request):
    # Extract the relevant fields from the incoming request
    data = [
        {
            'project': item['project'],  # Ensure you get the project ID
            'project_id': item['project'],  # Ensure you get the project ID
            'device': item['device'],      # Ensure you get the device ID
            'geolocation': item['geolocation'],  # Ensure you get the geolocation ID
            'device_movement': item.get('device_movement', 0),  # Default to 0 if not provided
        }
        for item in request.data
    ]
    
    # Create the serializer with the data
    serializer = DeviceGeoPointSerializer(data=data, many=True)  # Use many=True for multiple entries
    if serializer.is_valid():
        serializer.save()  # Save all instances
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def project_geolocation_list_byid444444444(request,project_id):
    
    if request.method == 'GET':
        geolocations = ProjectGeolocation.objects.filter(project__project_id=project_id).values('id','latitude', 'longitude', 'refference_name')
        return JsonResponse(list(geolocations), safe=False)
@api_view(['GET'])

def project_geolocation_list_byid(request,project_id):
    
    if request.method == 'GET':
        geolocations = ProjectGeolocation.objects.filter(project__project_id=project_id).annotate(
            device_id=F('devicegeopoint__device__id')  # Fetch the device_id if linked
        ).values('id','latitude', 'longitude', 'refference_name', 'device_id')
        return JsonResponse(list(geolocations), safe=False)


@api_view(['PUT']) # Ensure 'POST' is in the list of allowed methods
def add_device_geopoint(request):
    try:
        # Extracting data from the request
        project_id = request.data.get('project')
        device_id = request.data.get('device')
        geolocation_id = request.data.get('geolocation')
        device_movement = request.data.get('device_movement', 0)  # Default to 0 if not provided

        # Validate required fields
        if project_id is None or device_id is None or geolocation_id is None:
            return Response(
                {"error": "Project, Device, and Geolocation IDs are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Fetch the associated objects
        project = Project.objects.get(project_id=project_id)
        device = Device.objects.get(device_id=device_id)
        geolocation = ProjectGeolocation.objects.get(id=geolocation_id)

        # Create a new DeviceGeoPoint instance
        device_geo_point = DeviceGeoPoint.objects.create(
            project=project,
            device=device,
            geolocation=geolocation,
            device_movement=device_movement
        )

        # Serialize the new instance and return it
        serializer = DeviceGeoPointSerializer(device_geo_point)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Project.DoesNotExist:
        return Response(
            {"error": "Project not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    except Device.DoesNotExist:
        return Response(
            {"error": "Device not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    except ProjectGeolocation.DoesNotExist:
        return Response(
            {"error": "Geolocation not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )




@api_view(['POST'])
def add_device_geopoint___(request):
    try:
        # Collect project_id, device_id, geolocation_id, and device_movement from request data
        project_id = request.data.get('project')
        device_id = request.data.get('device')
        geolocation_id = request.data.get('geolocation')
        device_movement = request.data.get('device_movement', 0)

        # Validate required fields
        if project_id is None or device_id is None or geolocation_id is None:
            return Response(
                {"error": "Project, Device, and Geolocation are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Fetch the related objects
        project = Project.objects.get(project_id=project_id)
        device = Device.objects.get(id=device_id)
        geolocation = ProjectGeolocation.objects.get(id=geolocation_id)

        # Create a new DeviceGeoPoint instance
        device_geopoint = DeviceGeoPoint.objects.create(
            project=project,
            device=device,
            geolocation=geolocation,
            device_movement=device_movement
        )

        # Serialize the new instance and return it
        serializer = DeviceGeoPointSerializer(device_geopoint)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Project.DoesNotExist:
        return Response(
            {"error": "Project not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    except Device.DoesNotExist:
        return Response(
            {"error": "Device not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    except ProjectGeolocation.DoesNotExist:
        return Response(
            {"error": "Geolocation not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def device_geopoint_list(request):
    try:
        device_geopoints = DeviceGeoPoint.objects.all()
        serializer = DeviceGeoPointSerializer(device_geopoints, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except DeviceGeoPoint.DoesNotExist:
        return Response({'error': 'Device geolocation points not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def update_project_geolocation(request, project_id):
    try:
        geolocation = ProjectGeolocation.objects.get(id=project_id)
        print(request.data)
        serializer = ProjectGeolocationSerializer(geolocation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except ProjectGeolocation.DoesNotExist:
        return Response({'error': 'Geolocation not found'}, status=status.HTTP_404_NOT_FOUND)
    except MultipleObjectsReturned:
        return Response({'error': 'Multiple geolocations found for this project'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_project_geolocation____(request, project_id):
    try:
        project_geolocation = ProjectGeolocation.objects.get(project__project_id=project_id)
    except ProjectGeolocation.DoesNotExist:
        return Response({'error': 'ProjectGeolocation not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProjectGeolocationSerializer(project_geolocation, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def add_project_geolocation(request, project_id):
    try:
        # Fetch the project by project_id
        project = Project.objects.get(project_id=project_id)

        # Collect latitude, longitude, and reference_name from request data
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')
        reference_name = request.data.get('refference_name')

        # Validate required fields
        if latitude is None or longitude is None or reference_name is None:
            return Response(
                {"error": "latitude, longitude, and reference_name are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create a new ProjectGeolocation instance
        project_geolocation = ProjectGeolocation.objects.create(
            project=project,
            latitude=latitude,
            longitude=longitude,
            refference_name=reference_name
        )

        # Serialize the new instance and return it
        serializer = ProjectGeolocationSerializer(project_geolocation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Project.DoesNotExist:
        return Response(
            {"error": "Project not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        
@api_view(['DELETE'])
def delete_project_geolocation(request, pk):
    projectgeolocation = get_object_or_404(ProjectGeolocation, pk=pk)
    projectgeolocation.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def project_geolocation_list(request):
    if request.method == 'GET':
        projectgeolocation = ProjectGeolocation.objects.all()
        serializer = ProjectGeolocationSerializer(projectgeolocation, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def project_list_by_customer(request, customer_id):
    try:
        # Filter projects by customer_id
        projects = Project.objects.filter(customer__id=customer_id)
        
        # Serialize the project data
        serializer = ProjectSerializer(projects, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Project.DoesNotExist:
        return Response(
            {"error": "No projects found for the specified customer"},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        
        

        

########################################################################
###################
@api_view(['GET'])
def project_registrations_list(request):
    if request.method == 'GET':
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)



@api_view(['POST'])
@parser_classes([MultiPartParser])
def add_project_registration(request):
    serializer = ProjectSerializer(data=request.data)
    if serializer.is_valid():
        property_registration = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED) 
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'PATCH'])
@parser_classes([MultiPartParser])
def update_project_registration(request, pk):
    # Retrieve the project instance
    project_instance = get_object_or_404(Project, pk=pk)

    # Updating the project instance with partial update
    project_serializer = ProjectSerializer(instance=project_instance, data=request.data, partial=True)
    
    if project_serializer.is_valid():
        project_serializer.save()
        return Response(project_serializer.data, status=status.HTTP_200_OK)  # Return 200 for successful update
    
    return Response(project_serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return validation errors if any
   
# @api_view(['GET'])
# def geolocations_by_propertyregistrations(request, pk):
#     try:
#         geolocations = Geolocation.objects.filter(property_registration=pk)
#         serializer = GeolocationSerializer(geolocations, many=True)
#         return Response(serializer.data)
#     except Geolocation.DoesNotExist:
#         return Response(status=404)
   

   
@api_view(['DELETE'])
def delete_project_registration(request, pk):
    projectregistration = get_object_or_404(Project, pk=pk)
    projectregistration.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


### Properties
@api_view(['POST'])
@parser_classes([MultiPartParser])
def add_property(request):
    print(request.data)
    serializer = PropertySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def property_list(request):
    if request.method == 'GET':
        property = Property.objects.all()
        p_serializer = PropertySerializer(property, many=True)
        return Response(p_serializer.data)   
    
@api_view(['GET'])
def properties_by_customer(request, customer_id):
    try:
        # Filter projects by customer_id
        property = Property.objects.filter(customer__id=customer_id)
        
        # Serialize the project data
        serializer = PropertySerializer(property, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Property.DoesNotExist:
        return Response(
            {"error": "No projects found for the specified customer"},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
   

@api_view(['PUT', 'PATCH'])
@parser_classes([MultiPartParser])
def update_property(request, pk):
  
    # Fetching the property registration instance
    property_update = get_object_or_404(property, pk=pk)
    
    # Updating the property registration instance
    property_serializer = PropertySerializer(instance=property_update, data=request.data, partial=True)
    
    if property_serializer.is_valid():
        property_serializer.save()
        return Response(property_serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(property_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
def delete_property(request, pk):
    property = get_object_or_404(Property, pk=pk)
    property.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)      


@api_view(['POST'])
def add_property_geolocation(request, property_id):
    try:
        # Fetch the property by property_id
        property = Property.objects.get(property_id=property_id)

        # Collect latitude, longitude, and reference_name from request data
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')
        reference_name = request.data.get('refference_name')

        # Validate required fields
        if latitude is None or longitude is None or reference_name is None:
            return Response(
                {"error": "latitude, longitude, and reference_name are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create a new ProjectGeolocation instance
        propert_geolocation = PropertyGeolocation.objects.create(
            property=property,
            latitude=latitude,
            longitude=longitude,
            refference_name=reference_name
        )

        # Serialize the new instance and return it
        serializer = PropertyGeolocationSerializer(propert_geolocation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Property.DoesNotExist:
        return Response(
            {"error": "property not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['DELETE'])
def delete_property_geolocation(request, pk):
    propertygeolocation = get_object_or_404(PropertyGeolocation, pk=pk)
    propertygeolocation.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def property_geolocation_list(request):
    if request.method == 'GET':
        propertygeolocation = PropertyGeolocation.objects.all()
        serializer = PropertyGeolocationSerializer(propertygeolocation, many=True)
        return Response(serializer.data)
    
    
@api_view(['PUT'])
def update_property_geolocation(request, project_id):
    try:
        geolocation = PropertyGeolocation.objects.get(id=project_id)
        print(request.data)
        serializer = PropertyGeolocationSerializer(geolocation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except PropertyGeolocation.DoesNotExist:
        return Response({'error': 'Geolocation not found'}, status=status.HTTP_404_NOT_FOUND)
    except MultipleObjectsReturned:
        return Response({'error': 'Multiple geolocations found for this project'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def device_property_geopoint_list_by_customer(request, customer_id):
    try:
        # Get all projects associated with the given customer ID
        properties = Property.objects.filter(customer_id=customer_id)
        
        # Fetch all DeviceGeoPoint records for those projects
        device_geopoints = PropertyDeviceGeoPoint.objects.filter(property__in=properties)
        
        serializer = PropertyDeviceGeoPointSerializer(device_geopoints, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Project.DoesNotExist:
        return Response({'error': 'No projects found for this customer'}, status=status.HTTP_404_NOT_FOUND) 
    
    
@api_view(['GET'])
def propertygeolocation_by_customer(request, customer_id):
    try:
        # Get all projects associated with the given customer ID
        properties = Property.objects.filter(customer_id=customer_id)
        
        # Fetch all DeviceGeoPoint records for those projects
        device_geopoints = PropertyGeolocation.objects.filter(property__in=properties)
        
        serializer = PropertyGeolocationSerializer(device_geopoints, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Property.DoesNotExist:
        return Response({'error': 'No projects found for this customer'}, status=status.HTTP_404_NOT_FOUND)
    
    
    
@api_view(['GET'])
def property_list_by_customer(request, customer_id):
    try:
        # Filter projects by customer_id
        Properties = Property.objects.filter(customer__id=customer_id)
        
        # Serialize the project data
        serializer = PropertySerializer(Properties, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Project.DoesNotExist:
        return Response(
            {"error": "No projects found for the specified customer"},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        
@api_view(['GET'])
def property_geolocation_list_byid123(request,property_id):
    
    if request.method == 'GET':
        geolocations = PropertyGeolocation.objects.filter(property__property_id=property_id).values('id','latitude', 'longitude', 'refference_name')
        return JsonResponse(list(geolocations), safe=False)
    
@api_view(['GET'])
def property_geolocation_list_byid(request, property_id):
    if request.method == 'GET':
        # Fetch geolocation data and associated device_id (if any)
        geolocations = PropertyGeolocation.objects.filter(property__property_id=property_id).annotate(
            device_id=F('propertydevicegeopoint__device__id')  # Fetch the device_id if linked
        ).values('id', 'latitude', 'longitude', 'refference_name', 'device_id')

        return JsonResponse(list(geolocations), safe=False)
      
@api_view(['POST'])
def create_device_property_geo_points(request):
    # Check if the request data is a list
    if isinstance(request.data, list):
        response_data = []
        for item in request.data:
            # Fetch the related instances
            try:
                device = Device.objects.get(id=item.get('device')) if item.get('device') else None
                geolocation = PropertyGeolocation.objects.get(id=item.get('geolocation'))

                # Create or update the DeviceGeoPoint instance
                property_device_geo_point, created = PropertyDeviceGeoPoint.objects.update_or_create(
                    property_id=item.get('property_id'),
                    geolocation=geolocation,
                    defaults={
                        'device': device,
                        'device_movement': item.get('device_movement', 0)
                    }
                )
                response_data.append(PropertyDeviceGeoPointSerializer(property_device_geo_point).data)

            except Device.DoesNotExist:
                return Response(
                    {"error": "Device does not exist."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            except PropertyGeolocation.DoesNotExist:
                return Response(
                    {"error": "Geolocation does not exist444444."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            except IntegrityError as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
            except Exception as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Return all successfully saved data
        return Response(response_data, status=status.HTTP_201_CREATED)

    # If data is not a list, return an error
    return Response(
        {"error": "Expected a list of items."},
        status=status.HTTP_400_BAD_REQUEST
    )


    
###############################################################

@api_view(['GET'])
def property_registrations_list(request):
    if request.method == 'GET':
        propertyRegistrations = PropertyRegistration.objects.all()
        serializer = PropertyRegistrationSerializer(propertyRegistrations, many=True)
        return Response(serializer.data)



@api_view(['POST'])
@parser_classes([MultiPartParser])
def add_property_registration(request):
    serializer = PropertyRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        property_registration = serializer.save()

        # Add geolocations
        geolocations_data_str_list = request.data.getlist('geolocations')  # Assuming geolocations is a list
        for geolocation_data_str in geolocations_data_str_list:
            try:
                geolocation_data = json.loads(geolocation_data_str)
                geolocation_serializer = GeolocationSerializer(data=geolocation_data)
                if geolocation_serializer.is_valid():
                    geolocation_serializer.save(property_registration=property_registration)
                else:
                    return Response(geolocation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except JSONDecodeError as e:
                return Response({'error': 'Invalid JSON format in geolocations'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'PATCH'])
@parser_classes([MultiPartParser])
def update_property_registration(request, pk):
    # Handling geolocations data
    geolocations_data_str_list = request.data.getlist('geolocations')
    for geolocation_data_str in geolocations_data_str_list:
        try:
            geolocation_data = json.loads(geolocation_data_str)
            # Further processing of geolocation_data if needed
        except JSONDecodeError as e:
            print("Error decoding JSON:", e)
            # Handle the error as needed

    # Fetching the property registration instance
    property_registration = get_object_or_404(PropertyRegistration, pk=pk)
    
    # Updating the property registration instance
    property_registration_serializer = PropertyRegistrationSerializer(instance=property_registration, data=request.data, partial=True)
    
    if property_registration_serializer.is_valid():
        property_registration_serializer.save()
        property_registration.geolocations.all().delete()
        # Update or create geolocations
        #geolocations_data = request.data.get('geolocations')
        
        # Add geolocations
        geolocations_data_str_list = request.data.getlist('geolocations')  # Assuming geolocations is a list
        for geolocation_data_str in geolocations_data_str_list:
            try:
                geolocation_data = json.loads(geolocation_data_str)
                geolocation_serializer = GeolocationSerializer(data=geolocation_data)
                if geolocation_serializer.is_valid():
                    geolocation_serializer.save(property_registration=property_registration)
                else:
                    return Response(geolocation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except JSONDecodeError as e:
                return Response({'error': 'Invalid JSON format in geolocations'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(property_registration_serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(property_registration_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
@api_view(['GET'])
def geolocations_by_propertyregistrations(request, pk):
    try:
        geolocations = Geolocation.objects.filter(property_registration=pk)
        serializer = GeolocationSerializer(geolocations, many=True)
        return Response(serializer.data)
    except Geolocation.DoesNotExist:
        return Response(status=404)
   

   
@api_view(['DELETE'])
def delete_property_registration(request, pk):
    propertyregistration = get_object_or_404(PropertyRegistration, pk=pk)
    propertyregistration.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)





@api_view(['GET'])
def property_device_list(request):
    if request.method == 'GET':
        # Fetch all PropertyDevice instances
        property_devices = PropertyDevice.objects.all()
        
        # Serialize the PropertyDevice instances
        serializer = PropertyDeviceSerializer(property_devices, many=True)
        
        # Retrieve related data from PropertyDeviceDevice and add it to the serialized output
        for obj in serializer.data:
            property_device_id = obj['id']  # Assuming id is the primary key of PropertyDevice
            
            # Fetch related PropertyDeviceDevice instances for this PropertyDevice
            property_device_devices = PropertyDeviceDevice.objects.filter(property_device=property_device_id)
            
            # Serialize the related PropertyDeviceDevice instances
            property_device_devices_data = PropertyDeviceDeviceSerializer(property_device_devices, many=True).data
            
            # Add the serialized PropertyDeviceDevice data to the PropertyDevice serialization
            obj['propertydevice_devices'] = property_device_devices_data
        
        return Response(serializer.data)



@api_view(['POST'])
def add_property_device(request):
    # Deserialize PropertyDevice data
    serializer = PropertyDeviceSerializer(data=request.data)
    if serializer.is_valid():
        # Save PropertyDevice instance
        property_device_instance = serializer.save()
        inserted_id = property_device_instance.id
        # Get propertydeviceList data
        property_device_devices_data = request.data.get('propertydeviceList', [])

        # Create PropertyDeviceDevice instances
        for device_data in property_device_devices_data:
            # Assign PropertyDevice instance to property_device field
            device_data['property_device'] = inserted_id
            #print(device_data)
            
            #Serialize and save PropertyDeviceDevice instance
            device_serializer = PropertyDeviceDeviceSerializer(data=device_data)
            if device_serializer.is_valid():
                device_serializer.save()
            else:
                return Response(device_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        # Return errors if PropertyDevice data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def dashboard_data(request):
    # Get total number of customers
    total_customers = Customer.objects.count()
    
    # Get total number of devices
    total_devices = Device.objects.count()
    
    # Get count of active devices
    active_devices = Device.objects.filter(device_status=True).count()
    
    # Get count of inactive devices
    inactive_devices = Device.objects.filter(device_status=False).count()
    
    # Prepare data to return
    data = {
        'total_customers': total_customers,
        'total_devices': total_devices,
        'active_devices': active_devices,
        'inactive_devices': inactive_devices
    }
    
    # Return data in JSON format
    return Response(data)

@api_view(['GET'])
def dashboard_data_by_customer(request, customer_id):
    # Filter customers and devices by customer_id
    customer_devices = Device.objects.filter(customer_id=customer_id)
    
    # Get total number of devices for this customer
    total_devices = customer_devices.count()
    
    # Get count of active and inactive devices for this customer
    active_devices = customer_devices.filter(device_status=True).count()
    inactive_devices = customer_devices.filter(device_status=False).count()
    
    # Prepare data to return
    data = {
        'customer_id': customer_id,
        'total_devices': total_devices,
        'active_devices': active_devices,
        'inactive_devices': inactive_devices
    }
    
    # Return data in JSON format
    return Response(data)

@api_view(['POST'])
def update_property_device(request, pk):
    try:
        # Retrieve the PropertyDevice instance by its primary key (pk)
        property_device_instance = PropertyDevice.objects.get(pk=pk)
    except PropertyDevice.DoesNotExist:
        # Return 404 Not Found response if PropertyDevice instance does not exist
        return Response({'error': 'PropertyDevice does not exist'}, status=status.HTTP_404_NOT_FOUND)

    # Deserialize the updated PropertyDevice data
    serializer = PropertyDeviceSerializer(property_device_instance, data=request.data)
    if serializer.is_valid():
        # Save the updated PropertyDevice instance
        updated_property_device_instance = serializer.save()
        
        # Get propertydeviceList data
        property_device_devices_data = request.data.get('propertydeviceList', [])
        
        # Delete existing PropertyDeviceDevice instances related to the updated PropertyDevice instance
        property_device_instance.propertydevicedevice_set.all().delete()
        
        # Create new PropertyDeviceDevice instances
        for device_data in property_device_devices_data:
            # Assign the updated PropertyDevice instance to property_device field
            device_data['property_device'] = updated_property_device_instance.id
            
            # Serialize and save the new PropertyDeviceDevice instance
            device_serializer = PropertyDeviceDeviceSerializer(data=device_data)
            if device_serializer.is_valid():
                device_serializer.save()
            else:
                # Return errors if PropertyDeviceDevice data is invalid
                return Response(device_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Return the serialized updated PropertyDevice instance with a status of 200 OK
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        # Return errors if PropertyDevice data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['DELETE'])
def delete_property_device(request, pk):
    propertydevice = get_object_or_404(PropertyDevice, pk=pk)
    propertydevice.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

def survey_details_api(request, pk):
    try:
        # Retrieve the PropertyDevice object based on the provided property_device_id
        property_device = PropertyDevice.objects.get(id=pk)
        property_registration = property_device.property_id
        customer_name = property_device.customer_id.name if property_device.customer_id else None

        # Extract survey details from the related PropertyRegistration object
        survey_details = {
            'property_name': property_registration.property_name,
            'survey_number': property_device.property_id.survey_number,
            'survey_sub_division': property_device.property_id.survey_sub_division,
            'patta_number': property_device.property_id.patta_number,
            'area': property_device.property_id.area,
            'taluk': property_device.property_id.taluk.name,
            'village': property_device.property_id.village.name,
            'fmb_url': property_device.property_id.fmb.url,  # Assuming fmb is a FileField
            'customer_name': customer_name,
            'district_name': property_registration.district.name,
            'village_name': property_registration.village.name,
            'taluk_name': property_registration.taluk.name,
            
            
        }
        
        # Retrieve related devices from PropertyDeviceDevice model
        devices = PropertyDeviceDevice.objects.filter(property_device=property_device)
        device_info = []
        for index, device in devices:
            device_info.append({
                'device_id': device.device.device_id,
                'battery_status': device.device.battery_status,
                'device_status': device.device.device_status,
                       # Add geolocation details
                'latitude': device.geolocation.latitude,
                'longitude': device.geolocation.longitude,
                'device_moved': device.device_movement,
                # Add other fields as needed
                'last_updated': device.last_updated,
                 'points': index,
                # Add other fields from Device model as needed
            })
        
        # Combine survey details and device information
        response_data = {
            'survey_details': survey_details,
            'devices': device_info,
            #'devices_devices': devices
            
        }
        
        return JsonResponse(response_data, status=200)
    except PropertyDevice.DoesNotExist:
        return JsonResponse({'error': 'PropertyDevice not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def property_survey_details_api(request, pk):
    try:
        # Retrieve the PropertyDevice object based on the provided property_device_id
        property = Property.objects.get(property_id=pk)
        property_device_geo_points = PropertyDeviceGeoPoint.objects.filter(property__property_id=pk)
    
        # Retrieve the associated devices
        device_info = []
        for index,geo_point in enumerate(property_device_geo_points):
            device = geo_point.device
            if device:
               device_info.append({
                'device_id': device.device_id,
                'device_type': device.device_type.name,
                'battery_status': device.battery_status,
                'device_status': device.device_status,
                'device_movement': geo_point.device_movement,
                'latitude': geo_point.geolocation.latitude,
                'longitude': geo_point.geolocation.longitude,
                
                'points': index+1,
                'last_updated': geo_point.last_updated,
               })
    
        #serializer = PropertyDeviceGeoPointSerializer(property_device_geopoints, many=True)
        #print(serializer.data);
        #property_registration = property.property_id
        #customer_name = property.customer_id.name if property.customer_id else None

        # Extract survey details from the related PropertyRegistration object
        survey_details = {
            'property_name': property.property_name,
            'survey_number': property.survey_number,
            'survey_sub_division': property.survey_sub_division,
            'patta_number': property.patta_number,
            'area': property.area,
            'taluk': property.taluk.name,
            'village': property.village.name,
            'fmb_url': property.fmb.url,  # Assuming fmb is a FileField
            'customer_name': property.district.name,
            'district_name': property.district.name,
            'village_name': property.village.name,
            'taluk_name': property.taluk.name,
            'p_type': 'property',
            
        }
        
        # Retrieve related devices from PropertyDeviceDevice model
        #devices = PropertyDeviceDevice.objects.filter(property=property_device)
       
        
        
        # Combine survey details and device information
        response_data = {
            'survey_details': survey_details,
            'devices': device_info,
            #'devices_devices': devices
            
        }
        
        return JsonResponse(response_data, status=200)
    except property.DoesNotExist:
        return JsonResponse({'error': 'PropertyDevice not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def project_survey_details_api(request, pk):
    try:
        # Retrieve the PropertyDevice object based on the provided property_device_id
        project = Project.objects.get(project_id=pk)
        project_device_geo_points = DeviceGeoPoint.objects.filter(project__project_id=pk)
    
        # Retrieve the associated devices
        device_info = []
        for index ,geo_point in enumerate(project_device_geo_points):
            device = geo_point.device
            if device:
               device_info.append({
                'device_id': device.device_id,
                'device_type': device.device_type.name,
                'battery_status': device.battery_status,
                'device_status': device.device_status,
                'latitude': geo_point.geolocation.latitude,
                'longitude': geo_point.geolocation.longitude,
                'device_movement': geo_point.device_movement,
                'last_updated': geo_point.last_updated,
                
                'points':index+1,
               })
    
        #serializer = PropertyDeviceGeoPointSerializer(property_device_geopoints, many=True)
        #print(serializer.data);
        #property_registration = property.property_id
        #customer_name = property.customer_id.name if property.customer_id else None

        # Extract survey details from the related PropertyRegistration object
        survey_details = {
            'property_name': project.project_name,
           # 'survey_number': project.survey_number,
          #  'survey_sub_division': project.survey_sub_division,
           # 'patta_number': project.patta_number,
          #  'area': project.area,
           # 'taluk': project.taluk.name,
          #  'village': project.village.name,
            #'fmb_url': project.fmb.url,  # Assuming fmb is a FileField
           # 'customer_name': project.district.name,
            'project_state': project.project_state,
            'project_city': project.project_city,
            'p_type': 'project',
           # 'taluk_name': project.taluk.name,
            
            
        }
        
        # Retrieve related devices from PropertyDeviceDevice model
        #devices = PropertyDeviceDevice.objects.filter(property=property_device)
       
        
        
        # Combine survey details and device information
        response_data = {
            'survey_details': survey_details,
            'devices': device_info,
            #'devices_devices': devices
            
        }
        
        return JsonResponse(response_data, status=200)
    except project.DoesNotExist:
        return JsonResponse({'error': 'project not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

class LoginAPI(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            # User authentication successful
            refresh = RefreshToken.for_user(user)
            token = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
            created_by = user.created_by.username if user.created_by else None
            created_by_id = user.created_by.id if user.created_by else None
            return Response({'message': 'Login successful', 'token': token,'customerName':user.first_name,'id': user.id,'address':user.last_name,'customer_type':user.customer_type,'customer_role':user.customer_role,'created_by_id':created_by_id}, status=status.HTTP_200_OK)
        else:
            # Invalid credentials
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


def my_view(request):
    active_device_types = DeviceType.objects.filter(status=True)
    return render(request, 'API/device_type_template.html', {'active_device_types': active_device_types})


