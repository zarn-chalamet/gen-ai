package com.stability.ai.generate_photos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class GeneratePhotosApplication {

	public static void main(String[] args) {
		SpringApplication.run(GeneratePhotosApplication.class, args);
	}

}
