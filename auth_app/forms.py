# auth_app/forms.py

from django import forms
from django.contrib.auth.forms import AuthenticationForm

class CustomAuthenticationForm(AuthenticationForm):
    PROFILE_CHOICES = [
        ('aluno', 'Aluno'),
        ('professor', 'Professor'),
        ('diretor', 'Diretor'),
    ]
    profile_type = forms.ChoiceField(
        choices=PROFILE_CHOICES,
        label="Eu sou",
        widget=forms.Select(attrs={'class': 'form-control'})
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'placeholder': 'Seu email ou login'})
        self.fields['password'].widget.attrs.update({'placeholder': 'Sua senha'})
        self.fields['username'].label = ''
        self.fields['password'].label = ''