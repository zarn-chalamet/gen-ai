package com.stability.ai.generate_photos.dtos;

import lombok.Data;

@Data
public class TextGenerationRequestDto {

    private String prompt;
    private String style;
}
