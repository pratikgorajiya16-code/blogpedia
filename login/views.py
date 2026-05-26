import json
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.template import loader
from .models import Users
from home import views

# Create your views here.


@csrf_exempt
def login(request):
    if request.method == 'POST':
        #Id=int(request.POST.get('User_id'))  # Prints the submitted data as a QueryDict
        user_Mail=str(request.POST.get('userMail'))
        password=str(request.POST.get('Password'))
        password=password.encode('utf-8')
        #print(Id)
        
        if Users.objects.filter(userMail=user_Mail).exists() and Users.objects.filter(userpassword=password).exists():
            mydata=Users.objects.filter(userMail=user_Mail,userpassword=password).values().first()
            # data=Users.objects.get(userMail=user_Mail)
            
            request.session["userid"]=mydata.pk
            request.session["user_mail"]=mydata.userMail
            request.session["user_interest"]=mydata.user_interest

            # User_interest=json.loads(data.user_interest)
            # mydata["User_interest"]=User_interest
            # data={"mydata":mydata,"userid":data.user_id}
            
            return HttpResponse((loader.get_template('redirect.html')).render({},request))
        else:
            return HttpResponse((loader.get_template('Login.html')).render({},request))
    else:
        return HttpResponse((loader.get_template('Login.html')).render({},request))



@csrf_exempt
def signup(request):
    try:
        if request.method=='POST':
            password=(str(request.POST.get('Password'))).encode('utf-8')
            User_name=request.POST.get('User_name')
            User_Mail=request.POST.get('userMail')
            User_interest=request.POST.get("interest")
            
            User_interest = User_interest.split(',')

            query1=Users(User_name,User_Mail,password)
            query1.user_interest=json.dumps(User_interest)
            query1.save()
            
            request.session["userid"]=query1.pk
            request.session["user_mail"]=query1.userMail
            request.session["user_interest"]=query1.user_interest

            # mydata=Users.objects.filter(userpassword=password,userMail=User_Mail).values().first()
            # mydata["User_interest"]=User_interest
            # Id=mydata["user_id"]

            # data={"mydata":mydata}
            return redirect(views.home(request))
            return HttpResponse((loader.get_template('greet.html')).render(data,request))
        else:
            return HttpResponse((loader.get_template('Sign_up.html')).render({},request))
    except json.JSONDecodeError:
        return HttpResponse((loader.get_template('Json.html')).render({},request))
        