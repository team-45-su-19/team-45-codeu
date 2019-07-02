package com.google.codeu.data;

public class User {

  private String email;
  private String aboutMe;
  private String profilePicUrl;

  public User(String email, String aboutMe, String profilePicUrl) {
    this.email = email;
    this.aboutMe = aboutMe;
    this.profilePicUrl = profilePicUrl;
  }

  public String getEmail(){
    return email;
  }

  public String getAboutMe() {
    return aboutMe;
  }

  public String getProfilePicUrl() {
    return profilePicUrl;
  }
}