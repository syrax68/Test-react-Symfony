<?php

namespace App\Entity;

use App\Entity\User;
use App\Entity\Car;
use DateTimeImmutable;
use App\Repository\CommentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=CommentRepository::class)
 * @ApiResource(
 *  subresourceOperations={
 *      "api_users_comments_get_subresource"={
 *          "normalization_context"={
 *              "groups"={"comments_subresource"}
 *          }
 *      }
 *  },
 *  attributes={
 *      "pagination_enabled"=true,
 *      "pagination_items_per_page"=10,
 *      "order":{"createdAt":"desc"}
 *  },
 *  normalizationContext={
 *      "groups"={"comments_read"}
 *  }
 * )
 */
class Comment
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({"comments_read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"comments_read","comments_subresource"})
     * @Assert\NotBlank(message="La commentaire est obligatoire")
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="comments")
     * @Groups({"comments_read"})
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Car::class, inversedBy="comments")
     * @Groups({"comments_read"})
     */
    private $car;

    public function __construct()
    {
        $this->createdAt = new DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getCar(): ?Car
    {
        return $this->car;
    }

    public function setCar(?Car $car): self
    {
        $this->car = $car;

        return $this;
    }
}
