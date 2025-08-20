package com.stability.ai.generate_photos.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class GenerateAiService {

    private static final String API_URL = "https://api.stability.ai/v2beta/stable-image/generate/core";
    private static final String API_KEY = "sk-sMijdZLfROTeoYcNykHx9W4miBPR4DWsVw9gELKcB9pDFKjt";

    public ResponseEntity<byte[]> generateTextToImage(String prompt) {
        RestTemplate restTemplate = new RestTemplate();

        // Prepare multipart/form-data body
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("prompt", prompt);
        body.add("output_format", "webp");

        // Prepare headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.set("Authorization", "Bearer " + API_KEY);
        headers.setAccept(MediaType.parseMediaTypes("image/*"));

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // Call Stability API
        ResponseEntity<byte[]> response = restTemplate.exchange(
                API_URL,
                HttpMethod.POST,
                requestEntity,
                byte[].class
        );

        return response;
    }
}
