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
    $qrCode = Builder::create()
        ->writer(new PngWriter())
        ->writerOptions([])
        ->data($url)
        ->encoding(new Encoding('UTF-8'))
        ->build();

    $response = new Response($qrCode->getString());
    $response->headers->set('Content-Type', $qrCode->getMimeType());

    return $response;
}
}
