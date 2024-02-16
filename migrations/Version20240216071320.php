<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240216071320 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE IF NOT EXISTS codigo_qr (id INT AUTO_INCREMENT NOT NULL, usuario_id INT NOT NULL, url LONGTEXT NOT NULL, size INT NOT NULL, format VARCHAR(255) DEFAULT NULL, color_foreground VARCHAR(255) NOT NULL, color_background VARCHAR(255) NOT NULL, logo_path VARCHAR(255) DEFAULT NULL, fecha_creacion DATETIME NOT NULL, INDEX IDX_7DB6509EDB38439E (usuario_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        //$this->addSql('ALTER TABLE codigo_qr ADD CONSTRAINT FK_7DB6509EDB38439E FOREIGN KEY (usuario_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE codigo_qr DROP FOREIGN KEY FK_7DB6509EDB38439E');
        $this->addSql('DROP TABLE codigo_qr');
    }
}
