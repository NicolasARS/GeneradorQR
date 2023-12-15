<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\Cookie;

class SecurityController extends AbstractController
{
    #[Route(path: '/login', name: 'login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // if ($this->getUser()) {
        //     return $this->redirectToRoute('target_path');
        // }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();
        
        $response = $this->render('security/login.html.twig', [
        'last_username' => $lastUsername, 
        'error' => $error
    ]);

    // Establecer una cookie cuando se carga la página de inicio de sesión
    // Definir el nombre y el valor de la cookie
    $nombreCookie = 'visitado_login';
    $valorCookie = '1';

    // Calcular la fecha de expiración (actual + 1 hora)
    $expiracion = new \DateTime('+1 hour');// Expira en 1 hora

    // Crear la cookie
    $cookie = new Cookie($nombreCookie, $valorCookie, $expiracion); 
    $response->headers->setCookie($cookie);

    return $response;
    }

    #[Route(path: '/logout', name: 'logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
