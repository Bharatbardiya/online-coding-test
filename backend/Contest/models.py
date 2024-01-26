from django.db import models

# Create your models here.


class Contest(models.Model):
    name = models.CharField(max_length=40)
    duration = models.DurationField()
    description = models.TextField()
    difficulty_level = models.CharField(max_length=40)
    instructions = models.TextField()
    allowed_languages = models.TextField()
    
    
    def __str__(self):
        return self.name+str(self.duration)


class Question(models.Model):
    
    title = models.CharField(max_length=100)
    Description = models.TextField()
    difficulty_level = models.CharField(max_length=40)
    tags = models.CharField(max_length=100)
    points = models.IntegerField()
    constraints = models.TextField()
    input_format = models.TextField()
    output_format = models.TextField()
    sample_input = models.TextField()
    sample_output = models.TextField()
    solution = models.TextField()
    hints = models.TextField()
    creator = models.CharField(max_length=40)
    time_limit = models.DurationField()
    memory_limit = models.CharField(max_length=40)
    contest = models.ForeignKey(
        Contest, on_delete=models.CASCADE, related_name='questions')
