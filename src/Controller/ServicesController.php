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

class ServicesController extends AbstractController
{
    #[Route('/generar-qr', name: 'generar_qr')]
    public function generarQr(Request $request): Response
{

    $url = $request->query->get('url');
    $size = $request->query->get('size');
    
    if (!in_array($size, [100, 200, 300, 400, 500])) {
        $size = 200; // Tamaño por defecto si el valor no es válido
    }

    $qrCode = Builder::create()
        ->writer(new PngWriter())
        ->writerOptions([])
        ->data($url)
        ->encoding(new Encoding('UTF-8'))
        ->size($size)
        ->build();

    $response = new Response($qrCode->getString());
    $response->headers->set('Content-Type', $qrCode->getMimeType());
    $response->headers->set('Content-Disposition', 'attachment; filename="qr_code.png"');

    return $response;
}
}
