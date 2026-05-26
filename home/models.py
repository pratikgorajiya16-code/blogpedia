from django.db import models
import json, datetime
from PIL import Image

# Create your models here.


class Blog(models.Model):
    from login.models import Users
    category_tuple=[
    ("Education","Education"),("Entertainment","Entertainment"),("Sports","Sports"),("News","News"),("Psychology","Psychology"),("Religion","Religion"),("Technology","Technology"),("Fiction","Fiction"),("Business","Business"),("Space","Space")
 ]
    Blog_title=models.CharField(max_length=20,default="")
    Blog_category=models.CharField(max_length=16,choices=category_tuple,default="")
    Blog_context=models.TextField(default="")
    image_data = models.BinaryField(default=0)
    image_type = models.CharField(max_length=50,default="")
    Blog_characters=models.PositiveIntegerField(default=0)
    Blog_Author_id=models.PositiveIntegerField(default=0)
    Blog_entry_date=models.DateField(default=datetime.date.today)
    Blog_id=models.AutoField(primary_key=True)
    
    
