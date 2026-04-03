package com.osiyo.school.util;

import com.osiyo.school.dto.common.PagedResponse;
import java.util.List;
import org.springframework.data.domain.Page;

public final class PaginationUtil {

    private PaginationUtil() {
    }

    public static <T> PagedResponse<T> fromPage(Page<T> page) {
        List<T> content = page.getContent();
        return new PagedResponse<>(
                content,
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getSize(),
                page.isFirst(),
                page.isLast()
        );
    }
}
