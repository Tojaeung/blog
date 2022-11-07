package com.tojaeung.blog.post.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class Re {
    private int totalCnt;
    private List<FindAllDto.Res | FindAllInCategoryDto.Res> findAllDtos;

    public Re(int totalCnt, List<FindAllDto.Res> findAllDtos) {
        this.totalCnt = totalCnt;
        this.findAllDtos = findAllDtos;
    }
}
