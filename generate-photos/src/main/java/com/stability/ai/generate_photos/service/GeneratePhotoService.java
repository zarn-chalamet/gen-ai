package com.stability.ai.generate_photos.service;

import com.stability.ai.generate_photos.client.StabilityAIClient;
import com.stability.ai.generate_photos.dtos.TextToImageRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class GeneratePhotoService {

    private final StabilityAIClient stabilityAIClient;
    private final String apiKey;

    public GeneratePhotoService(StabilityAIClient stabilityAIClient,
                                @Value("${stability.api.key}") String apiKey) {
        this.stabilityAIClient = stabilityAIClient;
        this.apiKey = apiKey;
    }


    public byte[] generateImageFromImageAndPrompt(MultipartFile image, String prompt) {
        String finalPrompt = prompt +", in the beautiful, detailed anime style";
        String engineId = "stable-diffusion-v1-6";
        String stylePreset = "anime";

        return stabilityAIClient.generateAiImageFromImage(
                "Bearer " + apiKey,
                engineId,
                image,
                finalPrompt,
                stylePreset
        );
    }

    public byte[] generateImageFromTextPrompt(String prompt, String style) {
        String stylePreset = style.equals("general") ? "anime" : style.replace("_","-");
        String finalPrompt = prompt +", in the beautiful, detailed "+stylePreset +" style";
        String engineId = "stable-diffusion-v1-6";

        TextToImageRequest request = new TextToImageRequest(finalPrompt,stylePreset);
        return stabilityAIClient.generateAiImageFromText(
                "Bearer " + apiKey,
                engineId,
                request
        );
    }
}
