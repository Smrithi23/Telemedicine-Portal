from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from phonenumber_field.modelfields import PhoneNumberField
from .Account import Account

class PatientAccount(models.Model):

    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female')
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
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, default='M')
    dob = models.DateField()
    occupation = models.CharField(max_length=100)
    nationality = models.CharField(choices=NATIONALITY_CHOICES, max_length=50)
    height = models.DecimalField(max_digits=5, decimal_places=2, validators=[MinValueValidator(0.0), MaxValueValidator(12.0)], blank=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2, validators=[MinValueValidator(0.0), MaxValueValidator(700.0)], blank=True)
    blood_group = models.CharField(max_length=5)
    contact_number = PhoneNumberField()
    home_address = models.CharField(max_length=300)
    profile_pic = models.ImageField(upload_to="images/profile", blank=True)

    pre_medical_conditions = models.CharField(max_length=300)
    surgeries_in_past = models.CharField(max_length=300)
    allergies = models.CharField(max_length=300)

    REQUIRED_FIELDS = [
                        'first_name',
                        'last_name',
                        'gender',
                        'dob',
                        'nationality',
                        'height',
                        'weight',
                        'blood_group',
                        'contact_number',
                        'home_address',
                      ]
