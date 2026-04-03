package com.osiyo.school.dto.common;

public record DashboardSummaryResponse(
        long newsCount,
        long eventCount,
        long galleryCount,
        long faqCount,
        long teacherCount,
        long admissionCount,
        long messageCount,
        long homepageSectionCount
) {
}
