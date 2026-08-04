package com.securevault.backend.dto;

public class CredentialResponse {

    private Long id;

    private String website;

    private String username;

    private String password;

    private String category;

    private boolean favourite;

    public CredentialResponse() {
    }

    public CredentialResponse(Long id,
                              String website,
                              String username,
                              String password,
                              String category,
                              boolean favourite) {

        this.id = id;
        this.website = website;
        this.username = username;
        this.password = password;
        this.category = category;
        this.favourite = favourite;
    }

    public Long getId() {
        return id;
    }

    public String getWebsite() {
        return website;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getCategory() {
        return category;
    }

    public boolean isFavourite() {
        return favourite;
    }

}