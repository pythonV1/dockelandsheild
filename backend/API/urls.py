from django.urls import path
from .views import (
    LoginAPI, dashboard_data, add_device, devices_list, update_device, delete_device,
    add_district, districts_list, update_district, delete_district,
    add_taluk, taluks_list, update_taluk, delete_taluk,
    add_village, village_list, update_village, delete_village,
    add_customer, customers_list, update_customer, delete_customer,
    add_project_registration, project_registrations_list, update_project_registration, delete_project_registration, 
    project_geolocation_list,
    add_property_registration, property_registrations_list, update_property_registration, delete_property_registration,
    add_property_device, property_device_list, update_property_device, delete_property_device,
    geolocations_by_propertyregistrations, survey_details_api,project_list_by_customer,add_project_geolocation,delete_project_geolocation,update_project_geolocation,device_geopoint_list,add_device_geopoint,project_geolocation_list_byid,create_device_geo_points,device_geopoint_list_by_customer,add_property,property_list,update_property,delete_property,properties_by_customer,add_property_geolocation,delete_property_geolocation,update_property_geolocation,property_geolocation_list,device_property_geopoint_list_by_customer,property_list_by_customer,property_geolocation_list_byid,create_device_property_geo_points,propertygeolocation_by_customer,devices_list_by_customer,property_survey_details_api,project_survey_details_api,check_duplicate_device_id,dashboard_data_by_customer
)

urlpatterns = [
    # Authentication and Dashboard
    path('login/', LoginAPI.as_view(), name='login-api'),
    path('dashboard/', dashboard_data, name='dashboard_data'),
    path('dashboard/customer/<int:customer_id>/', dashboard_data_by_customer, name='dashboard_data_by_customer'),

    # Device Management
    path('device/add/', add_device, name='add-device'),
    path('devices/', devices_list, name='devices-list'),
    path('devices/customer/<int:customer_id>/', devices_list_by_customer, name='devices-list-by-customer'),
    path('device/update/<int:pk>/', update_device, name='update-device'),
    path('device/delete/<int:pk>/', delete_device, name='delete-device'),
    path('device/check-duplicate/', check_duplicate_device_id, name='check_duplicate_device_id'),

    # District Management
    path('district/add/', add_district, name='add-district'),
    path('districts/', districts_list, name='districts-list'),
    path('district/update/<int:pk>/', update_district, name='update-district'),
    path('district/delete/<int:pk>/', delete_district, name='delete-district'),

    # Taluk Management
    path('taluk/add/', add_taluk, name='add-taluk'),
    path('taluks/', taluks_list, name='taluk-list'),
    path('taluks/<int:district_id>/', taluks_list, name='taluks-list-by-district'),
    path('taluk/update/<int:pk>/', update_taluk, name='update-taluk'),
    path('taluk/delete/<int:pk>/', delete_taluk, name='delete-taluk'),

    # Village Management
    path('village/add/', add_village, name='add-village'),
    path('villages/', village_list, name='village-list'),
    path('villages/<int:taluk_id>/', village_list, name='village-list-by-taluks'),
    path('village/update/<int:pk>/', update_village, name='update-village'),
    path('village/delete/<int:pk>/', delete_village, name='delete-village'),

    # Customer Management
    path('customer/add/', add_customer, name='add-customer'),
    path('customers/', customers_list, name='customers-list'),
    path('customer/update/<int:pk>/', update_customer, name='update-customer'),
    path('customer/delete/<int:pk>/', delete_customer, name='delete-customer'),

    # Project Registration and Geolocation
    path('projectregistration/add/', add_project_registration, name='add-project-registration'),
    path('projectregistrations/', project_registrations_list, name='project-registration-list'),
    path('projectregistration/update/<int:pk>/', update_project_registration, name='update-project-registration'),
    path('projectregistration/delete/<int:pk>/', delete_project_registration, name='delete-project-registration'),
    path('projectgeolocation/', project_geolocation_list, name='project-geolocation-list'),

    # Property Registration and Device Management
    path('propertyregistration/add/', add_property_registration, name='add-property-registration'),
    path('propertyregistrations/', property_registrations_list, name='property-registration-list'),
    path('propertyregistration/update/<int:pk>/', update_property_registration, name='update-property-registration'),
    path('propertyregistration/delete/<int:pk>/', delete_property_registration, name='delete-property-registration'),
    path('propertyregistrations/<int:pk>/geolocations', geolocations_by_propertyregistrations, name='geolocations-by-propertyregistrations'),
    
      # Property add and Device Management
    path('properties/add/', add_property, name='add-property'),
    path('properties/', property_list, name='property-list'),
    path('properties/customer/<int:customer_id>/', properties_by_customer, name='properties-by-customer'),
    path('properties/update/<int:pk>/', update_property, name='update-property'),
    path('property/delete/<int:pk>/', delete_property, name='delete-property'),
    
    
     #propertygeolocation
    path('propertygeolocation/add/<int:property_id>/', add_property_geolocation, name='add-property-geolocation'),
    path('propertygeolocation/delete/<int:pk>/', delete_property_geolocation, name='delete-property-geolocation'),
    path('propertygeolocation/update/<int:project_id>/', update_property_geolocation, name='update_property_geolocation'),
    path('propertygeolocation/', property_geolocation_list, name='property-geolocation-list'),
    path('propertygeolocation/customer/<int:customer_id>/', propertygeolocation_by_customer, name='propertygeolocation_by_customer'),


    path('propertygeolocations/customer/<int:customer_id>/', device_property_geopoint_list_by_customer, name='device_property_geopoint_list_by_customer'),

   
    path('propertydevice/add/', add_property_device, name='add-property-device'),
    path('propertydevices/', property_device_list, name='property-device-list'),
    path('propertydevice/update/<int:pk>/', update_property_device, name='update-property-device'),
    path('propertydevice/delete/<int:pk>/', delete_property_device, name='delete-property-device'),
    path('properties/customer/<int:customer_id>/', property_list_by_customer, name='property-list-by-customer'),
    
    
    path('geolocations/property/<int:property_id>/', property_geolocation_list_byid, name='project_geolocation_list_by_id'),
    path('add/device-property-geopoints/', create_device_property_geo_points, name='create_device_property_geo_points'),
    

    # Survey
    path('survey-details/<int:pk>/', survey_details_api, name='survey-details-api'),
    path('property-survey-details/<int:pk>/', property_survey_details_api, name='property_survey-details-api'),
    
    path('project-survey-details/<int:pk>/', project_survey_details_api, name='project_survey-details-api'),
    
    #project_list_by_customer
    path('projectgeolocation/add/<int:project_id>/', add_project_geolocation, name='add-project-geolocation'),
    path('projectgeolocation/delete/<int:pk>/', delete_project_geolocation, name='delete-project-geolocation'),
    path('projectgeolocation/update/<int:project_id>/', update_project_geolocation, name='update_project_geolocation'),
    
    path('projects/customer/<int:customer_id>/', project_list_by_customer, name='project-list-by-customer'),
    #path('devicegeopoint/add/', add_device_geopoint, name='add-device-geopoint'),
    #path('devicegeopoint/add/', device_geopoint_list, name='device_geopoint_list'),
    path('devicegeopoint/add/', add_device_geopoint, name='add_device_geopoint'),
    path('devicegeopoint/', device_geopoint_list, name='device_geopoint_list'),
    path('geolocations/project/<int:project_id>/', project_geolocation_list_byid, name='project_geolocation_list_by_id'),
    
    path('api/device-geopoints/', create_device_geo_points, name='create_device_geo_points'),
    
    path('geolocations/customer/<int:customer_id>/', device_geopoint_list_by_customer, name='device_geopoint_list_by_customer'),
    
    
   
]


