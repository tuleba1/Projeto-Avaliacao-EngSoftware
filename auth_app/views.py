from django.shortcuts import render
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import CustomAuthenticationForm

def login_view(request):
    """
    Função de view para a tela de login.
    Lida com a exibição do formulário e o processamento do login.
    """
    if request.method == 'POST':
        form = CustomAuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            profile_type = form.cleaned_data.get('profile_type', 'aluno') # Default para 'aluno'

            login(request, user)
            messages.success(request, f"Bem-vindo(a), {user.username}!")

            # Lógica de redirecionamento baseada no perfil selecionado
            # Você pode expandir isso com lógica de Role/Grupo real no futuro
            if profile_type == 'diretor':
                return redirect('dashboard_diretor')
            elif profile_type == 'professor':
                return redirect('dashboard_professor')
            elif profile_type == 'aluno':
                return redirect('dashboard_aluno')
            else:
                return redirect('home') # Fallback
        else:
            messages.error(request, "Usuário ou senha inválidos. Verifique suas credenciais e seu perfil.")
    else:
        form = CustomAuthenticationForm() # Instancia um formulário vazio para requisições GET

    return render(request, 'auth_app/login.html', {'form': form})


def logout_view(request):
    """
    Função de view para realizar o logout do usuário.
    """
    logout(request)
    messages.info(request, "Você foi desconectado(a).")
    return redirect('login') # Redireciona para a tela de login


@login_required # Garante que apenas usuários logados possam acessar
def render_dashboard(request, template_name, role_name):
    """
    Função genérica para renderizar um dashboard.
    Recebe o nome do template e o papel (role) como argumentos.
    """
    # Em um projeto real, você faria verificações de permissão aqui:
    # if not request.user.has_perm(f'auth_app.can_access_{role_name}_dashboard'):
    #     messages.error(request, "Você não tem permissão para acessar este painel.")
    #     return redirect('home') # Ou para um dashboard permitido

    return render(request, template_name, {'user': request.user, 'role': role_name.capitalize()})


def home_page(request):
    """
    Função de view para a página inicial (raiz do site).
    Redireciona para o dashboard apropriado se o usuário estiver logado.
    Caso contrário, redireciona para a tela de login.
    """
    if request.user.is_authenticated:
        # Lógica simples para redirecionar com base em is_superuser ou um papel padrão
        if request.user.is_superuser: # Exemplo: superusuário vai para dashboard diretor
            return redirect('dashboard_diretor')
        else: # Outros usuários autenticados vão para dashboard aluno como padrão
            return redirect('dashboard_aluno')
    return redirect('login') # Se não estiver logado, vai para a tela de login

# Apenas um placeholder para a tela de cadastro por enquanto
def cadastro_view(request):
    return render(request, 'auth_app/cadastro.html')

# Create your views here.
