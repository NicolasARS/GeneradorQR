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
use Endroid\QrCode\Color\Color;

class ServicesController extends AbstractController
{
    #[Route('/generar-qr', name: 'generar_qr')]
    public function generarQr(Request $request): Response
    {
        $url = $request->query->get('url');
        $size = $request->query->get('size');
        $format = $request->query->get('format');
        $colorForeground = $request->query->get('colorForeground', '#000000'); // Color por defecto: negro
        $colorBackground = $request->query->get('colorBackground', '#ffffff'); // Color por defecto: blanco

        if (!in_array($size, [100, 200, 300, 400, 500])) {
            $size = 300; // Tamaño por defecto si el valor no es válido
        }

        // Construir el código QR
        $qrCode = Builder::create()
            ->data($url)
            ->encoding(new Encoding('UTF-8'))
            ->size($size)
            ->foregroundColor(new Color(hexdec(substr($colorForeground, 1, 2)), hexdec(substr($colorForeground, 3, 2)), hexdec(substr($colorForeground, 5, 2))))
            ->backgroundColor(new Color(hexdec(substr($colorBackground, 1, 2)), hexdec(substr($colorBackground, 3, 2)), hexdec(substr($colorBackground, 5, 2))));

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
