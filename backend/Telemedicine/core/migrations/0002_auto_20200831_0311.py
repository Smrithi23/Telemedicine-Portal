# Generated by Django 3.0.6 on 2020-08-31 03:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='patientaccount',
            old_name='alergies',
            new_name='allergies',
        ),
    ]
