from django.contrib import admin
from .models import CustomUser
# Register your models here.

admin.site.site_header = "ShopSphere Admin"
admin.site.site_title = "ShopSphere Admin Portal"
admin.site.register(CustomUser)  # Register the CustomUser model with the admin site