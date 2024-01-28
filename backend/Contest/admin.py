from django.contrib import admin
from .models import Question, Contest

# Register your models here.

admin.site.register(Question)
admin.site.register(Contest)