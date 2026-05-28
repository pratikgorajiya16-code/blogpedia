from django.db import models
import json, datetime
from PIL import Image

# Create your models here.
category_tuple=[
    ("Education","Education"),("Entertainment","Entertainment"),("Sports","Sports"),("News","News"),("Psychology","Psychology"),("Religion","Religion"),("Technology","Technology"),("Fiction","Fiction"),("Business","Business"),("Space","Space")
 ]

class Blog(models.Model):
    Blog_title=models.CharField(max_length=20,default="")
    Blog_category=models.CharField(max_length=16,choices=category_tuple,default="")
    Blog_context=models.TextField(default="")
    image_data = models.BinaryField(default=0)
    image_type = models.CharField(max_length=50,default="")
    Blog_characters=models.PositiveIntegerField(default=0)
    Blog_Author_id=models.PositiveIntegerField(default=0)
    Blog_entry_date=models.DateField(default=datetime.date.today)
    Blog_id=models.AutoField(primary_key=True)
    
    
class Book(models.Model):
    Book_title=models.CharField(max_length=20,default="")
    Book_category=models.CharField(max_length=16, choices=category_tuple,default="")
    Book_Author_id=models.PositiveIntegerField(default=0)
    Book_entry_date=models.DateField(default=datetime.date.today)
    Book_id=models.AutoField(primary_key=True)
    pdf_Data = models.BinaryField()
    fileName = models.CharField(max_length=255)