package com.stability.ai.generate_photos.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TextToImageRequest {

    private List<TextPrompt> text_prompts;
    private double cfg_scale;
    private int height = 512;
    private int width = 768;
    private int samples = 1;
    private String style_preset;

    public TextToImageRequest(String text,String style) {
        this.text_prompts = List.of(new TextPrompt(text));
        this.style_preset = style;
    }

}
