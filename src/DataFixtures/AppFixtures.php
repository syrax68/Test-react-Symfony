<?php

namespace App\DataFixtures;

use App\Entity\Comment;
use App\Entity\User;
use App\Entity\Car;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }
    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create('fr_FR');
        // $product = new Product();
        // $manager->persist($product);
        for ($i = 0; $i < 5; $i++) {
           
            $user = new User();
            $hash = $this->encoder->encodePassword($user,'12345');
            $user->setLastname($faker->lastName)
                    ->setFirstname($faker->firstName)
                    ->setEmail($faker->email)
                    ->setPassword($hash);

            $manager->persist($user);
            for ($j = 0; $j < 5; $j++) {
                $car = new Car();
                $car->setName($faker->randomElement(['Ford','Toyota','Mercedes','Nissan','Subaru','Mazda','Lotus']))
                        ->setDescription('test')
                        ->setPrice($faker->randomFloat(2, 2000,10000));
                $manager->persist($car);
                for ($k = 0; $k < 5; $k++) {
                    $comment = new Comment();
                    $comment->setContent($faker->paragraph(1))
                            ->setUser($user)
                            ->setCar($car);
                    $manager->persist($comment);
                }
            }
        }
        
        
        $manager->flush();
    }
}
