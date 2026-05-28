from django.db import models
#from home import models as Model

# Create your models here.

# def check(string):
#     if len(string)>8:
#         raise ArithmeticError("Please enetr more than 8 characters")

class Users(models.Model):
    Username=models.CharField(max_length=16,error_messages="Max length of username is 16 characters",default="")
    userMail=models.EmailField(default="",unique=True)
    userpassword=models.BinaryField()
    user_interest=models.JSONField(default=list)
    user_id=models.AutoField(primary_key=True)
    user_wishlist=models.JSONField(default=list)
    user_blog=models.JSONField(default=list)
