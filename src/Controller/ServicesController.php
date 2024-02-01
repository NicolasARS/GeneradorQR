<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Writer\SvgWriter;

class ServicesController extends AbstractController
{
    #[Route('/generar-qr', name: 'generar_qr')]
    public function generarQr(Request $request): Response
    {
        $url = $request->query->get('url');
        $size = $request->query->get('size');
        $format = $request->query->get('format');

        if (!in_array($size, [100, 200, 300, 400, 500])) {
            $size = 200; // Tamaño por defecto si el valor no es válido
        }

        // Construir el código QR
        $qrCode = Builder::create()
            ->data($url)
            ->encoding(new Encoding('UTF-8'))
            ->size($size);

        // Configurar el escritor según el formato solicitado
        if ($format === 'svg') {
            $qrCode->writer(new SvgWriter());
        } else {
            $qrCode->writer(new PngWriter());
        }

        // Obtener la instancia de QrCode después de construir
        $qrCode = $qrCode->build();

        $response = new Response($qrCode->getString());
        $response->headers->set('Content-Type', $qrCode->getMimeType());
        $response->headers->set('Content-Disposition', 'attachment; filename="qr_code.' . $format . '"');

        return $response;
    }
}
