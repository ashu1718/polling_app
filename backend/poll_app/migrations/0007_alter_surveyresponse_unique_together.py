# Generated by Django 5.1.4 on 2024-12-16 18:00

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('poll_app', '0006_surveyresponse_remove_choice_question_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='surveyresponse',
            unique_together={('user', 'survey')},
        ),
    ]
