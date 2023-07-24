package com.gustavo.crudspring;

import com.gustavo.crudspring.enums.Category;
import com.gustavo.crudspring.models.Course;
import com.gustavo.crudspring.models.Lesson;
import com.gustavo.crudspring.repository.CourseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(CourseRepository courseRepository) {
		return args -> {
			courseRepository.deleteAll();

			Course c = new Course();
			c.setName("Angular com Spring");
			c.setCategory(Category.FRONTEND);

			Lesson lesson = new Lesson();
			lesson.setName("Título da aula");
			lesson.setYoutubeUrl("URLyoutube");
			lesson.setCourse(c);

			c.getLessons().add(lesson);

			Lesson lesson2 = new Lesson();
			lesson2.setName("Título da aula 2");
			lesson2.setYoutubeUrl("URLyoutube2");
			lesson2.setCourse(c);

			c.getLessons().add(lesson2);

			courseRepository.save(c);
		};
	}
}
