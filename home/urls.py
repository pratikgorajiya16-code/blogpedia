from django.urls import path
from . import views


urlpatterns = [
    path('Home/',views.home, name="Home"),
    path('new/',views.New,name="new"),
    path('category/',views.Category,name="category"),
    path('Blog_creation/',views.create_blog, name="Create_blog"),
    path('Blog_display/',views.display,name="display_blog"),
    path('profile/',views.Profile,name="profile"),
    path('Specific_category/',views.each_category,name="see-all")
    # path('/likes',views.like,name="likes"),
    # path('/unlike',views.unlike,name="unlikes")
]