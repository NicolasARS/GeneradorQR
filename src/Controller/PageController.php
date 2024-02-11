<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Contact;
use Symfony\Component\HttpFoundation\Request;
use App\Form\ContactFormType;

class PageController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(Request $request): Response
    {
        $cookieAceptada = $request->cookies->get('aceptar_cookies');

        return $this->render('page/index.html.twig', [
        'cookieAceptada' => $cookieAceptada
    ]);
    }

    #[Route('/about', name: 'about')]
    public function about(Request $request): Response
    {
        $cookieAceptada = $request->cookies->get('aceptar_cookies');

        return $this->render('page/about.html.twig', [
            'cookieAceptada' => $cookieAceptada
        ]);
    }

    #[Route('/contact', name: 'contact')]
    public function contact(ManagerRegistry $doctrine, Request $request): Response
    {
    $cookieAceptada = $request->cookies->get('aceptar_cookies');
    $contact = new Contact();
    $form = $this->createForm(ContactFormType::class, $contact);
    $form->handleRequest($request);
    if ($form->isSubmitted() && $form->isValid()) {
        $contact = $form->getData();    
        $entityManager = $doctrine->getManager();    
        $entityManager->persist($contact);
        $entityManager->flush();
        return $this->redirectToRoute('thanks', []);
    }
        return $this->render('page/contact.html.twig', [
            'form' => $form->createView(),
            'cookieAceptada' => $cookieAceptada    
    ]);
    }

    #[Route('/news', name: 'news')]
    public function news(Request $request): Response
    {
        $cookieAceptada = $request->cookies->get('aceptar_cookies');

        return $this->render('page/news.html.twig', [
            'cookieAceptada' => $cookieAceptada
        ]);
    }

    #[Route('/thanks', name: 'thanks')]
    public function thanks(Request $request): Response
    {
        $cookieAceptada = $request->cookies->get('aceptar_cookies');

        return $this->render('page/thanks.html.twig', [
            'cookieAceptada' => $cookieAceptada
        ]);
    }
    
    #[Route('/services', name: 'services')]
    public function services(Request $request): Response
    {
        $cookieAceptada = $request->cookies->get('aceptar_cookies');

        return $this->render('services/services.html.twig', [
            'cookieAceptada' => $cookieAceptada
        ]);
    }

    #[Route('/suscriptions', name: 'suscriptions')]
    public function suscriptions(Request $request): Response
    {
        $cookieAceptada = $request->cookies->get('aceptar_cookies');

        return $this->render('page/suscriptions.html.twig', [
            'cookieAceptada' => $cookieAceptada
        ]);
    }

    #[Route('/privacy-policy', name: 'privacy')]
    public function privacy(Request $request): Response
    {
        $cookieAceptada = $request->cookies->get('aceptar_cookies');

        return $this->render('page/privacy-policy.html.twig', [
            'cookieAceptada' => $cookieAceptada
        ]);
    }

    #[Route('/terms-and-conditions', name: 'terms')]
    public function terms(Request $request): Response
    {
        $cookieAceptada = $request->cookies->get('aceptar_cookies');

        return $this->render('page/terms-and-conditions.html.twig', [
            'cookieAceptada' => $cookieAceptada
        ]);
    }
}
