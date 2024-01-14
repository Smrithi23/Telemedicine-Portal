from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from phonenumber_field.modelfields import PhoneNumberField
from .Account import Account

# Create your models here.

class DoctorAccount(models.Model):

    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female')
    ]

    DEPARTMENT_CHOICES = [
        ('General Medicine', 'General Medicine'),
        ('Ear, nose and throat (ENT)', 'Ear, nose and throat (ENT)'),
        ('Dental', 'Dental'),
        ('Ophthalmology', 'Ophthalmology'),
        ('Cardiology', 'Cardiology'),
        ('Orthopedics', 'Orthopedics'),
        ('Pediatrics', 'Pediatrics'),
        ('Gynecology', 'Gynecology'),
        ('Dermatology', 'Dermatology'),
        ('Nutrition and Dietics', 'Nutrition and Dietics'),
    ]

    NATIONALITY_CHOICES = [
        ('Afghan', 'Afghan'),
        ('Albanian', 'Albanian'),
        ('Algerian', 'Algerian'),
        ('Argentinian', 'Argentinian'),
        ('Australian', 'Australian'),
        ('Austrian', 'Austrian'),
        ('Bangladeshi', 'Bangladeshi'),
        ('Belgian', 'Belgian'),
        ('Bolivian', 'Bolivian'),
        ('Batswana', 'Batswana'),
        ('Brazilian', 'Brazilian'),
        ('Bulgarian', 'Bulgarian'),
        ('Cambodian', 'Cambodian'),
        ('Cameroonian', 'Cameroonian'),
        ('Canadian', 'Canadian'),
        ('Chilean', 'Chilean'),
        ('Chinese', 'Chinese'),
        ('Colombian', 'Colombian'),
        ('Costa Rican', 'Costa Rican'),
        ('Croatian', 'Croatian'),
        ('Cuban', 'Cuban'),
        ('Czech', 'Czech'),
        ('Danish', 'Danish'),
        ('Dominican', 'Dominican'),
        ('Ecuadorian', 'Ecuadorian'),
        ('Egyptian', 'Egyptian'),
        ('Salvadorian', 'Salvadorian'),
        ('English', 'English'),
        ('Estonian', 'Estonian'),
        ('Ethiopian', 'Ethiopian'),
        ('Fijian', 'Fijian'),
        ('Finnish', 'Finnish'),
        ('French', 'French'),
        ('German', 'German'),
        ('Ghanaian', 'Ghanaian'),
        ('Greek', 'Greek'),
        ('Guatemalan', 'Guatemalan'),
        ('Haitian', 'Haitian'),
        ('Honduran', 'Honduran'),
        ('Hungarian', 'Hungarian'),
        ('Icelandic', 'Icelandic'),
        ('Indian', 'Indian'),
        ('Indonesian', 'Indonesian'),
        ('Iranian', 'Iranian'),
        ('Iraqi', 'Iraqi'),
        ('Irish', 'Irish'),
        ('Israeli', 'Israeli'),
        ('Italian', 'Italian'),
        ('Jamaican', 'Jamaican'),
        ('Japanese', 'Japanese'),
        ('Jordanian', 'Jordanian'),
        ('Kenyan', 'Kenyan'),
        ('Kuwaiti', 'Kuwaiti'),
        ('Lao', 'Lao'),
        ('Latvian', 'Latvian'),
        ('Lebanese', 'Lebanese'),
        ('Libyan', 'Libyan'),
        ('Lithuanian', 'Lithuanian'),
        ('Malagasy', 'Malagasy'),
        ('Malaysian', 'Malaysian'),
        ('Malian', 'Malian'),
        ('Maltese', 'Maltese'),
        ('Mexican', 'Mexican'),
        ('Mongolian', 'Mongolian'),
        ('Moroccan', 'Moroccan'),
        ('Mozambican', 'Mozambican'),
        ('Namibian', 'Namibian'),
        ('Nepalese', 'Nepalese'),
        ('Dutch', 'Dutch'),
        ('New Zealand', 'New Zealand'),
        ('Nicaraguan', 'Nicaraguan'),
        ('Nigerian', 'Nigerian'),
        ('Norwegian', 'Norwegian'),
        ('Pakistani', 'Pakistani'),
        ('Panamanian', 'Panamanian'),
        ('Paraguayan', 'Paraguayan'),
        ('Peruvian', 'Peruvian'),
        ('Philippine', 'Philippine'),
        ('Polish', 'Polish'),
        ('Portuguese', 'Portuguese'),
        ('Romanian', 'Romanian'),
        ('Russian', 'Russian'),
        ('Saudi', 'Saudi'),
        ('Scottish', 'Scottish'),
        ('Senegalese', 'Senegalese'),
        ('Serbian', 'Serbian'),
        ('Singaporean', 'Singaporean'),
        ('Slovak', 'Slovak'),
        ('South African', 'South African'),
        ('Korean', 'Korean'),
        ('Spanish', 'Spanish'),
        ('Sri Lankan', 'Sri Lankan'),
        ('Sudanese', 'Sudanese'),
        ('Swedish', 'Swedish'),
        ('Swiss', 'Swiss'),
        ('Syrian', 'Syrian'),
        ('Taiwanese', 'Taiwanese'),
        ('Tajikistani', 'Tajikistani'),
        ('Thai', 'Thai'),
        ('Tongan', 'Tongan'),
        ('Tunisian', 'Tunisian'),
        ('Turkish', 'Turkish'),
        ('Ukrainian', 'Ukrainian'),
        ('Emirati', 'Emirati'),
        ('British', 'British'),
        ('American', 'American'),
        ('Uruguayan', 'Uruguayan'),
        ('Venezuelan', 'Venezuelan'),
        ('Vietnamese', 'Vietnamese'),
        ('Welsh', 'Welsh'),
        ('Zambian', 'Zambian'),
        ('Zimbabwean', 'Zimbabwean')
    ]

    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, default='M')
    dob = models.DateField()
    department = models.CharField(choices=DEPARTMENT_CHOICES, max_length=100)
    specialization = models.CharField(max_length=300)
    registration_number = models.IntegerField(default=0)
    years_of_experience = models.PositiveSmallIntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    hospital = models.CharField(max_length=100, blank=True)
    hospital_address = models.CharField(max_length=300, blank=True)
    start_hours = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(23)])
    start_minutes = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(30)])
    end_hours = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(23)])
    end_minutes = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(30)])
    nationality = models.CharField(choices=NATIONALITY_CHOICES, max_length=50)
    home_address = models.CharField(max_length=300)
    contact_number = PhoneNumberField(unique=True)
    profile_pic = models.ImageField(upload_to='images/doctor/profile', blank=True)

    REQUIRED_FIELDS = [
                        'first_name',
                        'last_name',
                        'gender',
                        'dob',
                        'department',
                        'specialization',
                        'registration_number',
                        'years_of_experience',
                        'hospital',
                        'hospital_address',
                        'start_hours',
                        'start_minutes',
                        'end_hours',
                        'end_minutes',
                        'nationality',
                        'home_address',
                        'contact_number'
                      ]
