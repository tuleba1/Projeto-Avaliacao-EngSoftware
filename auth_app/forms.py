# auth_app/forms.py

from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import get_user_model 

User = get_user_model() 

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

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User # <-- Essencial para o formulário saber qual modelo usar
        fields = UserCreationForm.Meta.fields + ('email',) # Inclui o campo 'email'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'placeholder': 'Nome de Usuário'})
        self.fields['username'].label = ''
        self.fields['email'].widget.attrs.update({'placeholder': 'Seu Email'})
        self.fields['email'].label = ''
        self.fields['password2'].widget.attrs.update({'placeholder': 'Confirme sua Senha'})
        self.fields['password2'].label = ''
        self.fields['password'].widget.attrs.update({'placeholder': 'Sua Senha'})
        self.fields['password'].label = ''