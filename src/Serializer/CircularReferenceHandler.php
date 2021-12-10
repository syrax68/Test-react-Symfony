<?php  

namespace App\Serializer;

use App\Entity\User;
use App\Entity\Car;
use Symfony\Component\Routing\RouterInterface;

class CircularReferenceHandler{
    /**
     * @var RouterInterface
     */
    public function __construct(RouterInterface $router)
    {
        $this->router = $router;
    }
    public function __invoke($object)
    {
        switch ($object) {
            case $object instanceof User:
                return $this->router->generate('api_users_get_item', ['user' => $object->getId()]);
        }
        return $object->getId();
    }
}