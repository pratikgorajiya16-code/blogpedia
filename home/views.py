from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from home.models import Blog
from login.models import Users
import json,datetime,base64
from django.core import serializers
from random import shuffle

# Create your views here.
 
category_tuple=['Education', 'Entertainment', 'Sports', 'News', 'Psychology', 'Religion', 'Technology', 'Fiction', 'Business', 'Space']
def default(request):
    name=request.GET.get('your_name')  # Prints the submitted data as a QueryDict
    d1={
    'name':name,
    'list':Blog.category_tuple
    }
    
    return HttpResponse((loader.get_template('greet.html')).render(d1,request))



def home(request,Data=None):
    if request.method == "GET":
        # data = json.loads(request.body.decode("utf-8"))
        # userdata = data.get("status", None)
        # userid=userdata["user_id"]
        # mydata=list(Users.objects.filter(user_id=userid).values())
        # User_interest=json.loads((mydata[0])["user_interest"])
        User_interest=request.session.get("user_interest")
        data_string=[]

        for i in User_interest:
            query_data=list(Blog.objects.filter(Blog_category=i).values())
            data_string.extend(query_data)

        for i in data_string:
            if i.image_data:
                image_base64 = base64.b64encode(i.image_data).decode('utf-8')
                image_uri = f"data:{i.image_type};base64,{image_base64}"
                (data_string[i])["image_uri"]=image_uri
            else:
                (data_string[i])["image_uri"]=None
            
        shuffle(data_string)
        Display_data={"display_data":data_string,"title":"Home"}
        return HttpResponse((loader.get_template('greet.html')).render(Display_data,request))
    

def create_blog(request):
    if request.method=="GET":
        #userid=(json.loads(request.body.decode("utf-8"))).get("status")
        data={"title":"Blog-editor"}
        return HttpResponse((loader.get_template('texteditor.html')).render(data,request))

def save_blog(request):
    if request.method=="POST":
        blog_title=(request.POST.get("blog_title"))
        blog_category=(request.POST.get("blog_category"))
        blog_context=request.POST["blog_context"]
        words=json.loads(request.POST["wordCount"])
        uploaded_file = json.loads(request.FILES['image'])
        image_data = uploaded_file.read()
        image_type = uploaded_file.content_type
        blog_words=words[7:words.find("|")-1]
        blog_Author_id=json.loads(request.session.get("userid"))

        query1=Blog(blog_title,blog_category,blog_context,image_data,image_type,blog_words,blog_Author_id)
        query1.save()

        # blog_data=Blog.objects.filter(Blog_title=blog_title,Blog_context=blog_context,blog_Author_id=blog_Author_id)
        data=Users.objects.filter(user_id=blog_Author_id).get()
        (data.user_blog).append(query1.Blog_id)
        data.save()
        

def display(request):
    if request.method=="GET":
        blog_data=Blog.objects.filter(Blogid=(json.loads(request.body.decode("utf-8"))).get("status")).values()
        data={"blog_data":blog_data,"title":"Blog"}
        return HttpResponse((loader.get_template('Blog.html')).render(data,request))
    
def Profile(request):
    if request.method=="GET":
        user_id=(json.loads(request.body.decode("utf-8"))).get("status")
        display_data=list(Users.objects.filter(user_id=user_id).values())
        display_data=display_data[0]
        wishlist_data=[]
        for i in display_data.user_wishlist:
            wishlist_data.extends(list(Blog.objects.filter(Blog_id=i).values()))
        data={"display_data":display_data,"wishlist_data":wishlist_data,"title":"Profile"}
        return HttpResponse((loader.get_template('display_user.html')).render(data,request))
    

def New(request):
    if request.method=="GET":
        #userid=(json.loads(request.body.decode("utf-8"))).get("status")
        display_data=list(Blog.objects.all().order_by("Blog_entry_date").values())
        data={"display_data":display_data,"title":"New"}
        return HttpResponse((loader.get_template('greet.html')).render(data,request))
        

def Category(request):
    if request.method=="GET":
        userid=(json.loads(request.body.decode("utf-8"))).get("status")
        data={}
        for i in category_tuple:
            data[i]=list(Blog.objects.filter(Blog_category=i).values())
        data["title"]="Category"
        #data["userid"]=userid
        return HttpResponse((loader.get_template('category.html')).render(data,request))

def each_category(request):
    if request.method=="GET":
        category_data=(json.loads(request.body.decode("utf-8"))).get("status")
        category=category_data["category"]
        #userid=category_data["userid"]
        display_data=list(Blog.objects.filter(Blog_category=category).values())
        data={"display_data":display_data,"title":category}
        return HttpResponse((loader.get_template('greet.html')).render(data,request))
    
# def like(request):
#     if request.method=="POST":
        