from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# Create your models here.


class AdminManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("Email is required")
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

class Admin(AbstractBaseUser):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    objects = AdminManager()

    USERNAME_FIELD = 'email'

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=13, unique=True)
    published_date = models.DateField()