-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema kayu
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `kayu` ;

-- -----------------------------------------------------
-- Schema kayu
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `kayu` DEFAULT CHARACTER SET utf8 ;
USE `kayu` ;

-- -----------------------------------------------------
-- Table `kayu`.`categorias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kayu`.`categorias` ;

CREATE TABLE IF NOT EXISTS `kayu`.`categorias` (
  `idCategorias` INT(11) NOT NULL,
  PRIMARY KEY (`idCategorias`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `kayu`.`lugar`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kayu`.`lugar` ;

CREATE TABLE IF NOT EXISTS `kayu`.`lugar` (
  `idLugar` INT(11) NOT NULL AUTO_INCREMENT,
  `Latitud` DECIMAL(8,6) NOT NULL,
  `Longitud` DECIMAL(9,6) NOT NULL,
  `Descripcion` VARCHAR(3000) NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Imagenes` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idLugar`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `kayu`.`categoriaLugar`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kayu`.`categoriaLugar` ;

CREATE TABLE IF NOT EXISTS `kayu`.`categoriaLugar` (
  `idCaregorias-Lugar` INT(11) NOT NULL,
  `Lugar_idLugar` INT(11) NOT NULL,
  `Categorias_idCategorias` INT(11) NOT NULL,
  PRIMARY KEY (`idCaregorias-Lugar`, `Lugar_idLugar`, `Categorias_idCategorias`),
  INDEX `fk_Caregorias-Lugar_Lugar_idx` (`Lugar_idLugar` ASC) VISIBLE,
  INDEX `fk_Caregorias-Lugar_Categorias1_idx` (`Categorias_idCategorias` ASC) VISIBLE,
  CONSTRAINT `fk_Caregorias-Lugar_Categorias1`
    FOREIGN KEY (`Categorias_idCategorias`)
    REFERENCES `kayu`.`categorias` (`idCategorias`),
  CONSTRAINT `fk_Caregorias-Lugar_Lugar`
    FOREIGN KEY (`Lugar_idLugar`)
    REFERENCES `kayu`.`lugar` (`idLugar`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `kayu`.`personalidad`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kayu`.`personalidad` ;

CREATE TABLE IF NOT EXISTS `kayu`.`personalidad` (
  `idPersonalidad` INT(11) NOT NULL,
  `Personalidad` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idPersonalidad`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `kayu`.`reseña`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kayu`.`reseña` ;

CREATE TABLE IF NOT EXISTS `kayu`.`reseña` (
  `idReseña` INT(11) NOT NULL AUTO_INCREMENT,
  `Puntuacion` FLOAT NOT NULL,
  `Comentario` VARCHAR(1500) NULL DEFAULT NULL,
  `Lugar_idLugar` INT(11) NOT NULL,
  PRIMARY KEY (`idReseña`, `Lugar_idLugar`),
  INDEX `fk_Reseña_Lugar1_idx` (`Lugar_idLugar` ASC) VISIBLE,
  CONSTRAINT `fk_Reseña_Lugar1`
    FOREIGN KEY (`Lugar_idLugar`)
    REFERENCES `kayu`.`lugar` (`idLugar`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `kayu`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kayu`.`usuario` ;

CREATE TABLE IF NOT EXISTS `kayu`.`usuario` (
  `NombreUsuario` VARCHAR(45) NOT NULL,
  `PassUsuario` VARCHAR(45) NOT NULL,
  `Personalidad_idPersonalidad` INT(11) NOT NULL,
  PRIMARY KEY (`NombreUsuario`),
  INDEX `fk_Usuario_Personalidad1_idx` (`Personalidad_idPersonalidad` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_Personalidad1`
    FOREIGN KEY (`Personalidad_idPersonalidad`)
    REFERENCES `kayu`.`personalidad` (`idPersonalidad`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `kayu`.`usuarioReseña`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kayu`.`usuarioReseña` ;

CREATE TABLE IF NOT EXISTS `kayu`.`usuarioReseña` (
  `Reseña_idReseña` INT(11) NOT NULL,
  `Reseña_Lugar_idLugar` INT(11) NOT NULL,
  `Usuario_NombreUsuario` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Reseña_idReseña`, `Reseña_Lugar_idLugar`, `Usuario_NombreUsuario`),
  INDEX `fk_Usuario-Reseña_Reseña1_idx` (`Reseña_idReseña` ASC, `Reseña_Lugar_idLugar` ASC) VISIBLE,
  INDEX `fk_Usuario-Reseña_Usuario1_idx` (`Usuario_NombreUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario-Reseña_Reseña1`
    FOREIGN KEY (`Reseña_idReseña` , `Reseña_Lugar_idLugar`)
    REFERENCES `kayu`.`reseña` (`idReseña` , `Lugar_idLugar`),
  CONSTRAINT `fk_Usuario-Reseña_Usuario1`
    FOREIGN KEY (`Usuario_NombreUsuario`)
    REFERENCES `kayu`.`usuario` (`NombreUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `kayu`.`lugar`
-- -----------------------------------------------------
START TRANSACTION;
USE `kayu`;
INSERT INTO `kayu`.`lugar` (`idLugar`, `Latitud`, `Longitud`, `Descripcion`, `Nombre`, `Imagenes`) VALUES (1, -10.213123, 20.123456, 'Efectivamente  los algoritmos geneticos son una herramienta poderosa', 'El sol', 'https://estaticos-cdn.sport.es/clip/d61683f7-d846-46cd-9234-9eb6eeb57bba_alta-libre-aspect-ratio_default_0.jpg');

COMMIT;


-- -----------------------------------------------------
-- Data for table `kayu`.`personalidad`
-- -----------------------------------------------------
START TRANSACTION;
USE `kayu`;
INSERT INTO `kayu`.`personalidad` (`idPersonalidad`, `Personalidad`) VALUES (1, 'INTJ-A / INTJ-T');
INSERT INTO `kayu`.`personalidad` (`idPersonalidad`, `Personalidad`) VALUES (2, 'INTP-A / INTP-T');
INSERT INTO `kayu`.`personalidad` (`idPersonalidad`, `Personalidad`) VALUES (3, 'ENTJ-A / ENTJ-T');
INSERT INTO `kayu`.`personalidad` (`idPersonalidad`, `Personalidad`) VALUES (4, 'ENTP-A /ENTP-T');
INSERT INTO `kayu`.`personalidad` (`idPersonalidad`, `Personalidad`) VALUES (5, 'INFJ-A /INFJ-T');
INSERT INTO `kayu`.`personalidad` (`idPersonalidad`, `Personalidad`) VALUES (6, 'INFP-A /INFP-T');
INSERT INTO `kayu`.`personalidad` (`idPersonalidad`, `Personalidad`) VALUES (7, 'ENFJ-A /ENFJ-T');
INSERT INTO `kayu`.`personalidad` (`idPersonalidad`, `Personalidad`) VALUES (8, 'ENFP-A /ENFP-T');
INSERT INTO `kayu`.`personalidad` (`idPersonalidad`, `Personalidad`) VALUES (9, 'ISTJ-A /ISTJ-T');
INSERT INTO `kayu`.`personalidad` (`idPersonalidad`, `Personalidad`) VALUES (10, 'ISFJ-A /ISFJ-T');
INSERT INTO `kayu`.`personalidad` (`idPersonalidad`, `Personalidad`) VALUES (11, 'ESTJ-A /ESTJ-T');
INSERT INTO `kayu`.`personalidad` (`idPersonalidad`, `Personalidad`) VALUES (12, 'ESFJ-A /ESFJ-T');
INSERT INTO `kayu`.`personalidad` (`idPersonalidad`, `Personalidad`) VALUES (13, 'ISTP-A /ISTP-T');
INSERT INTO `kayu`.`personalidad` (`idPersonalidad`, `Personalidad`) VALUES (14, 'ISFP-A /ISFP-T');
INSERT INTO `kayu`.`personalidad` (`idPersonalidad`, `Personalidad`) VALUES (15, 'ESTP-A /ESTP-T');
INSERT INTO `kayu`.`personalidad` (`idPersonalidad`, `Personalidad`) VALUES (16, 'ESFP-A /ESFP-T');

COMMIT;


-- -----------------------------------------------------
-- Data for table `kayu`.`reseña`
-- -----------------------------------------------------
START TRANSACTION;
USE `kayu`;
INSERT INTO `kayu`.`reseña` (`idReseña`, `Puntuacion`, `Comentario`, `Lugar_idLugar`) VALUES (1, 3.5, '\"Buen lugar muy entretenido\"', 1);
INSERT INTO `kayu`.`reseña` (`idReseña`, `Puntuacion`, `Comentario`, `Lugar_idLugar`) VALUES (2, 2, '\"Muy aburrido todo :(\"', 1);
INSERT INTO `kayu`.`reseña` (`idReseña`, `Puntuacion`, `Comentario`, `Lugar_idLugar`) VALUES (3, 5, '\"El mejor lugar para ir si estas aburrido :D\"', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `kayu`.`usuario`
-- -----------------------------------------------------
START TRANSACTION;
USE `kayu`;
INSERT INTO `kayu`.`usuario` (`NombreUsuario`, `PassUsuario`, `Personalidad_idPersonalidad`) VALUES ('admin', 'admin', 1);
INSERT INTO `kayu`.`usuario` (`NombreUsuario`, `PassUsuario`, `Personalidad_idPersonalidad`) VALUES ('uva', 'uva', 16);
INSERT INTO `kayu`.`usuario` (`NombreUsuario`, `PassUsuario`, `Personalidad_idPersonalidad`) VALUES ('usuario', 'usuario', 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `kayu`.`usuarioReseña`
-- -----------------------------------------------------
START TRANSACTION;
USE `kayu`;
INSERT INTO `kayu`.`usuarioReseña` (`Reseña_idReseña`, `Reseña_Lugar_idLugar`, `Usuario_NombreUsuario`) VALUES (1, 1, 'admin');
INSERT INTO `kayu`.`usuarioReseña` (`Reseña_idReseña`, `Reseña_Lugar_idLugar`, `Usuario_NombreUsuario`) VALUES (2, 1, 'uva');
INSERT INTO `kayu`.`usuarioReseña` (`Reseña_idReseña`, `Reseña_Lugar_idLugar`, `Usuario_NombreUsuario`) VALUES (3, 1, 'usuario');

COMMIT;

