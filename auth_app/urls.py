from django.urls import path
from . import views # Importa as views do mesmo diretório

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('cadastro/', views.cadastro_view, name='cadastro'), # URL para a tela de cadastro
    path('dashboard/aluno/', views.render_dashboard, {'template_name': 'auth_app/dashboard_aluno.html', 'role_name': 'aluno'}, name='dashboard_aluno'),
    path('dashboard/professor/', views.render_dashboard, {'template_name': 'auth_app/dashboard_professor.html', 'role_name': 'professor'}, name='dashboard_professor'),
    path('dashboard/diretor/', views.render_dashboard, {'template_name': 'auth_app/dashboard_diretor.html', 'role_name': 'diretor'}, name='dashboard_diretor'),
    path('', views.home_page, name='home'), # URL raiz do app_auth, redirecionará para login/dashboard
]