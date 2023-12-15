<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevel;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Symfony\Component\HttpFoundation\Cookie;

class ServicesController extends AbstractController
{
    #[Route('/generar-qr', name: 'generar_qr')]
    public function generarQr(Request $request): Response
{
    $url = $request->query->get('url');
    $qrCode = Builder::create()
        ->writer(new PngWriter())
        ->writerOptions([])
        ->data($url)
        ->encoding(new Encoding('UTF-8'))
        ->build();

    // Crear o actualizar la cookie de historial
    $historial = $request->cookies->get('historial_qr', []);
    if (!is_array($historial)) {
        $historial = json_decode($historial, true) ?: [];
    }

    // Añadir la nueva URL al historial
    $historial[] = $url;
    
    // Limitar el tamaño del historial, si es necesario
    $limiteHistorial = 5; // por ejemplo, mantener solo los últimos 10 elementos
    if (count($historial) > $limiteHistorial) {
        $historial = array_slice($historial, -$limiteHistorial);
    }

    // Crear la cookie con el historial actualizado
    // Nombre y contenido de la cookie
    $nombreCookie = 'historial_qr';
    $contenidoCookie = json_encode($historial);

    // Calcular la fecha de expiración (actual + 30 días)
    $fechaExpiracion = new \DateTime('+30 days');

    // Crear la cookie
    $cookieHistorial = new Cookie($nombreCookie, $contenidoCookie, $fechaExpiracion);

    $response = new Response($qrCode->getString());
    $response->headers->set('Content-Type', $qrCode->getMimeType());
    $response->headers->setCookie($cookieHistorial);

    return $response;
}
}