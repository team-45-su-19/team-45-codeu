package com.google.codeu.data;

public class Location {

  private String id;
  private String name;
  private String lat;
  private String lng;

  public Location(String id, String name, String lat, String lng) {
    this.id = id;
    this.lat = lat;
    this.lng = lng;
    this.name = name;
  }

  public String getId() {
    return id;
  }

  public String getLat() {
    return lat;
  }

  public String getLng() {
    return lng;
  }

  public String getName() {
    return name;
  }
}
