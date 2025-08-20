package com.stability.ai.generate_photos.controller;

import com.stability.ai.generate_photos.service.GenerateAiService;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = {"*"})
public class ImageController {

    private final GenerateAiService generateAiService;

    public ImageController(GenerateAiService generateAiService) {
        this.generateAiService = generateAiService;
    }

    @GetMapping("/generate-image")
    public ResponseEntity<byte[]> generateImage(
            @RequestParam(defaultValue = "Lighthouse on a cliff overlooking the ocean") String prompt,
            @RequestParam(defaultValue = "webp") String outputFormat
    ) {
        ResponseEntity<byte[]> response = generateAiService.generateTextToImage(prompt);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.parseMediaType("image/" + outputFormat));
            responseHeaders.setContentLength(response.getBody().length);

            return new ResponseEntity<>(response.getBody(), responseHeaders, HttpStatus.OK);
        } else {
            return ResponseEntity.status(response.getStatusCode()).build();
        }
    }
}
