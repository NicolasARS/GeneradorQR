<?php

namespace App\Entity;

use App\Repository\CodigoQRRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CodigoQRRepository::class)]
class CodigoQR
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $url = null;

    #[ORM\Column]
    private ?int $size = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $format = null;

    #[ORM\Column(length: 255)]
    private ?string $colorForeground = null;

    #[ORM\Column(length: 255)]
    private ?string $colorBackground = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $logoPath = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $fechaCreacion = null;

    #[ORM\ManyToOne(inversedBy: 'codigoQRs')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $usuario = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): static
    {
        $this->url = $url;

        return $this;
    }

    public function getSize(): ?int
    {
        return $this->size;
    }

    public function setSize(int $size): static
    {
        $this->size = $size;

        return $this;
    }

    public function getFormat(): ?string
    {
        return $this->format;
    }

    public function setFormat(?string $format): static
    {
        $this->format = $format;

        return $this;
    }

    public function getColorForeground(): ?string
    {
        return $this->colorForeground;
    }

    public function setColorForeground(string $colorForeground): static
    {
        $this->colorForeground = $colorForeground;

        return $this;
    }

    public function getColorBackground(): ?string
    {
        return $this->colorBackground;
    }

    public function setColorBackground(string $colorBackground): static
    {
        $this->colorBackground = $colorBackground;

        return $this;
    }

    public function getLogoPath(): ?string
    {
        return $this->logoPath;
    }

    public function setLogoPath(?string $logoPath): static
    {
        $this->logoPath = $logoPath;

        return $this;
    }

    public function __construct()
    {
        $this->fechaCreacion = new \DateTime();
        // cualquier otra inicialización
    }

    public function getFechaCreacion(): ?\DateTimeInterface
    {
        return $this->fechaCreacion;
    }

    public function setFechaCreacion(\DateTimeInterface $fechaCreacion): static
    {
        $this->fechaCreacion = $fechaCreacion;

        return $this;
    }

    public function getUsuario(): ?User
    {
        return $this->usuario;
    }

    public function setUsuario(?User $usuario): static
    {
        $this->usuario = $usuario;

        return $this;
    }
}
