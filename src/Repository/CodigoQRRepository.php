<?php

namespace App\Repository;

use App\Entity\CodigoQR;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CodigoQR>
 *
 * @method CodigoQR|null find($id, $lockMode = null, $lockVersion = null)
 * @method CodigoQR|null findOneBy(array $criteria, array $orderBy = null)
 * @method CodigoQR[]    findAll()
 * @method CodigoQR[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CodigoQRRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CodigoQR::class);
    }

//    /**
//     * @return CodigoQR[] Returns an array of CodigoQR objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CodigoQR
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
