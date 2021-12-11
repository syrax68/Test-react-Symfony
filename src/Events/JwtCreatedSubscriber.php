<?php

namespace App\Events;


use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber{
    public function updateJwtData(JWTCreatedEvent $event){
        //get user
        //add lastname and firstname
        $user = $event->getUser();
        $data = $event->getData();
        $data['id'] = $user->getId();
        $data['lastname'] = $user->getLastname();
        $data['firstname'] = $user->getFirstname();
        $event->setData($data);
    }
}