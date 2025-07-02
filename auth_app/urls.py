from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('cadastro/', views.cadastro_view, name='cadastro'),
    path('dashboard/aluno/', views.render_dashboard, {'template_name': 'auth_app/dashboard_aluno.html', 'role_name': 'aluno'}, name='dashboard_aluno'),
    path('dashboard/professor/', views.render_dashboard, {'template_name': 'auth_app/dashboard_professor.html', 'role_name': 'professor'}, name='dashboard_professor'),
    path('dashboard/diretor/', views.render_dashboard, {'template_name': 'auth_app/dashboard_diretor.html', 'role_name': 'diretor'}, name='dashboard_diretor'),
    path('', views.home_page, name='home'),
    path('temp_dashboard/<str:role>/', views.temp_dashboard_view, name='temp_dashboard_view'),
    path('temp_dashboard/', views.temp_dashboard_view, {'role': 'aluno'}, name='temp_dashboard_default'),
]