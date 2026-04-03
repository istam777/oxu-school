package com.osiyo.school.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "homepage_sections")
public class HomepageSection extends BaseEntity {

    @Column(name = "section_key", nullable = false, unique = true, length = 120)
    private String sectionKey;

    @Column(name = "title_uz", nullable = false, length = 200)
    private String titleUz;

    @Column(name = "title_en", nullable = false, length = 200)
    private String titleEn;

    @Column(name = "title_ru", nullable = false, length = 200)
    private String titleRu;

    @Column(name = "content_uz", nullable = false, columnDefinition = "TEXT")
    private String contentUz;

    @Column(name = "content_en", nullable = false, columnDefinition = "TEXT")
    private String contentEn;

    @Column(name = "content_ru", nullable = false, columnDefinition = "TEXT")
    private String contentRu;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Builder.Default
    @Column(name = "is_active", nullable = false)
    private boolean active = true;
}
