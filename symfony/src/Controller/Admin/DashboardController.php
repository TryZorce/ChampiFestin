<?php

namespace App\Controller\Admin;

use App\Entity\Category;
use App\Entity\Product;
use App\Entity\Promotion;
use App\Entity\Order;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        // return parent::index();

        // Option 1. You can make your dashboard redirect to some common page of your backend
        //
        $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        return $this->redirect($adminUrlGenerator->setController(CategoryCrudController::class)->generateUrl());

        // Option 2. You can make your dashboard redirect to different pages depending on the user
        //
        // if ('jane' === $this->getUser()->getUsername()) {
        //     return $this->redirect('...');
        // }

        // Option 3. You can render some custom template to display a proper dashboard with widgets, etc.
        // (tip: it's easier if your template extends from @EasyAdmin/page/content.html.twig)
        //
        // return $this->render('some/path/my-dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Symfony');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');
        // yield MenuItem::section("Categories");
        yield MenuItem::subMenu("Categories")->setSubItems([
            MenuItem::linkToCrud('List', 'fas fa-list', Category::class),
            MenuItem::linkToCrud('Ajouter', 'fas fa-list', Category::class)
            ->setAction('new')
        ]);

        yield MenuItem::subMenu("Products")->setSubItems([
            MenuItem::linkToCrud('List', 'fas fa-list', Product::class),
            MenuItem::linkToCrud('Ajouter', 'fas fa-list', Product::class)
            ->setAction('new')
        ]);

        yield MenuItem::subMenu("Promotion")->setSubItems([
            MenuItem::linkToCrud('List', 'fas fa-list', Promotion::class),
            MenuItem::linkToCrud('Ajouter', 'fas fa-list', Promotion::class)
            ->setAction('new')
        ]);
        
        
        yield MenuItem::subMenu("Orders")->setSubItems([
            MenuItem::linkToCrud('List', 'fas fa-list', Order::class),
            MenuItem::linkToCrud('Ajouter', 'fas fa-list', Order::class)
            ->setAction('new')
        ]);
        yield MenuItem::linkToUrl('Symfony', 'fa-solid fa-house', '/');
        yield MenuItem::linkToUrl('Accueil', 'fa-solid fa-house', 'http://localhost:3000/');
        yield MenuItem::linkToUrl('Github', 'fab fa-github', 'https://github.com/TryZorce/ChampiFestin');
        yield MenuItem::linkToUrl('YouTube', 'fab fa-youtube', 'https://www.youtube.com/watch?v=Y9Zw6xOGly0&ab_channel=NEFOS');
    }
}
