<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Cookie;

class CookiesController extends AbstractController
{
    #[Route('/cookies', name: 'app_cookies')]
    public function index(): Response
    {
        return $this->render('cookies/index.html.twig', [
            'controller_name' => 'CookiesController',
        ]);
    }

    #[Route('/aceptar-cookies', name: 'aceptar_cookies')]
    public function aceptarCookies(): Response
    {
    $response = new Response();
    $nombreCookie = 'aceptar_cookies';
    $valorCookie = '1';

    $expiracion = new \DateTime('+1 year');
    $cookie = new Cookie($nombreCookie, $valorCookie, $expiracion);
    $response->headers->setCookie($cookie);
    $response->send();

    return $this->redirectToRoute('index');
    }

    #[Route('/login-visited-cookie', name: 'login_visited_cookie')]
    public function setLoginVisitedCookie(): Response
    {
    $response = new Response();
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
}
