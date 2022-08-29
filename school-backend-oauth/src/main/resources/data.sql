CREATE USER 'schoolmgmt'@'localhost' IDENTIFIED BY 'schoolmgmt';

GRANT ALL PRIVILEGES ON * . * TO 'schoolmgmt'@'localhost';
--
-- Starting with MySQL 8.0.4, the MySQL team changed the
-- default authentication plugin for MySQL server
-- from mysql_native_password to caching_sha2_password.
--
-- The command below will make the appropriate updates for your user account.
--
-- See the MySQL Reference Manual for details:
-- https://dev.mysql.com/doc/refman/8.0/en/caching-sha2-pluggable-authentication.html
--
ALTER USER 'schoolmgmt'@'localhost' IDENTIFIED WITH mysql_native_password BY 'schoolmgmt';

-- -----------------------------------------------------
-- Schema school-database
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `school-database`;

CREATE SCHEMA `school-database`;
USE `school-database` ;


-- -----------------------------------------------------
-- Table `school-database`.`student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `student` (
	`id` int NOT NULL AUTO_INCREMENT,
	`first_name` varchar(255) NULL DEFAULT NULL,
	`last_name` varchar(255) NULL DEFAULT NULL,
	`parent_name` varchar(255) NULL DEFAULT NULL,
	`mobile` varchar(255) NULL DEFAULT NULL,
	`email` varchar(255) NULL DEFAULT NULL,
	`address` varchar(255) NULL DEFAULT NULL,
	`gender` varchar(25) NULL DEFAULT NULL,
	`yearOfBirth` int,
	`image_url` varchar(255) NULL DEFAULT NULL,
	PRIMARY KEY (`id`))
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Add sample data into `school-database`.`student`
-- -----------------------------------------------------

INSERT INTO student(id, first_name, last_name, parent_name, mobile, email, image_url) VALUES (null, 'Ana', 'Anic', 'Ime roditelja', '8058252', 'anaanic@gmail.com', '0510999574638');

-- -----------------------------------------------------
-- Table `school-database`.`professor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `professor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NULL DEFAULT NULL,
  `last_name` varchar(255) NULL DEFAULT NULL,
  `about` varchar(255) NULL DEFAULT NULL,
  `mobile` varchar(255) NULL DEFAULT NULL,
  `email` varchar(255) NULL DEFAULT NULL,
  `image_url` varchar(255) NULL DEFAULT NULL,
	PRIMARY KEY (`id`))
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Add sample data into `school-database`.`professor`
-- -----------------------------------------------------

INSERT INTO professor(id, first_name, last_name, about, mobile, email, image_url) VALUES (null, 'Profa', 'Profic', 'rodjen tu i tu','0697874632', 'profa@gmail.com', 'IMAGE_URL');


-- -----------------------------------------------------
-- Table `school-database`.`subject`
-- -----------------------------------------------------
CREATE TABLE `subject` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `syllabus` varchar(255),
   `literature` varchar(255),
  PRIMARY KEY (`id`)
)ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Add sample data into `school-database`.`subject`
-- -----------------------------------------------------

 INSERT INTO subject(id, name, syllabus, literature) VALUES(null, 'matematika', 'cilj ovog predmeta je itd itd', 'Matematika Vene Bogoslavov');

-- -----------------------------------------------------
-- Table `school-database`.`course`
-- -----------------------------------------------------
CREATE TABLE `course` (
   `id` int NOT NULL AUTO_INCREMENT,
   `name` varchar(50) NOT NULL,
   `start_date` Date,
   `end_date` Date,
   `subject_id` int,
   `professor_id` int,
	PRIMARY KEY (`id`),
	CONSTRAINT `FK_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`),
    CONSTRAINT `FK_professor_id` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`id`)
)ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Add sample data into `school-database`.`course`
-- -----------------------------------------------------

 INSERT INTO course(id, name, start_date, end_date, subject_id, professor_id) VALUES(null, 'matematika 5. razred', '2022-03-05', '2022-03-05', '1', '1');
-- Enrollment(enrollment_id, finished, grade, student_id, course_id)

-- -----------------------------------------------------
-- Table `school-database`.`enrollment`
-- -----------------------------------------------------
CREATE TABLE `enrollment` (
   `id` int NOT NULL AUTO_INCREMENT,
   `finished` boolean,
   `grade` int,
   `student_id` int NOT NULL,
   `course_id` int NOT NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `FK_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
    CONSTRAINT `FK_course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
);

-- -----------------------------------------------------
-- Add sample data into `school-database`.`enrollment`
-- -----------------------------------------------------

 INSERT INTO enrollment(id, finished, grade, student_id, course_id) VALUES(null, '1', '95', '1', '1');

