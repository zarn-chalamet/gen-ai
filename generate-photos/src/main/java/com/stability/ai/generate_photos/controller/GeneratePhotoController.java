package com.stability.ai.generate_photos.controller;

import com.stability.ai.generate_photos.dtos.TextGenerationRequestDto;
import com.stability.ai.generate_photos.service.GeneratePhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = {"http://localhost:5173"})
@RequiredArgsConstructor
public class GeneratePhotoController {

    private final GeneratePhotoService generatePhotoService;

    @PostMapping(value = "/generate", produces = MediaType.IMAGE_PNG_VALUE )
    public ResponseEntity<byte[]> generatePhotoFromImagePrompt(@RequestParam("image")MultipartFile image,
                                                          @RequestParam("prompt") String prompt) {

        try{
            byte[] imageBytes = generatePhotoService.generateImageFromImageAndPrompt(image,prompt);

            return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(imageBytes);
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.internalServerError().build();
        }
    }


    @PostMapping(value = "/generate-from-text", produces = MediaType.IMAGE_PNG_VALUE )
    public ResponseEntity<byte[]> generatePhotoFromText(@RequestBody TextGenerationRequestDto requestDto) {

        try{
            byte[] imageBytes = generatePhotoService.generateImageFromTextPrompt(requestDto.getPrompt(), requestDto.getStyle());

            return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(imageBytes);
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.internalServerError().build();
        }
    }
}
